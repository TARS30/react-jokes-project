import { Fragment, useEffect } from "react";
import JokeList from "../components/jokes/JokeList";
import useHttp from "../hooks/use-http";
import { getJokes } from "../utils/firebase-api";
import Loader from "../components/UI/Loader";
import NoJokesFound from '../components/jokes/NoJokesFound'
// const DUMMY_JOKES = [
//   {
//     id: "j1",
//     topic: "Programming",
//     text: `How many programmers does it takes to change a light bulb? None - it's a hardware problem.`,
//   },
//   {
//     id: "j2",
//     topic: "General",
//     text: `How many bones in human hand? A handful of them.`,
//   },
// ];

const Jokes = () => {
  const {
    sendHttpRequest,
    status,
    data: loadedJokes,
    error,
  } = useHttp(getJokes, true);

  useEffect(() => {
    sendHttpRequest();
  }, [sendHttpRequest]);

  if (status === 'pending') {
    return <div className="centered">
      <Loader/>
    </div>
  }

  if (error) {
    return <p className="centered focused">{error}</p>
  }

  if (status === 'completed' && (!loadedJokes || loadedJokes.length === 0)) {
    return <NoJokesFound/>
  }

  return (
    <Fragment>
      <h1>Jokes page</h1>
      <JokeList jokes={loadedJokes} />
    </Fragment>
  );
};

export default Jokes;
