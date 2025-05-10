import { Outlet } from "react-router";
import { Layout } from "antd";
import { Header } from "../components/ui/header";

const { Content } = Layout;

export default function PageLayout() {
  return (
    <Layout className="w-screen h-screen">
      <Header />
      <Content className="flex flex-col items-center">
        <Outlet />
      </Content>
    </Layout>
  );
}
