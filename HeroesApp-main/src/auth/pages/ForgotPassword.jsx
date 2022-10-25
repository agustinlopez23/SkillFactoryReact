import React from "react";
import "../../assets/css/LoginPage.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { FcGoogle } from "react-icons/fc";
import { useForm } from "../../hooks/useForm";
import { useState } from "react";

const formData = {
  email: "",
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
};
export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formSubmited, setFormSubmited] = useState(false);
  const { resetPasswordEmail } = useContext(AuthContext);
  const { formState, email, onInputChange, isFormValid, emailValid } = useForm(
    formData,
    formValidations
  );

  const onSend = (e) => {
    e.preventDefault();
    setFormSubmited(true);

    if (!isFormValid) return;

    resetPasswordEmail(formState);
  };

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center login-page">
      <h1>Heroes App</h1>
      <hr />

      <div className="d-flex flex-column gap-2">
        <form onSubmit={onSend} className="d-flex flex-column gap-3">
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

          <button type="submit" className="btn btn-success">
            Send
          </button>
        </form>

        <button
          className="btn btn-primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>
    </div>
  );
};
