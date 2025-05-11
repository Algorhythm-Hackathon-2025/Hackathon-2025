// import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, Button, Dropdown, Menu, Spin, Layout } from "antd";
import { useUser } from "../providers/user-provider";
import { logout } from "../api/user/auth";

const { Header } = Layout;

const TOP_MENU_ITEMS = [
  { label: "Нүүр", key: "/" },
  { label: "Асуудал харах", key: "/report" },
];
const TOP_MENU_ITEMS_ADMIN = [
  { label: "Нүүр", key: "/" },
  { label: "Асуудлууд", key: "/admin" },
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
          items={!user?.isAdmin ? TOP_MENU_ITEMS : TOP_MENU_ITEMS_ADMIN}
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

      <Outlet />
    </div>
  );
}
