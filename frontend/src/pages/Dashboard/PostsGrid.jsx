import { formatTimeAgo } from "../../assets/formatTimeAgo";
import { posts } from "../../assets/Posts";
import { useState } from "react";
import Modal from "./PostCardModal";

const PostsGrid = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-semibold ${
                  post.status === "DISPONIBLE"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                }`}
              >
                {post.status}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                  {post.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="inline-block px-2 py-1 bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-xs font-medium rounded">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(post.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <Modal selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
      )}
    </>
  );
};

export default PostsGrid;
