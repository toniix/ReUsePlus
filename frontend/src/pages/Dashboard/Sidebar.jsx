import {
  Sun,
  Moon,
  LayoutGrid,
  Clock,
  Settings,
  Heart,
  LogOut,
} from "lucide-react";
import { supabase } from "../../supabase/client";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, toggleTheme, isDark }) => {
  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          fixed lg:static
          inset-y-0 left-0
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          p-6
          transform transition-transform duration-200 ease-in-out
          z-30
          lg:block
          ${isSidebarOpen ? "block" : "hidden"}
          h-full
        `}
      >
        <div className="hidden lg:flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-600" />
            <span className="font-semibold text-xl dark:text-white">
              DonateHub
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg dark:text-gray-300"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav className="space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-4 py-2 rounded-lg"
          >
            <LayoutGrid className="h-5 w-5" />
            <span>All Donations</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <Clock className="h-5 w-5" />
            <span>Recent</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="mt-auto pt-8">
          {/* <Link to="/">
            <a
              href="#"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </a>
          </Link> */}
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <LogOut className="h-5 w-5" />
            logOut
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
