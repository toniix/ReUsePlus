import { useState, useEffect, useCallback } from "react";
import { fetchPostsService } from "../services/postService";
import {
  fetchFavoritesCount,
  toggleFavority,
} from "../services/favorityService";
import getStatusStyles from "../utils/getStatusStyles";
import { formatTimeAgo } from "../utils/formatTimeAgo";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPostsService();
      const processedPosts = await Promise.all(
        data.map(async (post) => {
          const favoritesCount = await fetchFavoritesCount(post.id);
          return {
            ...post,
            images: post.post_images?.map((img) => img.image_url) || [],
            tags: post.post_tags?.map((tag) => tag.tags?.name) || [],
            author: post.profiles?.full_name,
            date: formatTimeAgo(post.created_at),
            statusStyles: getStatusStyles(post.estado),
            favoritesCount,
          };
        })
      );
      setPosts(processedPosts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleFavority = async (userId, postId) => {
    try {
      await toggleFavority(userId, postId);
      fetchPosts(); // Refresh posts to update favorities count
    } catch (err) {
      console.error("Error toggling favority:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    setPosts,
    refreshPosts: fetchPosts,
    handleToggleFavority,
  };
};
