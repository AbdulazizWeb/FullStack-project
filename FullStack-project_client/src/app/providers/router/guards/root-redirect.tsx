import { Navigate } from "react-router";
import { getRolesFromToken, getToken } from "./get-roles-from-token";

export const RootRedirect = () => {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;

  const roles = getRolesFromToken(token);

  if (roles.includes("ADMIN")) return <Navigate to="/admin-panel" replace />;
  if (roles.includes("PAYMENT") || roles.includes("PAYMENTS"))
    return <Navigate to="/payments" replace />;
  if (roles.includes("REPORTS")) return <Navigate to="/reports" replace />;

  return <Navigate to="/forbidden" replace />;
};
