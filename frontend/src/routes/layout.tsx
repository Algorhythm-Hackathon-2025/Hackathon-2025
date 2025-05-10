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
    <Layout style={{ width: "100vw", height: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location?.pathname ?? ""]}
          items={MENU_ITEMS}
          style={{ flex: 1, display: "flex", justifyContent: "center" }}
          onClick={(e) => navigate(e.key)}
        />
      </Header>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}
