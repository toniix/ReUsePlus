import React, { useState, useRef } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Tag,
  Trash2,
  Edit,
} from "lucide-react";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePostsContext } from "../../context/PostsContext";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { ChatDrawer } from "../../Components/chat/ChatDrawer";

export default function PostModal({ post, onClose, onPostDeleted, onEdit }) {
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
  const { deletePost } = usePostsContext();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!post) return null;

  const isOwnPost = post.user_id === user.id;

  const handleEditPost = () => {
    navigate("/dashboard/post/new", { state: { postToEdit: post } });
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeletePost = async () => {
    setIsDeleting(true);

    const result = await deletePost(post.id, user.id);

    if (result) {
      // Cerrar el modal de confirmación
      closeDeleteModal();

      // Cerrar el modal actual
      onClose();

      // Navegar al dashboard
      navigate("/dashboard");
    }

    setIsDeleting(false);
  };

  const renderDeleteConfirmationModal = () => {
    return (
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeletePost}
        isDeleting={isDeleting}
      />
    );
  };

  const chatRef = useRef(null);

  const handleStartChat = async (userId) => {
    if (chatRef.current) {
      try {
        // Asegurarnos de que tenemos el post.id
        if (!post.id) {
          throw new Error("No se encontró el ID del post");
        }

        await chatRef.current.initializeChat(userId, post.id); // Pasamos explícitamente post.id
      } catch (error) {
        console.error("Error al iniciar chat:", error);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
          <div className="relative">
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={onClose}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
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

                <div className="space-y-3">
                  {isOwnPost ? (
                    <div className="space-y-3">
                      <button
                        onClick={handleEditPost}
                        className="
                          w-full 
                          flex 
                          items-center 
                          justify-center 
                          gap-2 
                          px-4 
                          py-3 
                          bg-rose-50 
                          dark:bg-rose-900/20 
                          text-rose-600 
                          dark:text-rose-400 
                          rounded-xl 
                          hover:bg-rose-100 
                          dark:hover:bg-rose-900/30 
                          transition-colors 
                          duration-200 
                          border 
                          border-rose-200 
                          dark:border-rose-800/50
                        "
                      >
                        <Edit className="h-5 w-5" strokeWidth={2} />
                        <span className="font-medium">Editar publicación</span>
                      </button>
                      <button
                        onClick={openDeleteModal}
                        className="
                          w-full 
                          flex 
                          items-center 
                          justify-center 
                          gap-2 
                          px-4 
                          py-3 
                          bg-red-50 
                          dark:bg-red-900/20 
                          text-red-600 
                          dark:text-red-400 
                          rounded-xl 
                          hover:bg-red-100 
                          dark:hover:bg-red-900/30 
                          transition-colors 
                          duration-200 
                          border 
                          border-red-200 
                          dark:border-red-800/50
                        "
                      >
                        <Trash2 className="h-5 w-5" strokeWidth={2} />
                        <span className="font-medium">
                          Eliminar publicación
                        </span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2.5 bg-rose-500 text-white rounded-lg 
                          hover:bg-rose-600 transition-colors">
                          Solicitar donación
                        </button>
                        <button
                          onClick={() => handleStartChat(post.user_id)}
                          className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 
                            dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200
                            hover:border-blue-500 hover:text-blue-500 transition-colors"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>Enviar mensaje</span>
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderDeleteConfirmationModal()}
      <ChatDrawer
        ref={chatRef}
        showFloatingButton={false}
        otherUserName={post.profiles?.full_name || "Usuario desconocido"}
        otherUserId={post.user_id}
        postId={post.id}
      />
    </>
  );
}
