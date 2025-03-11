import { useState, useEffect } from "react";
import { favorityService } from "../services/favorityService";

export const useFavority = ({ postId, userId }) => {
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      const count = await favorityService.fetchFavoritesCount(postId);
      setFavoritesCount(count);
    };

    fetchCount();
    const subscription = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        fetchCount
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [post.id]);

  const handleFavorite = async () => {
    await toggleFavorite(post.id, userId);
  };
  return {
    favoritesCount,
    loading,
    error,
    handleFavorite,
    toggleFavority,
  };
};
