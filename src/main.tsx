import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import BlogPage from "./components/BlogPage/BlogPage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import BlogDraft from "./pages/BlogDraft.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import PageNotFound from "./pages/PageNotFound.tsx";
// import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <PageNotFound />,
    async lazy() {
      const App = await import("./pages/App.tsx");
      return { Component: App.default };
    },
  },
  {
    path: "/login",
    async lazy() {
      const Login = await import("./pages/Login.tsx");
      return { Component: Login.default };
    },
  },
  {
    path: "/signup",
    async lazy() {
      const Signup = await import("./pages/Signup.tsx");
      return { Component: Signup.default };
    },
  },
  {
    path: "/blogs/:blogId",
    element: (
      <ScrollToTop>
        <BlogPage />
      </ScrollToTop>
    ),
  },
  {
    path: "/draft",
    element: <BlogDraft />,
  },
  {
    path: "/search",
    async lazy() {
      const Search = await import("./pages/Search.tsx");
      return { Component: Search.default };
    },
  },
  {
    path: "/:userId",
    element: (
      <ScrollToTop>
        <UserProfilePage />
      </ScrollToTop>
    ),
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
