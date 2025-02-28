import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";
import { successToast, errorToast } from "../utils/toastNotifications";
import { usePosts } from "../hooks/usePosts";
import { fetchPostsService } from "../services/postService";
const PostsContext = createContext();
import { useReservations } from "../hooks/useReservations";

export const usePostsContext = () => useContext(PostsContext);

export const PostsProvider = ({ children }) => {
  const { posts, setPosts, refreshPosts } = usePosts();
  // const { createNewReservation, respondToReservation } = useReservations();

  const deletePost = async (postId, currentUserId) => {
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
      successToast("Publicación eliminada correctamente");

      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      errorToast("No se pudo eliminar la publicación. Inténtalo de nuevo.");

      return false;
    }
  };

  // Función para crear una reserva
  const createReservation = async (postId, userId, ownerId) => {
    try {
      // Crear la reserva
      const { data: reservation, error: reservationError } = await supabase
        .from("reservations")
        .insert([
          {
            post_id: postId,
            requester_id: userId,
            owner_id: ownerId,
            status: "PENDIENTE",
          },
        ])
        .select()
        .single();

      if (reservationError) throw reservationError;

      // Crear la notificación para el dueño del post
      const { data: post } = await supabase
        .from("posts")
        .select("user_id")
        .eq("id", postId)
        .single();

      if (post) {
        await supabase.from("notifications").insert([
          {
            user_id: post.user_id,
            type: "RESERVATION_REQUEST",
            content: "Alguien ha solicitado reservar tu donación",
            post_id: postId,
            reservation_id: reservation.id,
          },
        ]);
      }

      successToast("Solicitud de reserva enviada correctamente");
      await refreshPosts(); // Actualizar después de reservar

      return true;
    } catch (error) {
      console.error("Error creating reservation:", error);
      errorToast("Error al crear la reserva");
      return false;
    }
  };

  const handleReservationResponse = async (reservationId, accepted) => {
    try {
      // Actualizar el estado de la reserva
      const newStatus = accepted ? "ACEPTADA" : "RECHAZADA";
      const { data: reservation, error: reservationError } = await supabase
        .from("reservations")
        .update({ status: newStatus })
        .eq("id", reservationId)
        .select()
        .single();

      if (reservationError) throw reservationError;

      // Si fue aceptada, actualizar el estado del post
      if (accepted) {
        const { error: postError } = await supabase
          .from("posts")
          .update({ estado: "RESERVADO" })
          .eq("id", reservation.post_id);

        if (postError) throw postError;
        await fetchPostsService();
      }

      // Crear notificación para el usuario que solicitó la reserva
      await supabase.from("notifications").insert([
        {
          user_id: reservation.user_id,
          type: accepted ? "RESERVATION_ACCEPTED" : "RESERVATION_REJECTED",
          content: accepted
            ? "Tu solicitud de reserva ha sido aceptada"
            : "Tu solicitud de reserva ha sido rechazada",
          post_id: reservation.post_id,
          reservation_id: reservationId,
        },
      ]);

      successToast(
        accepted
          ? "Reserva aceptada correctamente"
          : "Reserva rechazada correctamente"
      );
      return true;
    } catch (error) {
      console.error("Error handling reservation:", error);
      errorToast("Error al procesar la reserva");
      return false;
    }
  };

  const value = {
    posts,
    deletePost,
    createReservation,
    handleReservationResponse,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};
