import { Sun, Moon, LayoutGrid, Clock, Heart, UserCircle } from "lucide-react";
import ProfileOptions from "./ProfileOptions";
import { useGlobalContext } from "../../context/GlobalContext";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, toggleTheme, isDark }) => {
  const { user, profile } = useGlobalContext();
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
          fixed
          inset-y-0 left-0
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          p-6
          transform transition-transform duration-200 ease-in-out
          z-30
          lg:block
          ${isSidebarOpen ? "block" : "hidden"}
          h-full
          overflow-y-auto
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
        </nav>

        {/* Profile options in mobile view */}
        <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 px-4 py-2 mb-4">
            <UserCircle className="h-8 w-8 text-gray-600 dark:text-gray-300" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {profile?.full_name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
          <ProfileOptions />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
