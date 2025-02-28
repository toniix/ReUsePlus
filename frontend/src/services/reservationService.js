import { supabase } from "../supabase/client";
import { successToast, errorToast } from "../utils/toastNotifications";

export const createReservation = async (postId, userId, ownerId) => {
  try {
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
    return { reservation, error: null };
  } catch (error) {
    return { reservation: null, error };
  }
};

export const handleReservationResponse = async (reservationId, accepted) => {
  try {
    const newStatus = accepted ? "ACEPTADA" : "RECHAZADA";
    const { data: reservation, error: reservationError } = await supabase
      .from("reservations")
      .update({ status: newStatus })
      .eq("id", reservationId)
      .select()
      .single();

    if (reservationError) throw reservationError;
    return { reservation, error: null };
  } catch (error) {
    return { reservation: null, error };
  }
};
