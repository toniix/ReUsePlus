import React, { useState, useEffect } from "react";
import PostModal from "./PostCardModal";
import { useGlobalContext } from "../../context/GlobalContext";
import { Heart, MessageCircle } from "lucide-react";
import ImageCarousel from "../../Components/ImageCarousel";
import { usePosts } from "../../hooks/usePosts";
import { useReservedPosts } from "../../hooks/useReservedPosts";

const PostsGrid = ({ view }) => {
  const { user } = useGlobalContext();
  const {
    reservedPosts,
    loading: loadingReserved,
    refreshReservedPosts,
  } = useReservedPosts(user.id);
  const [selectedPost, setSelectedPost] = useState(null);
  const { posts, loading, refreshPosts, handleToggleFavorite } = usePosts(
    user.id
  );

  // Actualizar posts cuando cambia la vista
  useEffect(() => {
    refreshPosts();
  }, [view, refreshPosts]);

  useEffect(() => {
    refreshReservedPosts();
  }, [view, refreshReservedPosts]);

  // Determinar qué posts mostrar según la vista seleccionada
  let filteredPosts;

  if (view === "reserved") {
    filteredPosts = reservedPosts;
  } else {
    filteredPosts = posts.filter((post) => {
      switch (view) {
        case "mine":
          // Se asume que en post.user_id está el ID del autor
          return post.user_id === user.id;
        case "interested":
          // Se asume que post.interestedUsers es un array de IDs
          return post.interestedUsers && post.interestedUsers.includes(user.id);
        default:
          // 'all' muestra todos los posts
          return post.user_id !== user.id;
      }
    });
  }

  if (loading || (view === "reserved" && loadingReserved)) {
    return (
      <div className="flex justify-center items-center h-96 px-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 p-8">
        No hay publicaciones disponibles
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredPosts.map((post) => (
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
                    <span className="text-sm">{post.favoritesCount || 0}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{post.comments || 0}</span>
                  </button>
                </div>
                <button
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    post.isFavorited
                      ? "bg-blue-100 text-blue-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(post.id);
                  }}
                >
                  <Heart
                    className={`h-3 w-3 ${
                      post.isFavorited ? "fill-current" : ""
                    }`}
                  />
                  {post.isFavorited ? "Me Interesa" : "Me Interesa"}
                  <span className="text-sm">{post.favoritesCount}</span>
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
          onPostDeleted={refreshPosts}
        />
      )}
    </div>
  );
};

export default PostsGrid;
