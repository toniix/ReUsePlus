import React, { useState, useEffect } from "react";
import PostModal from "./PostCardModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePostsContext } from "../../context/PostsContext";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import ImageCarousel from "../../Components/ImageCarousel";

const PostsGrid = ({ showAllPosts = true }) => {
  const { user } = useGlobalContext();
  const { posts, loading, fetchPosts } = usePostsContext();
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    console.log("User:", user); // Para debugging
    const loadPosts = async () => {
      if (user) {
        // Pasar null como userId cuando se quieren mostrar todos los posts
        await fetchPosts(showAllPosts, user.id);
      }
    };
    loadPosts();
  }, [user, showAllPosts]);

  // Para debugging
  // console.log("Posts:", posts);
  // console.log("Loading:", loading);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 p-8">
        {showAllPosts
          ? "No hay publicaciones disponibles"
          : "No has creado ninguna publicación aun"}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
            onClick={() => setSelectedPost(post)}
          >
            <ImageCarousel images={post.images || []} />
            <div className="absolute top-3 right-3 z-10">
              <span
                className={`
                    px-3 py-1.5
                    rounded-full 
                    text-sm
                    font-medium 
                    shadow-lg
                    flex items-center gap-1.5
                    ${post.statusStyles.container}
                    ${post.statusStyles.text}
                  `}
              >
                <span className="text-lg leading-none">
                  {post.statusStyles.icon}
                </span>
                {post.estado}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {post.category} • {post.location} • {post.date}
              </p>

              {/* Display author name */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                <span className="font-medium">Publicado por:</span>
                <span>{post.author}</span>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{post.comments || 0}</span>
                  </button>
                </div>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onPostDeleted={fetchPosts}
        />
      )}
    </>
  );
};

export default PostsGrid;
