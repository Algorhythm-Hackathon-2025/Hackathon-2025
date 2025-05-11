import {
  HeatMapOutlined,
  ShopOutlined,
  UploadOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import { useUser } from "../providers/user-provider";
import { Outlet, useNavigate } from "react-router";
import { Post } from "../components/ui/post";

const SIDE_MENU_ITEMS: MenuProps["items"] = [
  { key: "/report", icon: <UploadOutlined />, label: "Асуудал мэдээллэх" },
  { key: "/jobs", icon: <ShopOutlined />, label: "Ажлын зар" },
  { key: "/map", icon: <HeatMapOutlined />, label: "Газрын зураг" },
  { key: "/about", icon: <ClockCircleOutlined />, label: "Сүүлийн үеийн асуудлууд" },
];

export default function SidebarLayout() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 overflow-hidden">
      {user && (
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
      {user && (
        <div className="w-80 bg-[#1f1f1f] text-white h-full overflow-y-auto border-l border-gray-800 p-4 hidden lg:block">
          <h2 className="text-xl font-semibold mb-10">Шийдэгдсэн асуудлууд</h2>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((id) => (
              <Post key={id} small voteSum={0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
