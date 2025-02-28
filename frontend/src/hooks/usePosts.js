import { useState, useEffect, useCallback } from "react";
import { fetchPostsService } from "../services/postService";
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
      const processedPosts = data.map((post) => ({
        ...post,
        images: post.post_images?.map((img) => img.image_url) || [],
        tags: post.post_tags?.map((tag) => tag.tags?.name) || [],
        author: post.profiles?.full_name,
        date: formatTimeAgo(post.created_at),
        statusStyles: getStatusStyles(post.estado),
      }));
      setPosts(processedPosts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, setPosts, refreshPosts: fetchPosts };
};
