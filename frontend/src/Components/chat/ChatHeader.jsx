import { ArrowLeft, X, MessageSquare, UserCircle2 } from "lucide-react";

const ChatHeader = ({ view, handleBack, handleClose, activeConversation }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-900/80 to-slate-900/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-white/10 shadow-lg">
      <div className="flex items-center space-x-3">
        {view === "chat" && (
          <button
            onClick={handleBack}
              className="text-indigo-200 hover:text-white transition-colors p-2 rounded-full hover:bg-indigo-500/20 hover:scale-105 transform duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-white text-lg font-semibold tracking-wide">
            {view === "conversations" ? (
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-indigo-300" />
                <span>Conversaciones</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <UserCircle2 className="w-5 h-5 text-indigo-300" />
                <span>{`Chat con ${activeConversation?.other_user_name}`}</span>
              </div>
            )}
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="text-indigo-200 hover:text-white transition-colors p-2 rounded-full hover:bg-indigo-500/20 hover:scale-105 transform duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  };

  export default ChatHeader;