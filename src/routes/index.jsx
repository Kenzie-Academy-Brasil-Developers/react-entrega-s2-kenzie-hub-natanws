import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function Routes() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("@KenzieHub:token");
    if (token) {
      return setAuth(true);
    }
  }, [auth]);

  return (
    <Switch>
      <Route exact path="/">
        <Home auth={auth} setAuth={setAuth} />
      </Route>
      <Route exact path="/signup">
        <Signup auth={auth} />
      </Route>
      <Route exact path="/login">
        <Login auth={auth} setAuth={setAuth} />
      </Route>
    </Switch>
  );
}
