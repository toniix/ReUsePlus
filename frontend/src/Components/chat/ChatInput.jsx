import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({ value, onChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(e);
  };

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
    onChange(e);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(e);
      }
    }
  };

  return (
    <div className="p-4 bg-gray-800/50 border-t border-white/10">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje... "
            maxLength={500}
            rows={1}
            className="w-full bg-gray-700/50 text-white rounded-lg pl-4 pr-12 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
            style={{
              minHeight: "40px",
              maxHeight: "120px",
            }}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {value.length}/500
          </div>
        </div>
        <button
          type="submit"
          disabled={!value.trim()}
          className={`p-2 rounded-lg transition-all duration-200 ${
            value.trim()
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;