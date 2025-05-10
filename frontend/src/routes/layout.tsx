import { Outlet, useLocation, useNavigate } from "react-router";
import { Layout, Menu } from "antd";

const { Header, Content } = Layout;

const MENU_ITEMS = [
  { label: "Home", key: "/" },
  { label: "About", key: "/about" },
  { label: "Contact", key: "/contact" },
  { label: "Donation", key: "/donation" },
];

export default function PageLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Layout className="w-screen h-screen">
      <Header className="flex items-center  bg-gray-950 py-10">
        <div className="flex justify-between w-full">
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[location?.pathname ?? ""]}
            items={MENU_ITEMS}
            className="flex-1 flex items-center justify-center text-lg bg-transparent space-x-5"
            onClick={(e) => navigate(e.key)}
          />
          <div className="flex items-center space-x-4">
            <button>
              <a href="facebook.com" className="text-white hover:text-blue-600">
                нэвтрэх
              </a>
            </button>
            <button>
              <a href="facebook.com" className="text-white hover:text-blue-600">
                бүртгүүлэх
              </a>
            </button>
          </div>
        </div>
      </Header>
      <Content className="flex flex-col items-center">
        <Outlet />
      </Content>
    </Layout>
  );
}
