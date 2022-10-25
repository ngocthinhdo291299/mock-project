import { GuardRouter } from "../components";
import { routes } from "../constants";
import {
  DetailArticle,
  Editor,
  Home,
  Login,
  Profile,
  Register,
  Settings,
} from "../pages";
import Favorites from "../pages/profile/Favorites";
import UpdateArticle from "../pages/updateArticle/UpdateArticle";
import { routeType } from "../types";
const APP_ROUTES: routeType[] = [
  {
    path: routes.LOGIN,
    component: (
      <GuardRouter requireAuth={false}>
        <Login />
      </GuardRouter>
    ),
  },
  {
    path: routes.REGISER,
    component: (
      <GuardRouter requireAuth={false}>
        <Register />
      </GuardRouter>
    ),
  },
  {
    path: routes.HOME,
    component: <Home />,
  },
  {
    path: routes.SETTINGS,
    component: (
      <GuardRouter requireAuth={true}>
        <Settings />
      </GuardRouter>
    ),
  },
  {
    path: routes.EDITOR,
    component: (
      <GuardRouter requireAuth={true}>
        <Editor />
      </GuardRouter>
    ),
  },
  {
    path: "/:username",
    component: (
      // <GuardRouter requireAuth={true}>
      <Profile />
      // </GuardRouter>
    ),
    children: [
      {
        path: "favorites",
        component: <Favorites />,
      },
    ],
  },
  { path: "/editor/:slug", component: <UpdateArticle /> },
  {
    path: "/article/:slug",
    component: <DetailArticle />,
  },
];
export default APP_ROUTES;
