import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase/client";
import { NotificationItem } from "./NotificationItem";
import { usePostsContext } from "../../context/PostsContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { usePosts } from "@/hooks/usePosts";

export const NotificationsList = ({ onNotificationRead, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const { handleReservationResponse } = usePostsContext();
  const { user } = useGlobalContext();
  const { refreshPosts } = usePosts();

  // useEffect(() => {
  //   refreshPosts();
  // }, [refreshPosts]);

  const fetchNotifications = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setNotifications(data);
    }
  };

  const markAsRead = async (notificationId) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (!error) {
      setNotifications(
        notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
      onNotificationRead?.();
    }
  };

  const handleAccept = async (reservationId, notificationId) => {
    const success = await handleReservationResponse(reservationId, true);
    if (success) {
      // Actualizar la notificación a 'RESERVA ACEPTADA'
      await supabase
        .from("notifications")
        .update({
          type: "RESERVATION_ACCEPTED",
          content: "Tu solicitud de reserva ha sido aceptada",
        })
        .eq("id", notificationId);

      fetchNotifications(); // Refrescar la lista de notificaciones
      // refreshPosts();
      onClose?.();
    }
  };

  const handleReject = async (reservationId, notificationId) => {
    const success = await handleReservationResponse(reservationId, false);
    if (success) {
      // Actualizar la notificación a 'RESERVA RECHAZADA'
      await supabase
        .from("notifications")
        .update({
          type: "RESERVATION_REJECTED",
          content: "Tu solicitud de reserva ha sido rechazada",
        })
        .eq("id", notificationId);

      fetchNotifications(); // Refrescar la lista de notificaciones
      onClose?.();
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Configurar un intervalo para actualizar las notificaciones cada 30 segundos
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="max-h-[60vh] overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No tienes notificaciones
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onAccept={(reservationId) =>
              handleAccept(reservationId, notification.id)
            }
            onReject={(reservationId) =>
              handleReject(reservationId, notification.id)
            }
            onRead={() => markAsRead(notification.id)}
          />
        ))
      )}
    </div>
  );
};
