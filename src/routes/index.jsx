import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import Home from "../pages/Home";
import Signup from "../pages/Signup";

export default function Routes() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@KenzieHub:token"));
    if (token) {
      return setAuth(true);
    }
  }, [auth]);

  return (
    <Switch>
      <Route exact path="/">
        <Home auth={auth} />
      </Route>
      <Route path="/signup">
        <Signup auth={auth} />
      </Route>
    </Switch>
  );
}
