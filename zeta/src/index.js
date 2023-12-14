import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainTemp />,
//   },
//   {
//     path: "/signup",
//     element: <SignUp />,
//   },
//   {
//     path: "/login",
//     element: <LogIn />,
//   },
//   {
//     path: "/reset-password",
//     element: <PasswordReset />,
//   },
//   {
//     path: "/@",
//     element: <UserProfile />,
//   },
//   {
//     path: "/@Anish-Aby/space-explore",
//     element: <BlogPage />,
//   },
//   {
//     path: "/write",
//     element: <WriteBlog />,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
