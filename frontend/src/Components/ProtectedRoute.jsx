import { Navigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useGlobalContext();
  const location = useLocation();

  const publicRoutes = ["/", "/nosotros"];

  if (loading) {
    console.log("Cargando...");
    return <div>Cargando...</div>;
  }

  // Si la ruta es pública, permitir acceso sin importar si hay usuario
  if (publicRoutes.includes(location.pathname)) {
    console.log("Es una ruta pública, permitiendo acceso");
    return children;
  }

  // Si no es ruta pública y no hay usuario, redirigir al landing
  if (!user) {
    console.log("No hay usuario autenticado, redirigiendo");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
