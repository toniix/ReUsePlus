import React, { useState, useEffect } from "react";
import PostModal from "./PostCardModal";
import { supabase } from "../../supabase/client";
import { useGlobalContext } from "../../context/GlobalContext";
import ImageCarousel from "../../components/ImageCarousel";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

const PostsGrid = ({ showAllPosts = false }) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleEditPost = (post) => {
    navigate("/dashboard/post/new", { state: { postToEdit: post } });
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase.from("posts").select(`
          *,
          post_images (image_url),
          post_tags (
            tags (name)
          )
        `);

      // Si no se muestran todas las publicaciones, filtrar por usuario actual
      if (!showAllPosts && user) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }

      setPosts(data || []);
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

  // Método para actualizar posts después de eliminar
  const handlePostDeleted = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {posts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          {showAllPosts
            ? "No hay publicaciones disponibles"
            : "No has creado ninguna publicación aún"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative"
            >
              <div
                className="relative aspect-square cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                <ImageCarousel
                  images={post.post_images || []}
                  aspectRatio="square"
                  objectFit="cover"
                  containerClassName="h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.post_tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 rounded-full"
                    >
                      {tag.tags.name}
                    </span>
                  ))}
                </div>
              </div>
              {post.user_id === user.id && (
                <button
                  onClick={() => handleEditPost(post)}
                  className="absolute top-2 right-2 bg-rose-500 text-white p-2 rounded-full hover:bg-rose-600 transition-colors"
                  title="Editar publicación"
                >
                  <Edit className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onPostDeleted={handlePostDeleted}
        />
      )}
    </div>
  );
};

export default PostsGrid;
