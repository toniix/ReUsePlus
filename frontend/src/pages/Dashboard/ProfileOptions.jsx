import { User, Settings, LogOut } from "lucide-react";
import { supabase } from "../../supabase/client";

const ProfileOptions = () => (
  <div className="space-y-1">
    <a
      href="#"
      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
    >
      <User className="h-5 w-5" />
      <span>Editar Perfil</span>
    </a>
    <a
      href="#"
      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
    >
      <Settings className="h-5 w-5" />
      <span>Configuración</span>
    </a>

    <button
      onClick={() => supabase.auth.signOut()}
      className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg"
    >
      <LogOut className="h-5 w-5" />
      logOut
    </button>
  </div>
);
export default ProfileOptions;
