import { useEffect } from "react";
import "./loading.scss";
interface LoadingProps { }

const Loading: React.FC<LoadingProps> = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.2)] z-50  ">
      {/* <div className="lds-dual-ring"></div> */}
      <div id="container">
        <svg viewBox="0 0 100 100">
          <defs>
            <filter id="shadow">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="1.5"
                flood-color="#fc6767"
              />
            </filter>
          </defs>
          <circle
            id="spinner"
            style={{
              fill: "transparent",
              stroke: "#f6197d",
              strokeWidth: "7px",
              strokeLinecap: "round",
              filter: "url(#shadow)",
            }}
            cx="50"
            cy="50"
            r="45"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
