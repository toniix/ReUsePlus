import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useEffect, useState, useContext, createContext } from "react";

export const GlobalContext = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Verificar sesión actual al cargar la aplicación
    const checkUserSession = async () => {
      try {
        // Obtener la sesión actual del usuario
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        const currentUser = sessionData?.session?.user || null;

        // Si no hay usuario, redirigir a la página de login
        if (!currentUser) {
          navigate("/"); // Redirigir a la página de login si no hay sesión
          setLoading(false);
          return;
        }

        // Guardar el usuario en el estado global
        setUser(currentUser);

        // Obtener el perfil del usuario desde la tabla "profiles"
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_donor, full_name, avatar_url, phone, address")
          .eq("id", currentUser.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        // Guardar el perfil en el estado global o en un estado local
        setProfile({
          isDonor: profile?.is_donor || null,
          full_name: profile?.full_name || null,
          avatar: profile?.avatar_url || "",
          phone: profile?.phone || null,
          address: profile?.address || null,
        });

        setLoading(false);
      } catch (error) {
        console.error(
          "Error al verificar la sesión del usuario:",
          error.message
        );
        setLoading(false);
        navigate("/"); // Redirigir a la página de login en caso de error
      }
    };

    checkUserSession();

    // console.log(profile);

    // Escuchar cambios en el estado de autenticación
    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (!session?.user) {
          navigate("/");
        } else if (window.location.pathname === "/") {
          navigate("/dashboard");
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <GlobalContext.Provider value={{ user, loading, profile, setProfile }}>
      {!loading && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
