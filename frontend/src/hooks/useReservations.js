import {
  createReservation,
  handleReservationResponse,
  checkPendingReservation,
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
        ownerId, // Asegurarse de que la notificación solo se envíe al propietario
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
        reservation.requester_id, // Asegurémonos de que la notificación se envíe al solicitante
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

  const checkPendingReservationStatus = async (postId, userId) => {
    try {
      const { pending, error } = await checkPendingReservation(postId, userId);
      if (error) throw error;
      return pending;
    } catch (error) {
      console.error("Error checking pending reservation:", error);
      return false;
    }
  };

  return {
    createNewReservation,
    respondToReservation,
    checkPendingReservationStatus,
  };
};
