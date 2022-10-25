import React from "react";
import { Route, Routes } from "react-router-dom";
import { ForgotPassword } from "../auth/pages/ForgotPassword";
import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { HeroesProvider } from "../heroes/context/HeroesProvider";

import { HeroesRoutes } from "../heroes/routes/heroesRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  return (
    <>
      <HeroesProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <LoginPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <RegisterPage />
              </PublicRoutes>
            }
          />
          <Route
            path="/resetpassword"
            element={
              <PublicRoutes>
                <ForgotPassword />
              </PublicRoutes>
            }
          />
          <Route
            path="/*"
            element={
              <PrivateRoutes>
                <HeroesRoutes />
              </PrivateRoutes>
            }
          />
        </Routes>
      </HeroesProvider>
    </>
  );
};
