import { supabase } from "../supabase/client";

export const deletePost = async (postId) => {
  try {
    // Primero eliminar imágenes asociadas
    const { data: images, error: imageError } = await supabase
      .from("post_images")
      .delete()
      .eq("post_id", postId);

    if (imageError) throw imageError;

    // Luego eliminar tags asociados
    const { data: tags, error: tagError } = await supabase
      .from("post_tags")
      .delete()
      .eq("post_id", postId);

    if (tagError) throw tagError;

    // Finalmente eliminar el post
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
