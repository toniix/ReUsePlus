// services/postService.js
import { supabase } from "../supabase/client"; // asegúrate de importar tu instancia de supabase

export const fetchPostsService = async () => {
  try {
    let query = supabase.from("posts").select(
      `*, 
         profiles ( full_name ),
         post_images ( image_url ),
         post_tags ( tags ( name ) )`
    );

    const { data, error } = await query;
    if (error) throw error;

    return data; // Asegúrate de que el estado se actualice aquí
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
