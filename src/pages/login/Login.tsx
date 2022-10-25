import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthError,
  selectAuthLoading,
  selectIsLoginSucceeded,
  selectToken,
} from "../../redux/selector/authSelector";
import { LOGIN_REQUESTED, RESET_AUTH_STATE } from "../../redux/slice/authSlice";
import Loading from "../../components/loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import { routes, TOKEN } from "../../constants";
import { useFormik } from "formik";
import { setLocal } from "../../helpers";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import * as yup from "yup";
import "../../sass/css/form.css";
interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailInputRef = useRef<HTMLInputElement>(null);

  const error = useSelector(selectAuthError);
  const isLoginSucceeded = useSelector(selectIsLoginSucceeded);
  const authLoading = useSelector(selectAuthLoading);
  const token = useSelector(selectToken);

  const initialValues = {
    email: "",
    password: "",
  };
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password is too short!"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(LOGIN_REQUESTED({ user: values }));
    },
  });

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isLoginSucceeded) {
      setLocal(TOKEN, token);
      navigate(-1);
    }
    return () => {
      dispatch(RESET_AUTH_STATE());
    };
  }, [isLoginSucceeded]);

  console.log(formik.touched);
  return (
    <div className="my-form login-form ">
      {authLoading && <Loading />}
      <div className="container mt-10">
        <div className="form-container sign-in-container">
          <form onSubmit={formik.handleSubmit}>
            <h1>Sign in</h1>
            <span>
              <Link className="link-sign" to="./">
                Don't have an account?
              </Link>
            </span>
            <input
              onChange={formik.handleChange}
              type="email"
              placeholder="Email"
              name="email"
              ref={emailInputRef}
              style={
                formik.touched.email && formik.errors.email
                  ? { outline: "1px solid red" }
                  : {}
              }
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorMessage text={formik.errors.email} />
            )}
            <input
              onChange={formik.handleChange}
              type="password"
              placeholder="Password"
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
            {!formik.errors.password &&
              !formik.errors.email &&
              error["email or password"] && (
                <ErrorMessage text="Email or password is invalid" />
              )}
            <button type="submit"> Sign in</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="text-light">Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <Link to={routes.REGISER}>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
