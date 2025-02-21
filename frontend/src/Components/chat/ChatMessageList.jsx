
import { MessageSquare } from "lucide-react";

const ChatMessageList = ({ messages, userId }) => {
    if (!messages.length) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
          <MessageSquare className="w-12 h-12 mb-2" />
          <p>No hay mensajes aún</p>
        </div>
      );
    }
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] break-words rounded-lg px-4 py-2 ${
                message.sender_id === userId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700/50 text-gray-100"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatMessageList;