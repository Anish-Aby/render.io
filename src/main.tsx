/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { store } from "./store.tsx";
import { Provider } from "react-redux";
import "./index.css";

import Navbar from "./components/Navbar/Navbar.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import RequireAuth from "./components/RequireAuth/RequireAuth.tsx";

const App = lazy(() => import("./pages/App.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Signup = lazy(() => import("./pages/Signup.tsx"));
const Search = lazy(() => import("./pages/Search.tsx"));
const BlogPage = lazy(() => import("./components/BlogPage/BlogPage.tsx"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage.tsx"));
const BlogDraft = lazy(() => import("./pages/BlogDraft.tsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage.tsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.tsx"));
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
    element: (
      <RequireAuth>
        <BlogDraft />
      </RequireAuth>
    ),
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
  {
    path: "/forgotPassword",
    element: (
      <Suspense fallback={<></>}>
        <ForgotPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "/resetPassword/:tokenId",
    element: (
      <Suspense fallback={<></>}>
        <ResetPassword />
      </Suspense>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root")!);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>
);
