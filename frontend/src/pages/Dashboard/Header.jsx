import { Search, Filter, ChevronDown, Bell, Gift } from "lucide-react";
import ProfileOptions from "./ProfileOptions";
import { supabase } from "../../supabase/client";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../Components/Avatar";
import { NotificationsList } from "../../Components/notifications/NotificationsList";
import useNotifications from "../../hooks/useNotifications";

const Header = ({
  toggleProfileMenu,
  isProfileMenuOpen,
  closeProfileMenu,
  setIsEditProfileOpen,
}) => {
  const { user, profile } = useGlobalContext(); // Asegúrate de que setUser esté disponible en tu contexto
  const [isDonor, setIsDonor] = useState(false); // Estado para almacenar si el usuario es donante
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial
  const [searchTerm, setSearchTerm] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Usar el hook de notificaciones
  const { notifications, unreadCount } = useNotifications(user?.id);

  // Obtener el valor de is_donor desde la tabla profiles
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("is_donor")
            .eq("id", user.id)
            .single(); // Obtener un solo registro

          if (error) throw error;

          // Actualizar el estado local con el valor de is_donor
          setIsDonor(data.is_donor);
          setLoading(false);
        } catch (err) {
          console.error("Error al obtener el perfil:", err.message);
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  // Función para convertir al usuario en donante
  const becomeDonor = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_donor: true }) // Cambiar is_donor a true
        .eq("id", user.id); // Filtrar por el ID del usuario

      if (error) throw error;

      // Actualizar el estado local
      setIsDonor(true);
      alert("¡Ahora eres donador!");
    } catch (err) {
      console.error("Error al cambiar el rol:", err.message);
    }
  };

  if (loading) {
    return <h1>Cargando usuario...</h1>;
  }

  return (
    <div
      className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 
                  lg:px-8 lg:py-4 lg:bg-gradient-to-b lg:from-blue-50 lg:to-white 
                  dark:lg:from-gray-800 dark:lg:to-gray-900 
                  lg:border-b lg:border-gray-200 dark:lg:border-gray-700 lg:shadow-md"
    >
      <div className="flex items-center space-x-2 w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 transition-all duration-300">
        <div className="pl-3 text-gray-400 dark:text-gray-500">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder="Buscar donaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow py-2 pr-4 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
        />
        <button className="flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <Filter className="h-5 w-5" />
          <span className="hidden sm:inline">Filtrar</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        {isDonor && (
          <Link to="/dashboard/post/new">
            <button
              className="flex items-center gap-4 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white 
                       font-semibold rounded-xl shadow-md hover:shadow-lg 
                       transform hover:-translate-y-0.5 transition-all duration-300 
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 
                       active:scale-95 group"
            >
              <Gift className="h-6 w-6 transition-transform group-hover:rotate-6" />
              <span className="tracking-wide">Publicar donación</span>
            </button>
          </Link>
        )}

        {!isDonor && (
          <button
            onClick={becomeDonor}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg"
          >
            <Gift className="h-5 w-5" />
            <span>Quiero donar</span>
          </button>
        )}

        {/* Notifications Button and Dropdown */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsNotificationsOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-96 max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notificaciones
                  </h3>
                </div>
                <NotificationsList
                  onNotificationRead={() => {}}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>
            </>
          )}
        </div>

        {/* Desktop Profile Menu */}
        <div className="relative hidden lg:block">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
          >
            {profile && (
              <div className="flex items-center space-x-4">
                <div onClick={toggleProfileMenu} className="cursor-pointer">
                  <Avatar profile={profile} />
                </div>
              </div>
            )}
            <ChevronDown className="h-4 w-4" />
          </button>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={closeProfileMenu} />
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 py-2">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {profile?.full_name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
                <div className="py-2">
                  <ProfileOptions setIsEditProfileOpen={setIsEditProfileOpen} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
