import React, { useEffect, useRef, useState } from "react";
import { routes } from "../../constants";
import { Link } from "react-router-dom";

import HeaderSearch from "./HeaderSearch";
import HeaderAuth from "./HeaderAuth";
import "./Header.scss";
import Sidebar from "../sidebar/Sidebar";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!headerRef.current) return;
      if (document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("stick");
      } else {
        headerRef.current.classList.remove("stick");
      }
    });
  }, []);
  return (
    <>
      <div
        ref={headerRef}
        className="header-wrapper fixed z-40 w-full shadow-md "
      >
        <div className="header-container ">
          <Link to={routes.HOME} className="logo  ">
            <i className="fa-sharp fa-solid fa-blog "></i> TECHLover
          </Link>
          <div className="header-right">
            <HeaderSearch />
            <HeaderAuth />
          </div>
          <div className="menu-mobile">
            <i
              onClick={() => {
                setOpen(true);
              }}
              className="fa-solid fa-bars text-2xl cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
      <hr color="#e4e4e4" />
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
};

export default Header;
