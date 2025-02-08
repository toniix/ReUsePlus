import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import getStatusStyles from "../utils/getStatusStyles";
import { successToast, errorToast } from "../utils/toastNotifications";
import { useGlobalContext } from "./GlobalContext";

const PostsContext = createContext();

export const usePostsContext = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useGlobalContext();

  const fetchPosts = async (showAllPosts, userId = null) => {
    try {
      setLoading(true);
      let query = supabase
        .from("posts")
        .select(
          `
          *,
          profiles (
            full_name
          ),
          post_images (
            image_url
          ),
          post_tags (
            tags (
              name
            )
          )
        `
        )
        .order("created_at", { ascending: false });

      // Solo filtrar por usuario si se solicita explícitamente y no se quieren todos los posts
      if (!showAllPosts && userId) {
        query = query.eq("user_id", userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      const processedPosts = data.map((post) => ({
        ...post,
        images: post.post_images?.map((img) => img.image_url) || [],
        tags: post.post_tags?.map((tag) => tag.tags?.name) || [],
        author: post.profiles?.full_name || "Usuario desconocido",
        date: formatTimeAgo(post.created_at),
        statusStyles: getStatusStyles(post.estado),
      }));

      setPosts(processedPosts);
      return processedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
      errorToast("Error al cargar las publicaciones");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId, currentUserId) => {
    const start = performance.now();

    try {
      // Primero, verificar la propiedad del post
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select("user_id")
        .eq("id", postId)
        .single();

      if (postError) throw postError;

      // Validar que el usuario actual sea el dueño del post
      if (!postData || postData.user_id !== currentUserId) {
        errorToast("No tienes permiso para eliminar esta publicación");
        return false;
      }

      // Ejecutar operaciones en paralelo
      const [
        { data: imageUrls, error: imageUrlError },
        { data: storageFiles, error: listError },
      ] = await Promise.all([
        supabase.from("post_images").select("image_url").eq("post_id", postId),
        supabase.storage.from("posts").list(`${postId}`),
      ]);

      if (imageUrlError) throw imageUrlError;
      if (listError) throw listError;

      // Eliminar archivos del storage en paralelo si existen
      const deleteOperations = [];
      if (storageFiles && storageFiles.length > 0) {
        const filesToDelete = storageFiles.map(
          (file) => `${postId}/${file.name}`
        );
        deleteOperations.push(
          supabase.storage.from("posts").remove(filesToDelete)
        );
      }

      // Operaciones de eliminación en base de datos en paralelo
      deleteOperations.push(
        supabase.from("post_images").delete().eq("post_id", postId),
        supabase.from("post_tags").delete().eq("post_id", postId),
        supabase.from("posts").delete().eq("id", postId)
      );

      // Ejecutar todas las operaciones en paralelo
      const results = await Promise.all(deleteOperations);

      // Verificar si hay errores en alguna operación
      const errors = results.filter((result) => result.error);
      if (errors.length > 0) {
        throw errors[0].error;
      }

      // Actualizar estado local de posts
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      const end = performance.now();
      console.log(
        `🕒 Tiempo de eliminación de post: ${(end - start).toFixed(2)} ms`
      );

      successToast("Publicación eliminada correctamente");

      return true;
    } catch (error) {
      const end = performance.now();
      console.log(
        `🕒 Tiempo de eliminación de post (con error): ${(end - start).toFixed(
          2
        )} ms`
      );

      console.error("Error deleting post:", error);
      errorToast("No se pudo eliminar la publicación. Inténtalo de nuevo.");

      return false;
    }
  };

  const value = {
    posts,
    loading,
    fetchPosts,
    deletePost,
    setPosts,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
