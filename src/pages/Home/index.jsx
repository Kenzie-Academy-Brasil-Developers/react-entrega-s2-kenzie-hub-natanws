import { Redirect } from "react-router";

export default function Home({ auth }) {
  if (!auth) {
    return <Redirect to="/signup" />;
  }

  return <h1>Home</h1>;
}