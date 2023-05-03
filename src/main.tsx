import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//
import LandingPage from "./pages/landing-page";
import ErrorPage from "./pages/error-page";
import CreateAccount from "./pages/create-account";
import ValidateEmailContainer from "./pages/validate-email/container";
import LogIn from "./pages/log-in";
import App from "./pages/app";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/CreateAccount",
    element: <CreateAccount />,
  },
  {
    path: "/ValidateEmail",
    element: <ValidateEmailContainer />,
  },
  {
    path: "/LogIn",
    element: <LogIn />,
  },
  {
    path: "/capstone_user_account",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
