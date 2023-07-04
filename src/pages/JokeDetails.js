// import JokeItem from "../components/jokes/JokeItem"
import { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighLightedJoke from "../components/jokes/HighlightedJoke";
import useHttp from "../hooks/use-http";
import { getJoke } from "../utils/firebase-api";
import Loader from "../components/UI/Loader";

const JokeDetails = (props) => {
  const routeMatch = useRouteMatch();
  const params = useParams();
  const { jokeId } = params;
  const {
    sendHttpRequest,
    status,
    data: loadedJoke,
    error,
  } = useHttp(getJoke, true);

  useEffect(() => {
    sendHttpRequest(jokeId);
  }, [sendHttpRequest, jokeId]);

  if (status === 'pending') {
    return <div className="centered"> 
      <Loader/>
    </div>
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedJoke.text) {
    return <p className="centered">Не умничай</p>;
  }

  return (
    <Fragment>
      <HighLightedJoke text={loadedJoke.text} topic={loadedJoke.topic} />
      <Route path={`${routeMatch.path}`} exact>
        <div className="centered">
          <Link className="btn" to={`${routeMatch.url}/comments`}>
            Comments
          </Link>
        </div>
      </Route>
      <Route path={`${routeMatch.path}/comments`} exact>
        <div className="centered">
          <Link className="btn" to={`${routeMatch.url}`}>
            Hide Comments
          </Link>
        </div>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default JokeDetails;
