import  { forwardRef } from "react";
import useChat from "../../hooks/useChat";
import { useGlobalContext } from "../../context/GlobalContext";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatConversationsList from "./ChatConversationsList";
import ChatInput from "./ChatInput";

export const ChatDrawer = forwardRef((props, ref) => {
  const { showFloatingButton = true } = props;
  const { user } = useGlobalContext();

  const {
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
  } = useChat(ref, user?.id);

  // Obtener la conversación activa
  const activeConversation = conversations.find((c) => c.id === activeChat);

  const handleBack = () => {
    setView("conversations");
    setActiveChat(null);
  };

  const handleSelectChat = (conversationId) => {
    setActiveChat(conversationId);
    setView("chat");
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await handleSendMessage();
  };

  const isMobile = window.innerWidth < 640;

  return (
    <div className="chat-drawer-container" style={{ display: "contents" }}>
      {/* Botón flotante con animación suave - Solo mostrar si no hay ningún chat abierto */}
      {!isOpen && showFloatingButton && (
        <ChatFloatingButton onClick={() => setIsOpen(true)} />
      )}

      {/* Panel de chat y overlay con blur */}
      <div
        className={`fixed inset-0 backdrop-blur-sm bg-black/50 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed z-50 transform transition-all duration-300 ease-in-out shadow-2xl ${
          isMobile
            ? "bottom-0 left-0 right-0 h-[90vh] rounded-t-2xl"
            : "top-0 right-0 w-96 h-full"
        } ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{
          background: `
            linear-gradient(135deg, rgba(49, 46, 129, 0.95), rgba(15, 23, 42, 0.98)),
            repeating-linear-gradient(45deg, rgba(99, 102, 241, 0.05) 0px, rgba(99, 102, 241, 0.05) 2px, transparent 2px, transparent 6px),
            linear-gradient(180deg, rgb(49, 46, 129), rgb(15, 23, 42))
          `,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header con diseño moderno */}
          <ChatHeader
            view={view}
            handleBack={handleBack}
            handleClose={handleClose}
            activeConversation={activeConversation}
          />

          {/* Content con diseño mejorado */}
          <div className="flex-1 overflow-hidden">
            {view === "conversations" ? (
              <ChatConversationsList
                conversations={conversations}
                onSelectChat={handleSelectChat}
              />
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 ">
                <ChatMessageList messages={messages} userId={user?.id} />
                </div>
                <ChatInput
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onSubmit={handleSend}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ChatDrawer.displayName = "ChatDrawer";
