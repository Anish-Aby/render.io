/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar.tsx";

import ScrollToTop from "./components/ScrollToTop.tsx";

const App = lazy(() => import("./pages/App.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Signup = lazy(() => import("./pages/Signup.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const BlogPage = lazy(() => import("./components/BlogPage/BlogPage.tsx"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage.tsx"));
// const ScrollToTop = lazy(() => import("./components/ScrollToTop.tsx"));
const BlogDraft = lazy(() => import("./pages/BlogDraft.tsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"));

// import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <PageNotFound />,
    element: (
      <Suspense fallback={<Navbar />}>
        <App />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<></>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/signup",
    element: (
      <Suspense fallback={<></>}>
        <Signup />
      </Suspense>
    ),
  },
  {
    path: "/blogs/:blogId",
    element: (
      <Suspense fallback={<Navbar />}>
        <ScrollToTop>
          <BlogPage />
        </ScrollToTop>
      </Suspense>
    ),
  },
  {
    path: "/draft",
    element: <BlogDraft />,
  },
  {
    path: "/search",
    element: (
      <Suspense fallback={<Navbar />}>
        <Search />
      </Suspense>
    ),
  },
  {
    path: "/:userId",
    element: (
      <Suspense fallback={<Navbar />}>
        <ScrollToTop>
          <UserProfilePage />
        </ScrollToTop>
      </Suspense>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
