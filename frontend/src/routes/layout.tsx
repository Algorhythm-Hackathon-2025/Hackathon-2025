import { Outlet, useLocation } from "react-router";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

const MENU_ITEMS = [
  { label: "Home", key: "/" },
  { label: "About", key: "/about" },
  { label: "Contact", key: "/contact" },
];

export default function PageLayout() {
  const location = useLocation();
  return (
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location?.pathname ?? ""]}
          items={MENU_ITEMS}
          className="flex-1 min-w-0"
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
