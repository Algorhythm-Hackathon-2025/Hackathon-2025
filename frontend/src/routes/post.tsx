import { useEffect, useState } from "react";
import { Post } from "../components/ui/post";
import axios from "axios";

interface Problem {
  _id: string;
  title: string;
  images: string[];
}

export default function Home() {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    axios
      .get("/api/problems/get")
      .then((res) => setProblems(res.data))
      .catch((err) => console.error("Error fetching problems:", err));
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#23252d] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Recent Reports</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {problems.map((problem) => {
          const imageUrls = (problem.images || []).map(
            (img: string) =>
              `/api/uploads/${img.replace(/\\/g, "/").split("/").pop()}`
          );
          return (
            <Post
              key={problem._id}
              title={problem.title}
              imageUrls={imageUrls}
              small
            />
          );
        })}
      </div>
    </div>
  );
}
