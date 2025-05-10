import { Outlet, useLocation, useNavigate } from "react-router";
import { Layout, Menu } from "antd";

const { Header, Content } = Layout;

const MENU_ITEMS = [
  { label: "Home", key: "/" },
  { label: "About", key: "/about" },
  { label: "Contact", key: "/contact" },
];

export default function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Layout className="w-screen h-screen">
      <Header className="flex items-center">
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[location?.pathname ?? ""]}
          items={MENU_ITEMS}
          className="flex-1 flex items-center justify-center"
          onClick={(e) => navigate(e.key)}
        />
      </Header>
      <Content className="flex flex-col items-center">
        <Outlet />
      </Content>
    </Layout>
  );
}
