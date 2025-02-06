import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
} from "lucide-react";
import { useGlobalContext } from "../../context/GlobalContext";
import { deletePost } from "../../utils/deletePost";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

export default function PostModal({ post, onClose, onPostDeleted }) {
  //Logica para el carrusel de imagenes
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!post) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % post.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + post.images.length) % post.images.length
    );
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  // Logica para el borrado de posts
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!post) return null;

  const isOwnPost = post.user_id === user.id;

  const handleEditPost = () => {
    navigate("/dashboard/post/new", { state: { postToEdit: post } });
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id);

      // Cerrar el modal de confirmación
      closeDeleteModal();

      // Cerrar el modal principal
      onClose();

      // Llamar a la función de actualización de posts si está definida
      if (onPostDeleted) {
        onPostDeleted(post.id); // Pasar el ID del post eliminado
      }

      // Navegar al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full z-10"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-[300px] md:h-[500px]">
              <img
                src={post.images[currentImageIndex]}
                alt={post.title}
                className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
              />

              {/* Navigation arrows */}
              {post.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Thumbnail strip */}
              {post.images.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                  {post.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative h-16 w-16 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === currentImageIndex
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black/50"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h2>
                  {/* Display author name */}
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <span className="font-medium">Publicado por:</span>
                    <span>
                      {post.profiles?.full_name || "Usuario desconocido"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>{post.category}</span>
                    <span className="text-xs">•</span>
                    <span>{post.location}</span>
                    <span className="text-xs">•</span>
                    <span>{formatTimeAgo(post.created_at)}</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {post.description}
              </p>
              {/* Tags Section */}
              {post.post_tags && post.post_tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Etiquetas
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.post_tags.map((tagItem, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 text-rose-600 dark:text-rose-300 rounded-full border border-rose-200 dark:border-rose-800/30 hover:shadow-sm transition-all duration-200"
                      >
                        {tagItem.tags?.name || "Sin nombre"}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {post.likes}
                  </span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MessageCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {post.comments}
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                {isOwnPost ? (
                  <div className="space-y-4">
                    <button
                      onClick={handleEditPost}
                      className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200"
                    >
                      Editar publicación
                    </button>
                    <button
                      onClick={() => setIsDeleteModalOpen(true)}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      Eliminar publicación
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <button className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700">
                        Solicitar donación
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        Enviar mensaje
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeletePost}
      />
    </div>
  );
}
