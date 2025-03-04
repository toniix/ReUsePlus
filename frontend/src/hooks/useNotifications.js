import { useEffect, useState } from "react";
import { supabase } from "../supabase/client"; // Asegúrate de importar tu configuración de Supabase

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Cargar notificaciones iniciales
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) console.error("Error al cargar notificaciones:", error);
      else {
        setNotifications(data);
        // Contar notificaciones no leídas
        const unread = data.filter(
          (notification) => !notification.is_read
        ).length;
        setUnreadCount(unread);
      }
    };

    fetchNotifications();

    // Suscribirse a cambios en tiempo real
    const subscription = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log("Nueva notificación:", payload.new);
          setNotifications((prev) => [payload.new, ...prev]); // Agregar nueva notificación a la lista
          // Actualizar el contador de notificaciones no leídas
          if (!payload.new.is_read) {
            setUnreadCount((prevCount) => prevCount + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return { notifications, unreadCount };
};

export default useNotifications;
