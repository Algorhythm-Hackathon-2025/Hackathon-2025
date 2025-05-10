import React, { useEffect, useState } from "react";
import axios from "axios";
import { Post } from "./post";

interface Problem {
  _id: string;
  title: string;
  images: string[];
}

export const RecentReports: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3012/api/problems/get"
        );
        setProblems(response.data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4">
      {problems.map((problem) => {
        const imageUrls = (problem.images || []).map(
          (img) => `/api/uploads/${img.replace(/\\/g, "/").split("/").pop()}`
        );

        return (
          <Post
            key={problem._id}
            title={problem.title}
            imageUrls={imageUrls}
            small={true}
          />
        );
      })}
    </div>
  );
};
