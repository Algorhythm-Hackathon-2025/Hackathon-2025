// import React, { useEffect, useState } from "react";
// import { Post } from "./post"; // Adjust if needed
// import axios from "axios";
// import { Spin } from "antd";

// interface Problem {
//   _id: string;
//   title: string;
//   images: string[];
//   voteSum: number;
//   selfVote?: "up" | "down";
//   status?: "pending" | "accepted" | "rejected" | "done";
// }

// const RightSidebar: React.FC = () => {
//   const [donePosts, setDonePosts] = useState<Problem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchDonePosts = async () => {
//       try {
//         const { data } = await axios.get<Problem[]>("/api/problems/get");
//         setDonePosts(data.filter((p) => p.status === "done"));
//       } catch (error) {
//         console.error("Error fetching done problems:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDonePosts();
//   }, []);

//   return (
//     <aside className="w-80 text-white h-screen p-4 overflow-y-auto border-l border-gray-800">
//       <h2 className="text-xl font-semibold mb-4">Шийдэгдсэн асуудлууд</h2>
//       {loading ? (
//         <div className="flex justify-center items-center h-full">
//           <Spin />
//         </div>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {donePosts.map(
//             ({ _id, title, voteSum, selfVote, images, status }) => (
//               <Post
//                 key={_id}
//                 title={title}
//                 voteSum={voteSum}
//                 selfVote={selfVote}
//                 imageUrls={images.map(
//                   (img) => `/api/${img.replace(/\\/g, "/")}`
//                 )}
//                 status={status}
//                 small
//               />
//             )
//           )}
//         </div>
//       )}
//     </aside>
//   );
// };

// export default RightSidebar;
