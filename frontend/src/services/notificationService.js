import { supabase } from "../supabase/client";

export const createReservationNotification = async (
  userId,
  postId,
  reservationId,
  type
) => {
  try {
    const notificationData = {
      user_id: userId,
      type,
      post_id: postId,
      reservation_id: reservationId,
      content: getNotificationContent(type),
    };

    const { data, error } = await supabase
      .from("notifications")
      .insert([notificationData]);

    if (error) throw error;
    return { notification: data, error: null };
  } catch (error) {
    return { notification: null, error };
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
