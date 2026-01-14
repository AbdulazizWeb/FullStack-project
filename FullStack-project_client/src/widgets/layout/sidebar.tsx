import { tokenStorage } from "@/shared/lib/token";
import {
  CreditCardOutlined,
  FileProtectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useLocation, useNavigate } from "react-router";
export const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical text-xl font-bold flex justify-center p-5 h-20">
        {!collapsed ? "FullStack-App" : <div className=" text-4xl">F</div>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/admin-panel"]}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/admin-panel",
            icon: <UserOutlined />,
            label: "Admin panel",
          },
          {
            key: "/payments",
            icon: <CreditCardOutlined />,
            label: "Payments",
          },
          {
            key: "/reports",
            icon: <FileProtectOutlined />,
            label: "Reports",
          },
          {
            key: "/login",
            icon: <FileProtectOutlined />,
            label: "Log out",
            onClick: () => {
              tokenStorage.clear();
            },
            className: "flex self-end",
          },
        ]}
      />
    </Sider>
  );
};
