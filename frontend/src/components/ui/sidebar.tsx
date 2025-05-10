import React from "react";
import {
  HomeOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  UserOutlined,
  LogoutOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "Homepage",
  },
  {
    key: "report",
    icon: <ExclamationCircleOutlined />,
    label: "Report Problem",
  },
  {
    key: "job",
    icon: <FileAddOutlined />,
    label: "Job Post",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: "Logout",
  },
  {
    key: "map",
    icon: <HeatMapOutlined />,
    label: "Map",
  },
];

const App: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "report":
        navigate("/report");
        break;
      case "job":
        navigate("/jobs");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "logout":
        // Handle logout logic here
        navigate("/login");
        break;
      case "map":
        navigate("/map");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 text-white flex flex-col">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["home"]}
          items={items}
          onClick={handleMenuClick}
          className="flex-1 overflow-auto"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
