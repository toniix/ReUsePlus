import { User, Settings, LogOut, Edit } from "lucide-react";
import { supabase } from "../../supabase/client";

const ProfileOptions = ({ setIsEditProfileOpen }) => (
  <div className="space-y-1">
    <button
      onClick={() => setIsEditProfileOpen(true)}
      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
    >
      <Edit className="h-4 w-4" />
      Editar perfil
    </button>

    {/* <button
      onClick={toggleTheme}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Modo claro" : "Modo oscuro"}
    </button> */}

    <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
      <Settings className="h-4 w-4" />
      Configuración
    </button>
    <button
      onClick={() => supabase.auth.signOut()}
      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <LogOut className="h-4 w-4" />
      Cerrar sesión
    </button>
  </div>
);
export default ProfileOptions;
