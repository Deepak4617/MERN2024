import { Navigate, Outlet } from "react-router-dom";
import { authToken } from "../storage/authToken";

const ProtectedRoute = () => {
  const token = authToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
