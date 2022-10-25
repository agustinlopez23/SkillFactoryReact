import React from "react";
import "../../assets/css/LoginPage.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { FcGoogle } from "react-icons/fc";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const formData = {
  email: "",
  password: "",
};
const formValidations = {
  email: [
    [(value) => value.includes("@"), "El correo debe tener un @"],
    [
      (value) =>
        value.match(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
        ),
      "El correo debe tener un formato valido",
    ],
  ],
  password: [
    [
      (value) => value.length >= 6,
      "El password debe tener al menos 6 caracteres",
    ],
  ],
};
export const LoginPage = () => {
  const navigate = useNavigate();

  const [formSubmited, setFormSubmited] = useState(false);
  const { login, loginWithGoogle } = useContext(AuthContext);
  const {
    formState,

    email,
    password,
    onInputChange,
    isFormValid,

    passwordValid,
    emailValid,
  } = useForm(formData, formValidations);

  const onLogin = (e) => {
    e.preventDefault();
    setFormSubmited(true);

    if (!isFormValid) return;

    login(formState);
  };

  const googleLogin = async () => {
    await loginWithGoogle();
  };

  const goRegister = () => {
    navigate("/register", { replace: true });
  };
  return (
    <div className=" d-flex flex-column justify-content-center align-items-center login-page">
      <h1>Heroes App</h1>
      <hr />

      <div className="d-flex flex-column gap-2">
        <form onSubmit={onLogin} className="d-flex flex-column gap-3">
          <input
            type="email"
            placeholder="youremail@example.com"
            className="form-control"
            name="email"
            value={email}
            onChange={onInputChange}
            required
          />
          <div
            id="emailHelp"
            className="form-text"
            style={{
              display: emailValid && !!formSubmited ? "block" : "none",
            }}
          >
            {emailValid}
          </div>
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            name="password"
            value={password}
            onChange={onInputChange}
            required
          />
          <div
            id="emailHelp"
            className="form-text"
            style={{
              display: passwordValid && !!formSubmited ? "block" : "none",
            }}
          >
            {passwordValid}
          </div>

          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
        <button className="btn btn-secondary" onClick={googleLogin}>
          <FcGoogle />
          Login with Google
        </button>
        <button className="btn btn-primary" onClick={goRegister}>
          Dont have an Acount?
        </button>
        <Link to="/resetpassword">I dont remember my password</Link>
      </div>
    </div>
  );
};
