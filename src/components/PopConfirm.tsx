import React, { useEffect, useRef } from "react";

interface PopConfirmProps {
  title: string;
  confirmQuestion: string;
  handleYes: () => void;
  handleNo: () => void;
}

const PopConfirm: React.FC<PopConfirmProps> = ({
  title,
  confirmQuestion,
  handleNo,
  handleYes,
}) => {
  const outlayRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousedown", (event) => {
      if (event.target === outlayRef.current) {
        handleNo();
      }
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!boxRef.current) return;
      boxRef.current.classList.remove("scale-50");
      boxRef.current.classList.add("scale-100");
    }, 0);
  }, []);

  return (
    <div
      ref={outlayRef}
      className="fixed top-0  left-0 right-0 bottom-0 shadow-md flex z-50 justify-center items-center bg-[rgba(0,0,0,0.4)]"
    >
      <div
        ref={boxRef}
        className="bg-white scale-50 transition-all duration-300 min-w-[370px]  rounded-md"
      >
        <div className="border-b text-center font-bold py-3 ">{title}</div>
        <div className="px-4 py-4">
          <p>{confirmQuestion}</p>
          <div className="text-end">
            <button onClick={handleNo}>No</button>
            <button
              onClick={handleYes}
              className="px-5 ml-3 text-white py-1 rounded-md bg-slate-500 mt-3"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopConfirm;
