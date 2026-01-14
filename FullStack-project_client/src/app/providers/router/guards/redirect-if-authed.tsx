import { Navigate, Outlet } from "react-router";
import { getToken } from "./get-roles-from-token";

export const RedirectIfAuthed = () => {
  const token = getToken();
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
};
