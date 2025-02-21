import { MessageSquare, UserCircle2, FileText } from "lucide-react";

const ChatConversationsList = ({ conversations, onSelectChat }) => {
    if (!conversations.length) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
          <MessageSquare className="w-12 h-12 mb-3 opacity-50" />
          <p className="text-center">
            No tienes conversaciones activas
          </p>
        </div>
      );
    }
  
    return (
        <div className="h-full overflow-y-auto p-4 space-y-4">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectChat(conversation.id)}
            className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl cursor-pointer 
              hover:bg-slate-700/50 transition-all duration-200 transform hover:scale-[1.02]
              border border-blue-500/10 shadow-lg hover:shadow-blue-500/5"
          >
            <div className="flex items-center space-x-4">
              {/* Avatar del usuario */}
              <div
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full p-2.5
                ring-2 ring-blue-500/20"
              >
                <UserCircle2 className="w-6 h-6 text-blue-100" />
              </div>

              {/* Información de la conversación */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium truncate">
                    {conversation.other_user_name}
                  </p>
                  {/* Fecha de último mensaje (si lo implementas después) */}
                  <span className="text-xs text-gray-400">
                    {new Date(
                      conversation.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Título del post con icono */}
                <div className="flex items-center mt-1 text-sm text-gray-400">
                  <FileText className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                  <p className="truncate">{conversation.post_title}</p>
                </div>
              </div>
            </div>

            {/* Indicador de mensajes no leídos (para implementar después) */}
            {conversation.unread && (
              <div className="absolute top-4 right-4">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatConversationsList;