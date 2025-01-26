import {
  Search,
  Filter,
  ChevronDown,
  Plus,
  Bell,
  UserCircle,
  ListFilter,
  Gift,
} from "lucide-react";
import ProfileOptions from "./ProfileOptions";
import { supabase } from "../../supabase/client";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostForm from "./PostForm";

const Header = ({ toggleProfileMenu, isProfileMenuOpen, closeProfileMenu }) => {
  const { user, profile } = useGlobalContext(); // Asegúrate de que setUser esté disponible en tu contexto
  const [isDonor, setIsDonor] = useState(false); // Estado para almacenar si el usuario es donante
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

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
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
      <div className="relative w-full lg:w-96">
        <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search donations..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
          <Filter className="h-5 w-5" />
          <span className="hidden sm:inline">Filter</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
          <ListFilter className="h-5 w-5" />
          <span>Listar publicaciones</span>
        </button>

        {isDonor && (
          <Link to="/dashboard/post/new">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
              <Gift className="h-5 w-5" />
              <span>Crear publicacion</span>
            </button>
          </Link>
        )}

        {!isDonor && (
          <button
            onClick={becomeDonor}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <Gift className="h-5 w-5" />
            <span>Quiero donar</span>
          </button>
        )}

        <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hidden lg:block">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
        </button>

        {/* Desktop Profile Menu */}
        <div className="relative hidden lg:block">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300"
          >
            <UserCircle className="h-6 w-6" />
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
                  <ProfileOptions />
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
