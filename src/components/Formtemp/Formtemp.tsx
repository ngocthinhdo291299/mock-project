import React, { FC } from "react";
import "./Formtemp.css";
interface Props {
  FormType: React.ReactNode;
  title: string;
  btnName: string;
}
const Formtemp: FC<Props> = ({ FormType, title, btnName }) => {
  return (
    <div className="my-form">
      <div className="container">
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign up</h1>
            <span>
              <a className="link-sign">Have an account?</a>
            </span>
            <input type="text" placeholder="Username" name="username" />
            <input type="email" placeholder="Email" name="email" />
            <input type="password" placeholder="New Password" name="password" />
            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="text-light">Hello, Friend!</h1>
              <p>Comfortable Lifestyle, We Take Care Of You!</p>
              <button className="ghost" id="signUp">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formtemp;
