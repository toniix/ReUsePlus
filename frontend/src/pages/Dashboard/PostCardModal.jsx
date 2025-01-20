import React from "react";
import { X } from "lucide-react";
import { formatTimeAgo } from "../../assets/formatTimeAgo";
import { MessageCircle, MoreHorizontal } from "lucide-react";

const Modal = ({ selectedPost, setSelectedPost }) => {
  const closeModal = () => {
    setSelectedPost(null);
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={closeModal}
      />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
            <div className="relative">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className={`absolute top-4 left-4 px-3 py-1.5 rounded text-sm font-semibold ${
                  selectedPost.status === "DISPONIBLE"
                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                }`}
              >
                {selectedPost.status}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {selectedPost.title}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm font-medium rounded">
                  {selectedPost.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Posted {formatTimeAgo(selectedPost.createdAt)}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {selectedPost.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {selectedPost.status === "DISPONIBLE" && (
                  <>
                    <button className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-medium">
                      RESERVAR
                    </button>
                    <button className="flex-1 px-4 py-2 bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 rounded-lg hover:bg-rose-200 dark:hover:bg-rose-500/20 font-medium">
                      SOLICITAR
                    </button>
                  </>
                )}
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>CHAT</span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  <MoreHorizontal className="h-5 w-5" />
                  <span>OTROS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
