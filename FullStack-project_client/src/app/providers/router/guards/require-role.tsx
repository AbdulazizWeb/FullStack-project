import { Navigate, Outlet } from "react-router";
import {
  getRolesFromToken,
  getToken,
  hasAnyRole,
} from "./get-roles-from-token";

export const RequireRole = ({ roles }: { roles: string[] }) => {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;

  const userRoles = getRolesFromToken(token);
  if (!hasAnyRole(userRoles, roles))
    return <Navigate to="/forbidden" replace />;

  return <Outlet />;
};
