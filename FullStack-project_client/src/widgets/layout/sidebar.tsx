import type { RootState } from "@/app/providers/store/app-store";
import { tokenStorage } from "@/shared/lib/token";
import {
  CreditCardOutlined,
  FileProtectOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Drawer, Menu, type GetProp, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
};

export const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const claims = useSelector((state: RootState) => state.auth.claims);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isMobile) setMobileOpen(false);
  }, [location.pathname, isMobile, setMobileOpen]);
  type MenuItem = GetProp<MenuProps, "items">[number];

  function getItem(
    key?: React.Key | null,
    icon?: React.ReactNode,
    label?: string,
    disabled?: boolean
  ): MenuItem {
    return {
      key,
      icon,
      label,
      disabled,
    } as MenuItem;
  }

  const searchRole = (roles: string[]) => {
    const result = roles.some((item) => claims?.roles?.includes(item));

    return result;
  };

  const items = [
    searchRole(["ADMIN"])
      ? getItem("/admin-panel", <UserOutlined />, "Admin panel", false)
      : null,
    searchRole(["ADMIN", "PAYMENT"])
      ? getItem("/payments", <CreditCardOutlined />, "Payments", false)
      : null,
    searchRole(["ADMIN", "REPORTS"])
      ? getItem("/reports", <FileProtectOutlined />, "Reports", false)
      : null,
  ];

  const onMenuClick = ({ key }: { key: string }) => navigate(key);

  const Logo = (
    <div className="text-xl font-bold flex justify-center items-center px-5 h-20 text-white">
      {isMobile ? (
        "FullStack-App"
      ) : !collapsed ? (
        "FullStack-App"
      ) : (
        <div className="text-4xl">F</div>
      )}
    </div>
  );

  const LogoutMenu = (
    <Menu
      theme="dark"
      mode="inline"
      selectable={false}
      items={[
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Log out",
          onClick: () => {
            tokenStorage.clear();
            setMobileOpen(false);
            navigate("/login", { replace: true });
          },
        },
      ]}
    />
  );

  const MainMenu = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={onMenuClick}
      items={items}
    />
  );

  if (isMobile) {
    return (
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        placement="left"
        width={260}
        bodyStyle={{ padding: 0 }}
      >
        <div className="h-full flex flex-col bg-[#001529]">
          {Logo}
          {MainMenu}
          <div className="flex-1" />
          {LogoutMenu}
        </div>
      </Drawer>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className="h-screen"
    >
      <div className="h-full flex flex-col">
        {Logo}
        {MainMenu}
        <div className="flex-1" />
        {LogoutMenu}
      </div>
    </Sider>
  );
};
