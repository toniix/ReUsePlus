import React from 'react';
import { Heart, MessageCircle, MoreHorizontal, X, Tag } from 'lucide-react';
import ImageCarousel from '../../components/ImageCarousel';

const PostModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full z-10"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-[300px] md:h-[500px] overflow-hidden">
                <ImageCarousel 
                  images={post.post_images || []}
                  aspectRatio="auto"
                  objectFit="contain"
                  containerClassName="h-full"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {post.category} • {post.location}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>

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
                          {tagItem.tags?.name || 'Sin nombre'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Heart className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MessageCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{post.comments || 0}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <button className="w-full px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200">
                    Solicitar donación
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                    Enviar mensaje
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;