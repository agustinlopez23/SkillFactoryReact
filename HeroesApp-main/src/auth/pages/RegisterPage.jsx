import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";
const formData = {
  email: "",
  password: "",
  displayName: "",
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
  displayName: [
    [(value) => value.length >= 1, "El nombre es obligatorio"],
    [(value) => value.length >= 6, "El nombre debe tener al menos 6 letras"],
  ],
};
export const RegisterPage = () => {
  const navigate = useNavigate();
  const [formSubmited, setFormSubmited] = useState(false);
  const { registerWithEmail } = useContext(AuthContext);

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    passwordValid,
    emailValid,
  } = useForm(formData, formValidations);
  const onRegister = (e) => {
    e.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;

    registerWithEmail(formState);
  };

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center login-page">
      <h1>Heroes App</h1>
      <hr />

      <div className="d-flex flex-column gap-2">
        <form onSubmit={onRegister} className="d-flex flex-column gap-3">
          <input
            type="text"
            placeholder="Your name"
            className="form-control"
            name="displayName"
            value={displayName}
            onChange={onInputChange}
          />
          <div
            id="emailHelp"
            className="form-text"
            style={{
              display: displayNameValid && !!formSubmited ? "block" : "none",
            }}
          >
            {displayNameValid}
          </div>
          <input
            type="email"
            placeholder="youremail@example.com"
            className="form-control"
            name="email"
            value={email}
            onChange={onInputChange}
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
            Register
          </button>
        </form>
        <Link to="/login" className="text-center">
          Already have an acount!
        </Link>
      </div>
    </div>
  );
};
