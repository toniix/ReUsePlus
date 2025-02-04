import { Heart, Sun, Moon, X, Menu, Bell } from "lucide-react";

const MobileHeader = ({
  isSidebarOpen,
  toggleSidebar,
  toggleTheme,
  isDark,
  setIsSidebarOpen,
}) => {
  return (
    <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Donaciones
      </h1>
      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default MobileHeader;
