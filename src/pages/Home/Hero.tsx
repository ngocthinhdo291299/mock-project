import heroImage from "../../assets/image/hero.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { routes, TOKEN } from "../../constants";
import { getLocal } from "../../helpers";

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const navigate = useNavigate();
  function handleNavigate() {
    if (getLocal(TOKEN)) {
      navigate(routes.EDITOR);
      return;
    }
    navigate(routes.LOGIN);
  }
  return (
    <div className="  ">
      <div className="relative">
        <div className=" h-[60vh] md:h-[80vh] w-full bg-slate-500 ">
          <div className="flex h-full px-10 text-white justify-center items-center ">
            <div className="text-center ">
              <h3 className="font-bold  text-6xl text-white">Our Blog</h3>
              <p className=" font-bold py-3 ">to express your feelings</p>
              <button
                onClick={handleNavigate}
                className="text-white border-[1.5px] py-2 px-3 hover:scale-105 transition-all duration-200 "
              >
                Start writing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
