import { Post } from "../components/ui/post";
import axios from "axios";
import { useRequest } from "ahooks";
import { Spin } from "antd";

interface Problem {
  _id: string;
  title: string;
  images: string[];
  voteSum: number;
  selfVote?: "up" | "down";
}

export default function Home() {
  const {
    data: problems,
    loading,
    refresh: refreshProblems,
  } = useRequest(async () => {
    const response = await axios.get("/api/problems/get");
    return response.data as Problem[];
  });
  const { run: voteRun, loading: voting } = useRequest(
    async (id: string, vote?: "up" | "down") => {
      await axios.post(`/api/problems/vote/${id}/${vote || ""}`);
      refreshProblems();
    },
    { manual: true }
  );

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div className="flex flex-col items-center bg-[#23252d] min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Recent Reports</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {problems?.map((problem) => {
          const imageUrls = (problem.images || []).map(
            (img: string) => `/api/${img.replace(/\\/g, "/")}`
          );
          return (
            <Post
              key={problem._id}
              title={problem.title}
              imageUrls={imageUrls}
              selfVote={problem.selfVote}
              voteSum={problem.voteSum}
              onUpvote={() =>
                voteRun(
                  problem._id,
                  problem.selfVote === "up" ? undefined : "up"
                )
              }
              onDownvote={() =>
                voteRun(
                  problem._id,
                  problem.selfVote === "down" ? undefined : "down"
                )
              }
              voting={voting}
              small
            />
          );
        })}
      </div>
    </div>
  );
}
