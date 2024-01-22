import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import NotFound from "./components/NotFound/NotFound.tsx";
import Signup from "./pages/Signup.tsx";
import BlogPage from "./components/BlogPage/BlogPage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import BlogDraft from "./pages/BlogDraft.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
// import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/blogs/:blogId",
    element: <BlogPage />,
  },
  {
    path: "/draft",
    element: <BlogDraft />,
  },
  {
    path: "/:userId",
    element: <UserProfilePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  // <React.StrictMode>
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Toaster />
    <RouterProvider router={router} />
  </ThemeProvider>
  // </React.StrictMode>
);
