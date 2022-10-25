import React from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmail,
  sendPasswordResetByEmail,
  signInWithGoogle,
} from "../../firebase/provider";
import { types } from "../../types/types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
const initialState = {
  logged: false,
  user: null,
};
const init = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    logged: !!user,
    user,
  };
};
export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState, init);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    const user = await loginWithEmailPassword({ email, password });

    if (!user.ok) {
      if (user.errorMessage === "Firebase: Error (auth/user-not-found).") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The user is not register.",
        });
      }
      if (user.errorMessage === "Firebase: Error (auth/wrong-password).") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Incorrect Password",
        });
      }
      if (
        user.errorMessage ===
        "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The account was suspended await for a few minutes",
        });
      }
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.login, payload: user });
  };
  const loginWithGoogle = async () => {
    const user = await signInWithGoogle();
    if (!user.ok) {
      dispatch({ type: types.cannotLoginGoogle, payload: { logged: user.ok } });
      if (
        user.errorMessage === "Firebase: Error (auth/popup-closed-by-user)."
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The login pop up to login was closed by the user",
        });
      }
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: types.login, payload: user });
  };
  const registerWithEmail = async ({ email, password, displayName }) => {
    const user = await registerUserWithEmail({
      email,
      password,
      displayName,
    });
    if (user.ok) {
      Swal.fire({
        icon: "success",
        title: "Register Successfull",
        text: "The account was register, now login",
      });
      navigate("/login");
    }
    if (user.errorMessage === "Firebase: Error (auth/email-already-in-use).") {
      Swal.fire({
        icon: "error",
        title: user.errorCode,
        text: "The mail is already in use",
      });
    }
  };
  const logout = () => {
    logoutFirebase();
    dispatch({ type: types.logout });
    localStorage.removeItem("user");
  };

  const resetPasswordEmail = async ({ email }) => {
    const { errorCode, errorMessage, ok } = await sendPasswordResetByEmail({
      email,
    });
    if (ok) {
      Swal.fire({
        icon: "success",
        title: "Mail was sent",
        text: "Check your mail box",
      });
    }

    if (errorMessage === "Firebase: Error (auth/user-not-found).") {
      Swal.fire({
        icon: "error",
        title: errorCode,
        text: "The mail is not registry",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,

        login,
        logout,
        loginWithGoogle,
        registerWithEmail,
        resetPasswordEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
