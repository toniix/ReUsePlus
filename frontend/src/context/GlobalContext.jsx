import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { useEffect, useState, useContext, createContext } from "react";

export const GlobalContext = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar sesión actual al cargar la aplicación
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);

      if (!data?.session?.user) {
        navigate("/"); // Redirigir a la página de login si no hay sesión
      }
    };

    checkUserSession();

    // Escuchar cambios en el estado de autenticación
    const { subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (!session?.user) {
          navigate("/");
        } else {
          navigate("/dashboard"); // Redirigir al dashboard si está autenticado
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  return (
    <GlobalContext.Provider value={{ user, loading }}>
      {!loading && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
