import { Settings, LogOut, Edit } from "lucide-react";
import { useGlobalContext } from "../../context/GlobalContext";

const ProfileOptions = ({ setIsEditProfileOpen }) => {
  const { logout } = useGlobalContext();

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsEditProfileOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <Edit className="h-4 w-4" />
        Editar perfil
      </button>
      <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
        <Settings className="h-4 w-4" />
        Configuración
      </button>
      <button
        onClick={logout}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
      >
        <LogOut className="h-4 w-4" />
        Cerrar sesión
      </button>
    </div>
  );
};

export default ProfileOptions;
