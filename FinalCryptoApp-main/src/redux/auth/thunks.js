import { message } from "antd";
import {
  loginWithEmailPassword,
  logoutFirebase,
  recoverPassword,
  registerUserWithEmail,
  signInWithGoogle,
} from "../../firebase/providers";
import { clearOnLogout } from "../favorites/favoritesSlice";

import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmail = (values) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmail(values);
    //console.log(result);
    if (result.errorCode === "auth/email-already-in-use")
      return message.error("The Acount was already registered with this email");

    if (!result.ok) return dispatch(logout(result));
    if (result.ok)
      return message.success("The Acount was registered with successfull");
    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    //console.log(result);
    if (result.errorCode === "auth/user-not-found")
      return message.error("The Acount is not register");
    if (result.errorCode === "auth/wrong-password")
      return message.error("The Acount or password is wrong");
    if (result.errorCode === "auth/invalid-email")
      return message.error("The Acount or password is wrong");
    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(logout());
    dispatch(clearOnLogout())
  };
};

export const startRecovery = (values) => {
  return async (dispatch) => {
    const result = await recoverPassword(values);
    if (result.errorCode === "auth/user-not-found")
      return message.error("The Acount is not register");
    if (result.ok)
      return message.success("Check Your email and follow the steps");
  };
};
