import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "utils/auth";

type Props = {
  path: string;
};

function PrivateRoute({ path }: Props) {
  const auth = isAuthenticated();

  return !auth ? <Navigate to="/" /> : <Outlet />;
}

export default PrivateRoute;
