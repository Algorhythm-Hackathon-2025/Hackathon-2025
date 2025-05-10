// import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, Button, Dropdown, Menu, Spin, Layout } from "antd";
import type { MenuProps } from "antd";
import { Post } from "../components/ui/post";
import {
  AppstoreOutlined,
  UploadOutlined,
  ShopOutlined,
  UserOutlined,
  HeatMapOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useUser } from "../providers/user-provider";
import { logout } from "../api/user/auth";

const { Header } = Layout;

const TOP_MENU_ITEMS = [
  { label: "Нүүр", key: "/" },
  { label: "Бидний тухай", key: "/about" },
  { label: "Холбоо барих", key: "/contact" },
];

const SIDE_MENU_ITEMS: MenuProps["items"] = [
  { key: "/", icon: <AppstoreOutlined />, label: "Нүүр" },
  { key: "/report", icon: <UploadOutlined />, label: "Асуудал мэдээлэх" },
  { key: "/jobs", icon: <ShopOutlined />, label: "Ажлын зар" },
  { key: "/profile", icon: <UserOutlined />, label: "Профайл" },
  { key: "/map", icon: <HeatMapOutlined />, label: "Газрын зураг" },
  { key: "/logout", icon: <LogoutOutlined />, label: "Гарах" },
];

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

  const profileItems = user && [
    {
      key: "/profile",
      label: "Профайл",
      onClick: () => navigate("/profile"),
    },
    {
      key: "/logout",
      label: "Гарах",
      onClick: async () => {
        await logout();
        navigate("/login");
      },
    },
  ];

  return (
    <div className="flex flex-col h-screen w-screen bg-[#23252d] text-white">
      {/* Header */}
      <Header className="flex justify-between items-center bg-[#1f1f1f] px-6">
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={TOP_MENU_ITEMS}
          className="bg-transparent text-white flex-1"
          onClick={(e) => navigate(e.key)}
        />
        {user ? (
          <Dropdown menu={{ items: profileItems }}>
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
              Нэвтрэх
            </Button>
            <Button type="default" onClick={() => navigate("/register")}>
              Бүртгүүлэх
            </Button>
          </div>
        )}
      </Header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {user && location.pathname !== "/" && (
          <div className="w-64 bg-[#23252d] h-full overflow-y-auto">
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={SIDE_MENU_ITEMS}
              className="h-full"
              onClick={(e) => navigate(e.key)}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

        {/* Right Sidebar (only on home + user logged in) */}
        {user && location.pathname !== "/" && (
          <div className="w-80 bg-[#1f1f1f] text-white h-full overflow-y-auto border-l border-gray-800 p-4 hidden lg:block">
            <h2 className="text-xl font-semibold mb-10">
              Шийдэгдсэн асуудлууд
            </h2>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((id) => (
                <Post key={id} small />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
