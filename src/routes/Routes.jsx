import React, { lazy } from "react";
import { Route } from "react-router-dom";
import SuspenseWrapper from "../component/SuspenseWrapper/SuspenseWrapper";
const Login = lazy(() => import("../pages/Login/Login"));
const ResetPassword = lazy(() =>
  import("../pages/Resetpassword/ResetPassword")
);
export default [
  <Route
    element={
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    }
    path="/login"
    key="login"
  ></Route>,
  <Route
    element={
      <SuspenseWrapper>
        <ResetPassword />
      </SuspenseWrapper>
    }
    path="/resetpassword"
    key="resetpassword"
  ></Route>,
];
