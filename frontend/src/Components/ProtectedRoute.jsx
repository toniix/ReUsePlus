import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useGlobalContext();

  if (loading) {
    return <div>Cargando...</div>; // O un spinner
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
