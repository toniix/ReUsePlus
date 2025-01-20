import { Heart, Sun, Moon, X, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

const MobileHeader = ({
  isSidebarOpen,
  toggleSidebar,
  toggleTheme,
  isDark,
}) => {
  // const { isDark, toggleTheme } = useTheme();

  return (
    <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6 text-rose-600" />
        <span className="font-semibold text-xl dark:text-white">DonateHub</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-gray-300"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-gray-300"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
