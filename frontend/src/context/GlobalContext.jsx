import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { successToast, errorToast } from "../utils/toastNotifications";

export const GlobalContext = createContext(undefined);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Función para actualizar el perfil (ya existente)
  const updateProfile = async (userId, userData) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: userData.full_name,
          address: userData.address,
          avatar_url: userData.avatar_url,
          phone: userData.phone,
        })
        .eq("id", userId);

      if (error) {
        errorToast("Error al actualizar el perfil");
        return null;
      }

      // Actualizar inmediatamente el estado local del perfil
      setProfile((prevProfile) => ({
        ...prevProfile,
        full_name: userData.full_name || prevProfile.full_name,
        address: userData.address || prevProfile.address,
        avatar: userData.avatar_url || prevProfile.avatar,
        phone: userData.phone || prevProfile.phone,
      }));

      successToast("Perfil actualizado exitosamente");
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      errorToast("Error al actualizar el perfil");
      return null;
    }
  };

  // Nueva función de logout
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        errorToast("Error al cerrar sesión");
        return false;
      }

      setUser(null);
      setProfile(null);
      navigate("/");
      successToast("Sesión cerrada exitosamente");
    } catch (error) {
      errorToast("Error al cerrar sesión");
    }
  };

  // Nueva función de registro
  const register = async (email, password, profileData) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        errorToast(authError.message);
        return { success: false, error: authError.message };
      }

      const userId = authData.user.id;

      // Insertar datos de perfil
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        full_name: profileData.fullName,
        phone: profileData.phone,
        address: profileData.address,
        is_donor: profileData.isDonor || false,
      });

      if (profileError) {
        errorToast(profileError.message);
        return { success: false, error: profileError.message };
      }

      successToast("Registro exitoso");
      return { success: true, user: authData.user };
    } catch (error) {
      errorToast("Ocurrió un error inesperado");
      return { success: false, error: error.message };
    }
  };

  // Nueva función de login más completa
  const login = async (email, password) => {
    // Validación inicial de campos
    if (!email || !password) {
      errorToast("Por favor, completa todos los campos");
      return { success: false, error: "Campos incompletos" };
    }

    try {
      // Intento de inicio de sesión
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) {
        // Manejo de errores específicos de Supabase
        switch (authError.message) {
          case "Invalid login credentials":
            errorToast("Credenciales incorrectas");
            break;
          case "Email not confirmed":
            errorToast("Por favor, confirma tu correo electrónico");
            break;
          default:
            errorToast("Error al iniciar sesión");
        }
        return { success: false, error: authError.message };
      }

      // Inicio de sesión exitoso
      successToast("Inicio de sesión exitoso");
      navigate("/dashboard");
      return { success: true, user: data.user };
    } catch (error) {
      errorToast("Ocurrió un error inesperado");
      return { success: false, error: error.message };
    }
  };

  //
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const currentUser = sessionData?.session?.user || null;

        if (!currentUser) {
          navigate("/");
          setLoading(false);
          return;
        }

        setUser(currentUser);

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("is_donor, full_name, avatar_url, phone, address")
          .eq("id", currentUser.id)
          .single();

        if (profileError) throw profileError;

        setProfile({
          isDonor: profile?.is_donor || null,
          full_name: profile?.full_name || null,
          avatar: profile?.avatar_url || "",
          phone: profile?.phone || null,
          address: profile?.address || null,
        });

        setLoading(false);
      } catch (error) {
        errorToast("Error al verificar la sesión");
        setLoading(false);
        navigate("/");
      }
    };

    checkUserSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
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
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const value = {
    user,
    loading,
    profile,
    updateProfile,
    logout, // Nueva función
    register, // Nueva función
    login, // Nueva función
    setProfile,
  };

  return (
    <GlobalContext.Provider value={value}>
      {!loading && children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
