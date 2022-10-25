import { socialIconList } from "../../constants";

const Footer = ({ }) => {
  console.log(<Footer />)
  return (
    <div className="h-32 mt-10 border-t flex justify-center items-center">
      <div className="text-2xl flex gap-x-4">
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-square-gitlab"></i>
        <i className="fa-brands fa-square-instagram"></i>
      </div>
    </div>
  );
};

export default Footer;
