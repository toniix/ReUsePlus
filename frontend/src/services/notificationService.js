import { supabase } from "../supabase/client";

export const createReservationNotification = async (
  userId, // Cambiamos ownerId a userId para que sea más genérico
  postId,
  reservationId,
  type
) => {
  try {
    const { data, error } = await supabase.from("notifications").insert([
      {
        user_id: userId, // Asegurarse de que la notificación se envíe al usuario correcto
        post_id: postId,
        reservation_id: reservationId,
        type,
        is_read: false,
      },
    ]);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const getNotificationContent = (type) => {
  const contents = {
    RESERVATION_REQUEST: "Alguien ha solicitado reservar tu donación",
    RESERVATION_ACCEPTED: "Tu solicitud de reserva ha sido aceptada",
    RESERVATION_REJECTED: "Tu solicitud de reserva ha sido rechazada",
  };
  return contents[type] || "";
};
