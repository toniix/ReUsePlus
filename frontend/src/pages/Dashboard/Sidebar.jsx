import {
  Sun,
  Moon,
  LayoutGrid,
  Clock,
  X,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Heart,
} from "lucide-react";
import ProfileOptions from "./ProfileOptions";
import { useGlobalContext } from "../../context/GlobalContext";
import Title from "./Title";
import { useState } from "react";
import Avatar from "./Avatar";
import { User, Users } from "lucide-react";

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  toggleTheme,
  isDark,
  setIsEditProfileOpen,
  isProfileMenuOpen,
  toggleProfileMenu,
  view,
  setView,
}) => {
  const { user, profile } = useGlobalContext();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

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
          w-72 
          bg-white/80 dark:bg-gray-900/80 
          backdrop-blur-lg 
          border-r border-gray-200/50 dark:border-gray-800/50
          transform transition-all duration-300 ease-in-out
          z-30
          lg:block
          ${isSidebarOpen ? "block" : "hidden"}
          h-full
          flex flex-col
          shadow-xl dark:shadow-gray-900/30
        `}
      >
        <div className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-gray-200/50 dark:border-gray-800/50">
          <Title />
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-amber-500" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-500" />
            )}
          </button>
        </div>
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Sidebar Header */}

          <div className="lg:hidden flex items-center justify-between mb-6 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <Title />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 group"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-200" />
              </button>
            </div>
          </div>

          {/* Posts View Buttons */}
          <div className="p-4 space-y-2">
            {/* Botón condicional para Todos/Mis posts */}
            {view === "all" ? (
              <button
                onClick={() => setView("mine")}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Users className="h-5 w-5 text-rose-500" />
                <span className="font-medium">Mis posts</span>
              </button>
            ) : (
              <button
                onClick={() => setView("all")}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <LayoutGrid className="h-5 w-5 text-indigo-500" />
                <span className="font-medium">Todos los posts</span>
              </button>
            )}

            {/* Botón Me Interesa */}
            <button
              onClick={() => setView("interested")}
              className={`
                w-full flex items-center gap-3 px-4 py-3 
                rounded-xl transition-all duration-200
                ${
                  view === "interested"
                    ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <Heart
                className={`h-5 w-5 ${
                  view === "interested" ? "text-rose-500" : ""
                }`}
              />
              <span className="font-medium">Me Interesa</span>
            </button>

            {/* Botón Reservas */}
            <button
              onClick={() => setView("reserved")}
              className={`
                w-full flex items-center gap-3 px-4 py-3 
                rounded-xl transition-all duration-200
                ${
                  view === "reserved"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <Clock
                className={`h-5 w-5 ${
                  view === "reserved" ? "text-blue-500" : ""
                }`}
              />
              <span className="font-medium">Reservas</span>
            </button>
          </div>

          {/* Filter Sections */}
          <div className="px-4 space-y-8 mt-6">
            {/* Categories */}

            <div
              className="flex items-center justify-between text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              <h3 className="uppercase tracking-wider">Categorías</h3>
              {isCategoriesOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </div>
            {isCategoriesOpen && (
              <div className="mt-2 space-y-1 px-2">
                {[
                  "Todos",
                  "Libros",
                  "Ropa",
                  "Electrónicos",
                  "Muebles",
                  "Juguetes",
                ].map((category) => (
                  <button
                    key={category}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Sort Options */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider">
                Ordenar por
              </h3>
              <div className="space-y-2">
                <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Más recientes
                </button>
                <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <LayoutGrid className="h-5 w-5 text-green-500" />
                  Más populares
                </button>
              </div>
            </div>

            {/* Mobile Only - Theme & Settings */}
            <div className="lg:hidden space-y-2">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 uppercase tracking-wider">
                Apariencia
              </h3>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-500" />
                )}
                {isDark ? "Modo claro" : "Modo oscuro"}
              </button>
            </div>
          </div>
        </div>

        {/* Fixed Profile Section (Mobile Only) */}
        <div className="lg:hidden relative">
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <button
              className="flex items-center gap-3 w-full cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200"
              onClick={toggleProfileMenu}
            >
              <Avatar profile={profile} />

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {profile?.full_name}
                </p>
              </div>
              <div>
                <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </button>
          </div>

          {isProfileMenuOpen && (
            <div className="absolute bottom-full right-0 mb-4 w-full px-6 z-50">
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 py-4 
                              transform transition-all duration-300 ease-in-out 
                              scale-100 origin-bottom-right 
                              ring-4 ring-gray-100 dark:ring-gray-700"
              >
                <div className="px-4">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <ProfileOptions setIsEditProfileOpen={setIsEditProfileOpen} />
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
