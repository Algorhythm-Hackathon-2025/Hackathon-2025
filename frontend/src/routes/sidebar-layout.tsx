import {
  AppstoreOutlined,
  HeatMapOutlined,
  LogoutOutlined,
  ShopOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Spin, type MenuProps } from "antd";
import { useUser } from "../providers/user-provider";
import { Outlet, useNavigate } from "react-router";
import { Post } from "../components/ui/post";
import { useEffect, useState } from "react";
import axios from "axios";

const SIDE_MENU_ITEMS: MenuProps["items"] = [
  { key: "/report", icon: <UploadOutlined />, label: "Асуудал мэдээлэх" },
  { key: "/jobs", icon: <ShopOutlined />, label: "Ажлын зар" },
  { key: "/map", icon: <HeatMapOutlined />, label: "Газрын зураг" },
];

interface Problem {
  _id: string;
  title: string;
  images: string[];
  voteSum: number;
  selfVote?: "up" | "down";
  status?: "pending" | "accepted" | "rejected" | "done";
}

export default function SidebarLayout() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [donePosts, setDonePosts] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonePosts = async () => {
      try {
        const res = await axios.get("/api/problems/get");
        const filtered = res.data.filter((p: Problem) => p.status === "done");
        setDonePosts(filtered);
      } catch (err) {
        console.error("Failed to fetch done problems:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonePosts();
  }, []);

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

      {/* Right Sidebar */}
      {user && (
        <div className="w-80 bg-[#1f1f1f] text-white h-full overflow-y-auto border-l border-gray-800 p-4 hidden lg:block">
          <h2 className="text-xl font-semibold mb-10">Шийдэгдсэн асуудлууд</h2>
          {loading ? (
            <Spin />
          ) : (
            <div className="flex flex-col gap-4">
              {donePosts.map((post) => (
                <Post
                  key={post._id}
                  title={post.title}
                  voteSum={post.voteSum}
                  selfVote={post.selfVote}
                  imageUrls={post.images.map(
                    (img) => `/api/${img.replace(/\\/g, "/")}`
                  )}
                  status={post.status}
                  small
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
