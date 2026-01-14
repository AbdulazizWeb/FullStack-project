import { Navigate, Outlet } from "react-router";
import { getToken } from "./get-roles-from-token";

export const RequireAuth = () => {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
};
