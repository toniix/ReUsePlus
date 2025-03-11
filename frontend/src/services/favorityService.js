import { supabase } from "../supabase/client";

export const fetchFavoritesCount = async (postId) => {
  const { count, error } = await supabase
    .from("favorites")
    .select("id", { count: "exact" })
    .eq("post_id", postId);

  if (error) throw error;
  return count || 0;
};

export const toggleFavority = async (userId, postId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .eq("post_id", postId);

  if (error) throw error;

  if (data.length > 0) {
    // If the user has already favorited the post, remove the favority
    const { error: deleteError } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("post_id", postId);

    if (deleteError) throw deleteError;
  } else {
    // Otherwise, add the favority
    const { error: insertError } = await supabase
      .from("favorites")
      .insert({ user_id: userId, post_id: postId });

    if (insertError) throw insertError;
  }
};
