import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, Button, Dropdown, Menu, Spin, Layout } from "antd";
import type { MenuProps } from "antd";
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
import { useUser } from "../providers/user-provider";

const { Header } = Layout;

const TOP_MENU_ITEMS = [
  { label: "Нүүр", key: "/" },
  { label: "Бидний тухай", key: "/about" },
  { label: "Холбоо барих", key: "/contact" },
];

const SIDE_MENU_ITEMS: MenuProps["items"] = [
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

export default function PageLayout() {
  const { user, loading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Spin
        size="large"
        className="flex justify-center items-center h-screen"
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#23252d] text-white">
      {/* Header (always shown) */}
      <Header className="flex justify-between items-center bg-[#1f1f1f] px-6">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={TOP_MENU_ITEMS}
          className="bg-transparent text-white flex-1"
          onClick={(e) => navigate(e.key)}
        />
        {user ? (
          <Dropdown>
            <Button
              type="text"
              icon={<Avatar src={user.username} />}
              className="text-white"
            >
              {user.username}
            </Button>
          </Dropdown>
        ) : (
          <div className="flex gap-2">
            <Button type="primary" onClick={() => navigate("/login")}>
              Бүртгүүлэх
            </Button>
            <Button onClick={() => navigate("/register")}>Нэвтрэх</Button>
          </div>
        )}
      </Header>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (only if logged in) */}
        {user && location.pathname !== "/" && (
          <div className="w-64 bg-gray-800 h-full overflow-y-auto">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={SIDE_MENU_ITEMS}
              className="h-full"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
