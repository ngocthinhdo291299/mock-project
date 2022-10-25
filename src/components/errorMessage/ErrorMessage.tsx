import { useRef } from "react";
import Footer from "../Footer/Footer";
import "./errorMessage.scss";

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {

  // const ref = useRef('thanh')
  return <div className="errorMessage">{text}

  </div>;
};

export default ErrorMessage;
