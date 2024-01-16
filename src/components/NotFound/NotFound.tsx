import { useRouteError } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();
  console.log(error);
  return <div>Opps! This page does not exist.</div>;
}
