import { useState, useEffect, useImperativeHandle, useCallback } from "react";
import { supabase } from "../supabase/client";

const useChat = (ref, userId) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("conversations");
  const [activeChat, setActiveChat] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Función para cargar conversaciones con información completa
  const loadConversations = useCallback(async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(
          `
          *,
          user1:profiles!conversations_user1_id_fkey(id, full_name),
          user2:profiles!conversations_user2_id_fkey(id, full_name),
          posts(id, title)
        `
        )
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Error al cargar conversaciones:", error);
        setConversations([]);
        return;
      }

      // Transformar los datos para facilitar su uso
      const transformedConversations =
        data?.map((conv) => {
          const isUser1 = conv.user1_id === userId;
          const otherUser = isUser1 ? conv.user2 : conv.user1;

          return {
            ...conv,
            other_user_name:
              otherUser?.full_name ||
              `Usuario ${isUser1 ? conv.user2_id : conv.user1_id}`,
            other_user_id: isUser1 ? conv.user2_id : conv.user1_id,
            post_title: conv.posts?.title || "Conversación directa",
          };
        }) || [];

      setConversations(transformedConversations);
    } catch (error) {
      console.error("Error inesperado:", error);
      setConversations([]);
    }
  }, [userId]);

  // Función para cargar mensajes
  const loadMessages = useCallback(async (chatId) => {
    if (!chatId) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", chatId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
  }, []);

  const initializeDirectChat = useCallback(
    async (otherUserId, postId) => {
      // if (!postId) {
      //   throw new Error("Se requiere un post_id para iniciar una conversación");
      // }

      try {
        // 1. Primero buscamos si ya existe una conversación
        let conversation = conversations.find(
          (conv) =>
            (conv.user1_id === userId && conv.user2_id === otherUserId) ||
            (conv.user1_id === otherUserId && conv.user2_id === userId)
        );

        // 2. Si no existe, creamos una nueva con el post_id obligatorio
        if (!conversation) {
          const { data, error } = await supabase
            .from("conversations")
            .insert([
              {
                user1_id: userId,
                user2_id: otherUserId,
                post_id: postId, 
              },
            ])
            .select()
            .single();

          if (error) throw error;
          conversation = data;
        }

        await loadMessages(conversation.id);
        setActiveChat(conversation.id);
        setView("chat");
        setIsOpen(true);

        return conversation;
      } catch (error) {
        console.error("Error en initializeDirectChat:", error);
        throw error;
      }
    },
    [userId, conversations, loadMessages]
  );

  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !activeChat) return;

    try {
      const { error } = await supabase.from("messages").insert([
        {
          conversation_id: activeChat,
          sender_id: userId,
          content: newMessage,
        },
      ]);

      if (error) throw error;

      // Solo limpiamos el input, no actualizamos los mensajes aquí
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [newMessage, activeChat, userId]);

  // Efecto para cargar conversaciones iniciales y suscribirse a cambios
  useEffect(() => {
    if (!userId) return;

    // Carga inicial de conversaciones
    loadConversations();

    // Suscripción a cambios en conversaciones
    const channel = supabase
      .channel("conversations_changes")
      .on(
        "postgres_changes",
        {
          event: "*", // Escuchar todos los eventos (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "conversations",
          filter: `or(user1_id.eq.${userId},user2_id.eq.${userId})`,
        },
        async (payload) => {
          // Recargar todas las conversaciones cuando hay un cambio
          await loadConversations();
        }
      )
      .subscribe();

    // Suscripción a cambios en mensajes para actualizar el orden de las conversaciones
    const messagesChannel = supabase
      .channel("messages_for_conversations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          // Verificar si el mensaje pertenece a alguna de nuestras conversaciones
          const messageConversationId = payload.new.conversation_id;
          const isRelevant = conversations.some(
            (conv) => conv.id === messageConversationId
          );

          if (isRelevant) {
            // Recargar conversaciones para actualizar el orden
            await loadConversations();
          }
        }
      )
      .subscribe();

    return () => {
      // Limpiar suscripciones
      supabase.removeChannel(channel);
      supabase.removeChannel(messagesChannel);
    };
  }, [userId, loadConversations]);

  // Efecto adicional para cargar conversaciones cuando se abre el drawer
  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen, loadConversations]);

  // Efecto para cargar mensajes cuando cambia el chat activo
  useEffect(() => {
    if (activeChat) {
      loadMessages(activeChat);
    }
  }, [activeChat, loadMessages]);

  // Suscripción a nuevos mensajes
  useEffect(() => {
    if (!activeChat) return;

    const channel = supabase
      .channel(`messages:${activeChat}`)
      .on(
        "postgres_changes",
        {
          event: "*", 
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${activeChat}`,
        },
        (payload) => {
          // Verificamos que el mensaje sea para esta conversación
          if (payload.new && payload.new.conversation_id === activeChat) {
            setMessages((prev) => {
              // Verificamos si el mensaje ya existe para evitar duplicados
              const messageExists = prev.some(
                (msg) => msg.id === payload.new.id
              );
              if (messageExists) {
                return prev;
              }
              return [...prev, payload.new];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeChat]);

  useImperativeHandle(ref, () => ({
    initializeChat: initializeDirectChat,
    openDrawer: () => {
      loadConversations(); // Cargar conversaciones antes de abrir
      setIsOpen(true);
    },
  }));

  const handleClose = useCallback(() => {
    setView("conversations");
    setActiveChat(null);
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    setIsOpen,
    activeChat,
    setActiveChat,
    newMessage,
    setNewMessage,
    conversations,
    messages,
    handleSendMessage,
    view,
    setView,
    handleClose,
  };
};

export default useChat;
