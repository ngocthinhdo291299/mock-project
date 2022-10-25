import { Avatar } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { headerNavWithLogin, routes, TOKEN } from "../../constants";
import { getLocal } from "../../helpers";
import convertToken from "../../helpers/convertToken";
import { useClickOutside } from "../../hooks";
import { selectToken } from "../../redux/selector";

interface HeaderAuthProps {}

const HeaderAuth: React.FC<HeaderAuthProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const token = useSelector(selectToken);

  const avatarRef = useRef<HTMLDivElement>(null);
  useClickOutside(avatarRef, () => setOpen(false));
  return (
    <>
      {getLocal(TOKEN) || token ? (
        <div className="flex gap-x-7 text-xl items-center">
          {headerNavWithLogin.map((item, i: number) => (
            <NavLink
              className="active:scale-90 transition-all duration-200 "
              key={i}
              to={item.link}
            >
              {item.icon}
            </NavLink>
          ))}
          <div ref={avatarRef} className="relative">
            <Avatar
              onClick={() => setOpen(!open)}
              src="https://api.realworld.io/images/smiley-cyrus.jpeg"
              className="cursor-pointer active:scale-90 transition-all duration-200 "
            />{" "}
            {open && <UserOption setOpen={setOpen} />}
          </div>
        </div>
      ) : (
        <div className="right-part">
          <NavLink
            className=" border-black border-[1.5px] px-5 py-2 font-bold "
            to={routes.LOGIN}
          >
            Login
          </NavLink>
          <NavLink
            className="bg-red-400 ml-3 px-5 border-[1.5px] border-red-400 py-2 font-bold text-[white]"
            to={routes.REGISER}
          >
            Sign Up Free
          </NavLink>{" "}
        </div>
      )}
    </>
  );
};

export default HeaderAuth;

interface UserOptionProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const UserOption: React.FC<UserOptionProps> = ({ setOpen }) => {
  const token = useSelector(selectToken);

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className=" absolute  mt-2 p-3 shadow-[0px_2px_10px_rgba(0,0,0,0.3)] min-w-[200px] top-[100%] right-0 rounded-md bg-white  z-40">
      <div className="flex flex-col">
        <div className="shadow-md rounded-md p-3">
          <Link
            onClick={() => setOpen(false)}
            to={`/${convertToken(getLocal(TOKEN) || token).username}`}
          >
            <Avatar
              src="https://api.realworld.io/images/smiley-cyrus.jpeg"
              alt=""
            />
            <span className="text-sm ml-2 inline-block">
              {convertToken(getLocal(TOKEN)).username}
            </span>
          </Link>
        </div>
        <div className="mt-2">
          <div
            onClick={handleLogout}
            className="py-3 cursor-pointer hover:bg-gray-200 rounded-md px-2 text-sm"
          >
            <i className="fa-solid fa-right-from-bracket"></i> Log out
          </div>
        </div>
      </div>
    </div>
  );
};
