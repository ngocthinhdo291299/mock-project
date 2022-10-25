import { routes } from "./routes";

export interface HeaderNavWithLoginType {
  title: string;
  link: string;
  icon: React.ReactNode;
}

export const headerNavWithLogin: HeaderNavWithLoginType[] = [
  {
    title: "Home",
    link: routes.HOME,
    icon: <i className="fa-solid fa-house"></i>,
  },
  {
    title: "New Article",
    link: routes.EDITOR,
    icon: <i className="fa-solid fa-pen-to-square"></i>,
  },
  {
    title: "Settings",
    link: routes.SETTINGS,
    icon: <i className="fa-solid fa-gear"></i>,
  },
];

export const headerNavWithoutLogin = [
  { title: "Home", link: routes.HOME },
  {
    title: "Login",
    link: routes.LOGIN,
  },
  {
    title: "Sign Up Free",
    link: routes.REGISER,
  },
];
