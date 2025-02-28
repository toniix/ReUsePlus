import { Heart, Sun, Moon, X, Menu, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { NotificationsList } from "../../Components/notifications/NotificationsList";
import { supabase } from "../../supabase/client";
import { useGlobalContext } from "../../context/GlobalContext";
import  useNotifications  from "../../hooks/useNotifications";

const MobileHeader = ({
  isSidebarOpen,
  toggleSidebar,
  toggleTheme,
  isDark,
  setIsSidebarOpen,
}) => {
  const { user } = useGlobalContext();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Usar el hook de notificaciones
  const { notifications, unreadCount } = useNotifications(user?.id);

 
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
      <div className="relative">
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsNotificationsOpen(false)} />
            <div className="absolute right-0 mt-2 w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notificaciones
                </h3>
              </div>
              <NotificationsList 
                onNotificationRead={fetchUnreadNotifications}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
