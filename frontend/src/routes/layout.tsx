import { Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, Button, Dropdown, Layout, Menu, Spin } from "antd";
import { useUser } from "../providers/user-provider";
import { logout } from "../api/user/auth";

const { Header, Content } = Layout;

const MENU_ITEMS = [
  { label: "Нүүр", key: "/" },
  { label: "Бидний тухай", key: "/about" },
  { label: "Холбоо барих", key: "/contact" },
];

const ADMIN_MENU_ITEMS = [
  { label: "Нүүр", key: "/" },
  { label: "Админ", key: "/admin" },
];

export default function PageLayout() {
  const { user, loading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return <Spin size="large" />;
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
    <Layout className="w-screen h-screen">
      <Header className="w-full flex items-center">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[location?.pathname ?? ""]}
          items={!user?.isAdmin ? MENU_ITEMS : ADMIN_MENU_ITEMS}
          className="w-full flex items-center bg-transparent"
          onClick={(e) => navigate(e.key)}
        />
        {user ? (
          <Dropdown menu={{ items: profileItems }} trigger={["click"]}>
            <Button type="text" icon={<Avatar srcSet={user.username} />}>
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
      <Content className="flex flex-col items-center">
        <Outlet />
      </Content>
    </Layout>
  );
}
