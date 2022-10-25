import { Avatar, Collapse, Drawer } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  headerNavWithLogin,
  HeaderNavWithLoginType,
  headerNavWithoutLogin,
} from "../../constants";
import { utilitiesToken } from "../../helpers";
const { Panel } = Collapse;
interface SidebarProps {
  open: boolean;
  setOpen: any;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (utilitiesToken.getName()) {
    return (
      <Drawer placement="right" onClose={onClose} open={open} width={250}>
        {headerNavWithLogin.map(
          (item: HeaderNavWithLoginType, index: number) => (
            <NavLink onClick={onClose} className="block py-2" to={item.link}>
              <span className="inline-block mr-2"> {item.icon} </span>{" "}
              {item.title}
            </NavLink>
          )
        )}
      </Drawer>
    );
  }
  return (
    <Drawer placement="right" onClose={onClose} open={open} width={250}>
      {headerNavWithoutLogin.map((item: any, index: number) => (
        <NavLink className="block" onClick={onClose} to={item.link} key={index}>
          {item.title}
        </NavLink>
      ))}
    </Drawer>
  );
};

export default Sidebar;
