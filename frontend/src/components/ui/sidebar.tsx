import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Outlet } from "react-router";

const items: MenuProps["items"] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 text-white flex flex-col">
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          className="flex-1 overflow-auto"
        />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <div className="flex-1 overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
