import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  );
};
