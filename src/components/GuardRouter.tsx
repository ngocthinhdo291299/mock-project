import { getLocal } from "../helpers";
import { Navigate } from "react-router-dom";
import { TOKEN } from "../constants";
interface GuardRouterProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

const GuardRouter: React.FC<GuardRouterProps> = ({ children, requireAuth }) => {
  if (requireAuth) {
    if (getLocal(TOKEN)) {
      return <>{children}</>;
    }
    return <Navigate to="/" />;
  } else {
    if (!getLocal(TOKEN)) {
      return <>{children}</>;
    }
    return <Navigate to="/" />;
  }
};

export default GuardRouter;
