import { supabase } from "../supabase/client";
import { useState } from "react";

const Login = ({ setShowLoginModal, handleOpenRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manejar el cambio de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    // Validación básica
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Autenticación en Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

      if (authError) throw new Error(authError.message);

      setSuccess("Inicio de sesión exitoso. ¡Bienvenido!");
      setFormData({
        email: "",
        password: "",
      });

      // Opcional: Redirigir a otra página
      // window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Ingresar
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={handleOpenRegister}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
          <button
            onClick={() => setShowLoginModal(false)}
            className="mt-4 text-gray-600 hover:text-gray-800 w-full text-center"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
