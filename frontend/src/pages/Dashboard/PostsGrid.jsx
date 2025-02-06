import React, { useState, useEffect } from "react";
import PostModal from "./PostCardModal";
import { supabase } from "../../supabase/client";
import { useGlobalContext } from "../../context/GlobalContext";
import ImageCarousel from "../../Components/ImageCarousel";
import { MoreHorizontal, Heart, MessageCircle } from "lucide-react";
import getStatusStyles from "../../utils/getStatusStyles";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

const PostsGrid = ({ showAllPosts = false }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase.from("posts").select(
        `
          *,
          post_images (image_url),
          post_tags (
            tags (name)
          ),
          profiles (full_name)  // Incluir el nombre del usuario
        `
      );

      // Si no se muestran todas las publicaciones, filtrar por usuario actual
      if (!showAllPosts && user) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      // console.log(data);
      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }

      // Transformar los datos para tener una estructura más manejable
      const processedPosts = data.map((post) => {
        // Debugging: log the entire post object
        console.log("Full Post Object:", post);

        return {
          ...post,
          images: post.post_images?.map((img) => img.image_url) || [],
          tags: post.post_tags?.map((tag) => tag.tags.name) || [],
          likes: 100, // Implementar lógica de likes si es necesario
          comments: 10, // Implementar lógica de comentarios si es necesario
          author: post.profiles?.full_name || "Usuario desconocido",
          date: formatTimeAgo(post.created_at), // Add formatted date
          estado: post.estado, // Normalize estado display
          statusStyles: getStatusStyles(post.estado), // Pre-compute styles
        };
      });

      setPosts(processedPosts);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user, showAllPosts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          {showAllPosts
            ? "No hay publicaciones disponibles"
            : "No has creado ninguna publicación aún"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative"
              onClick={() => setSelectedPost(post)}
            >
              <ImageCarousel
                images={post.post_images?.map((img) => img.image_url) || []}
              />
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

                {/* Tags visible below title on mobile */}
                <div className="flex flex-wrap gap-1.5 mb-4 sm:hidden">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.comments}</span>
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
      )}
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
