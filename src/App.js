import { Route, Switch, Redirect } from "react-router-dom";
import Jokes from "./pages/Jokes";
import AddJoke from "./pages/AddJoke";
import JokeDetails from "./pages/JokeDetails";
import Layout from "./components/layout/Layout";
import NoJokes from "./pages/NoJokes";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/joke-list" />
        </Route>
        <Route path="/joke-list" exact>
          <Jokes />
        </Route>
        <Route path="/joke-list/:jokeId">
          <JokeDetails />
        </Route>
        <Route path="/add-a-joke">
          <AddJoke></AddJoke>
        </Route>
        <Route path="*">
          <NoJokes />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
