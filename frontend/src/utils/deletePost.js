import { supabase } from "../supabase/client";
import { toast } from "react-toastify";

export const deletePost = async (postId) => {
  try {
    // Primero, obtener las URLs de las imágenes asociadas
    const { data: imageUrls, error: imageUrlError } = await supabase
      .from("post_images")
      .select("image_url")
      .eq("post_id", postId);

    if (imageUrlError) {
      throw imageUrlError;
    }

    // Eliminar imágenes del storage de Supabase
    if (imageUrls && imageUrls.length > 0) {
      // Listar todos los archivos en la carpeta del postId
      const { data: storageFiles, error: listError } = await supabase.storage
        .from("posts")
        .list(`${postId}`);

      if (listError) {
        throw listError;
      }

      // Eliminar todos los archivos en la carpeta del postId
      if (storageFiles && storageFiles.length > 0) {
        const filesToDelete = storageFiles.map(
          (file) => `${postId}/${file.name}`
        );

        const { error: storageDeleteError } = await supabase.storage
          .from("posts")
          .remove(filesToDelete);

        if (storageDeleteError) {
          throw storageDeleteError;
        }
      }
    }

    // Eliminar entradas de imágenes en la base de datos
    const { error: imageDbDeleteError } = await supabase
      .from("post_images")
      .delete()
      .eq("post_id", postId);

    if (imageDbDeleteError) {
      throw imageDbDeleteError;
    }

    // Eliminar tags asociados
    const { error: tagError } = await supabase
      .from("post_tags")
      .delete()
      .eq("post_id", postId);

    if (tagError) {
      throw tagError;
    }

    // Finalmente eliminar el post
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (error) {
      throw error;
    }

    // Notificación de éxito
    toast.success("Publicación eliminada correctamente", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    return data;
  } catch (error) {
    console.error("Error deleting post:", error);

    toast.error("No se pudo eliminar la publicación. Inténtalo de nuevo.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    throw error;
  }
};
