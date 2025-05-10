import { Post } from "../components/ui/post";
// import Sidebar from "../components/ui/sidebar";
export default function Home() {
  return (
    <div className="flex flex-row">
      <div className="flex justify-center items-center flex-col w-full bg-[#23252d]">
        <h1 className="text-3xl font-bold mb-6">Recent Reports</h1>
        <Post />
      </div>
    </div>
  );
}
