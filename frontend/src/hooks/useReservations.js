import {
  createReservation,
  handleReservationResponse,
} from "../services/reservationService";
import { createReservationNotification } from "../services/notificationService";
import { successToast, errorToast } from "../utils/toastNotifications";
import { usePosts } from "./usePosts";

export const useReservations = () => {
  const { refreshPosts } = usePosts();

  const createNewReservation = async (postId, userId, ownerId) => {
    try {
      const { reservation, error } = await createReservation(
        postId,
        userId,
        ownerId
      );
      if (error) throw error;

      await createReservationNotification(
        ownerId,
        postId,
        reservation.id,
        "RESERVATION_REQUEST"
      );

      successToast("Solicitud de reserva enviada correctamente");
      await refreshPosts();
      return true;
    } catch (error) {
      console.error("Error creating reservation:", error);
      errorToast("Error al crear la reserva");
      return false;
    }
  };

  const respondToReservation = async (reservationId, accepted) => {
    try {
      const { reservation, error } = await handleReservationResponse(
        reservationId,
        accepted
      );
      if (error) throw error;

      await createReservationNotification(
        reservation.requester_id,
        reservation.post_id,
        reservationId,
        accepted ? "RESERVATION_ACCEPTED" : "RESERVATION_REJECTED"
      );

      successToast(
        accepted
          ? "Reserva aceptada correctamente"
          : "Reserva rechazada correctamente"
      );
      await refreshPosts();
      return true;
    } catch (error) {
      console.error("Error handling reservation:", error);
      errorToast("Error al procesar la reserva");
      return false;
    }
  };

  return {
    createNewReservation,
    respondToReservation,
  };
};
