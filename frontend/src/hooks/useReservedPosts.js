// hooks/useReservedPosts.js
import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import getStatusStyles from "../utils/getStatusStyles";
import { formatTimeAgo } from "../utils/formatTimeAgo";

export const useReservedPosts = (userId) => {
  const [reservedPosts, setReservedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const loadReservations = async () => {
      setLoading(true);
      try {
        // Consulta a la tabla 'reservations' para obtener los posts reservados
        const { data: reservationsData, error: reservationsError } =
          await supabase
            .from("reservations")
            .select(
              "posts(*, profiles(full_name), post_images(image_url), post_tags(tags(name)))"
            )
            .eq("requester_id", userId)
            .eq("status", "ACEPTADA"); // Filtrar por estado ACEPTADA

        if (reservationsError) throw reservationsError;

        // console.log(reservationsData);
        // Extraer los posts de cada reserva
        const reserved = reservationsData.map(
          (reservation) => reservation.posts
        );

        console.log(reserved);
        if (reserved.length === 0) return; // Verifica si reserved está vacío

        // Procesar cada post (formatear fechas, imágenes, etc.)
        const processedPosts = reserved.map((post) => ({
          ...post,
          images: post.post_images?.map((img) => img.image_url) || [],
          tags: post.post_tags?.map((tag) => tag.tags?.name) || [],
          author: post.profiles?.full_name,
          date: formatTimeAgo(post.created_at),
          statusStyles: getStatusStyles(post.estado),
        }));

        setReservedPosts(processedPosts);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [userId]);

  return { reservedPosts, loading, error };
};
