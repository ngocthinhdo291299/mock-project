import { Button, Form, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../components";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { errorMessage, routes, TOKEN } from "../../constants";
import { setLocal } from "../../helpers";
import {
  selectAuthError,
  selectAuthLoading,
  selectIsRegisterSucceeded,
  selectToken,
} from "../../redux/selector/authSelector";
import { REGISTER_REQUESTED } from "../../redux/slice/authSlice";
import { registerInputDataType } from "../../types/authType";
import "../../sass/css/form.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useFocusInput } from "../../hooks";
interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useFocusInput(usernameInputRef);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required(errorMessage.REQUIRED_EMAIL)
      .email(errorMessage.VALID_EMAIL),
    password: yup
      .string()
      .required(errorMessage.REQUIRED_PASSWORD)
      .min(6, errorMessage.MIN_PASSWORD),
    username: yup.string().required(errorMessage.REQUIRED_USERNAME),
  });

  const initialValues: registerInputDataType = {
    password: "",
    email: "",
    username: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(
        REGISTER_REQUESTED({
          user: values,
        })
      );
    },
  });

  const token = useSelector(selectToken);
  const isRegisterSucceeded = useSelector(selectIsRegisterSucceeded);
  const authLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  useEffect(() => {
    if (isRegisterSucceeded) {
      setLocal(TOKEN, token);
      navigate(routes.HOME);
    }
  }, [isRegisterSucceeded, token, navigate]);

  return (
    <div className="my-form register-form">
      {authLoading && <Loading />}
      <div className="container mt-10">
        <div className="form-container sign-in-container">
          <form onSubmit={formik.handleSubmit}>
            <h1>Sign up</h1>
            <span>
              <Link to={routes.LOGIN} className="link-sign">
                Have an account?
              </Link>
            </span>
            <input
              onChange={formik.handleChange}
              type="text"
              placeholder="Username"
              name="username"
              ref={usernameInputRef}
              style={
                formik.touched.username && formik.errors.username
                  ? { outline: "1px solid red" }
                  : {}
              }
            />
            {formik.touched.username && formik.errors.username && (
              <ErrorMessage text={formik.errors.username} />
            )}
            {!formik.errors.username && authError.username && (
              <ErrorMessage text={`Username ${authError.username[0]}`} />
            )}
            <input
              onChange={formik.handleChange}
              type="email"
              placeholder="Email"
              name="email"
              style={
                formik.touched.email && formik.errors.email
                  ? { outline: "1px solid red" }
                  : {}
              }
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage text={formik.errors.email} />
            )}
            {!formik.errors.email && authError.email && (
              <ErrorMessage text={`Email ${authError.email[0]}`} />
            )}
            <input
              onChange={formik.handleChange}
              type="password"
              placeholder="New Password"
              name="password"
              style={
                formik.touched.password && formik.errors.password
                  ? { outline: "1px solid red" }
                  : {}
              }
            />
            {formik.touched.password && formik.errors.password && (
              <ErrorMessage text={formik.errors.password} />
            )}
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="text-light">Hello, Friend!</h1>
              <p>Comfortable Lifestyle, We Take Care Of You!</p>
              <Link to={routes.LOGIN}>
                <button type="submit" className="ghost" id="signUp">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
