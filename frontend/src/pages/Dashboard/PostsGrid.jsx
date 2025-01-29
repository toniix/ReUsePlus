import React, { useState, useEffect } from "react";
import PostModal from "./PostCardModal";
import { supabase } from "../../supabase/client";
import { useGlobalContext } from "../../context/GlobalContext";
import ImageCarousel from "../../components/ImageCarousel";

const PostsGrid = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useGlobalContext();

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select(`
            *,
            post_images (image_url),
            post_tags (
              tags (name)
            )
          `)
          .eq("user_id", user?.id);

        if (error) {
          console.error("Error fetching posts:", error);
          return;
        }
        console.log(data);
        

        setPosts(data || []);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
            onClick={() => handlePostClick(post)}
          >
            <div className="relative aspect-square">
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
          </div>
        ))}
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default PostsGrid;
