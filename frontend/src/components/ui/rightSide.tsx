import React from "react";
import Post from "../../routes/post"; // import your custom Post card component

const mockPosts = [{ id: 1 }, { id: 2 }, { id: 3 }];

const RightSidebar: React.FC = () => {
  return (
    <aside className="w-80 text-white h-screen p-4 overflow-y-auto border-l border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Шийдэгдсэн асуудлууд</h2>
      <div className="flex flex-col gap-4">
        {mockPosts.map((post) => (
          <Post key={post.id} />
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar;
