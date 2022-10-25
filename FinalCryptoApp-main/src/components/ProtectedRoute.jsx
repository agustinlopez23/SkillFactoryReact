import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ status, children }) => {
  if (status === "checking") {
    return <Navigate to="/login" />;
  }
  if (status === "not-authenticated") {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};
