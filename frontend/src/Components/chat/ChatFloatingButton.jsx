import { MessageCircle } from "lucide-react";

const ChatFloatingButton = ({ onClick }) => {
    return (
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-gentle">
        <button
          onClick={onClick}
          className="bg-blue-600 text-white rounded-full p-4 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  };
  
  export default ChatFloatingButton;