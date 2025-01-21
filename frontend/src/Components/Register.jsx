import { supabase } from "../supabase/client";
import { useState } from "react";

const Register = ({ setShowRegisterModal, handleOpenLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manejar el cambio de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Registro de usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password, confirmPassword, fullName, phone, address } =
      formData;

    // Validación básica
    if (!email || !password || !fullName || !phone || !address) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Registro en el sistema de autenticación
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw new Error(authError.message);

      // Almacena datos adicionales en 'profiles'
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        phone,
        address,
      });

      if (profileError) throw new Error(profileError.message);

      setSuccess(
        "Registro exitoso. ¡Revisa tu correo para confirmar tu cuenta!"
      );
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Registro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-gray-700 mb-2">Nombre Completo</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
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
            <label className="block text-gray-700 mb-2">Telefono</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Direccion</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div>
            <label className="block text-gray-700 mb-2">Tipo de Usuario</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
              <option value="">Selecciona un tipo</option>
              <option value="donante">Donante</option>
              <option value="receptor">Receptor</option>
              <option value="voluntario">Voluntario</option>
            </select>
          </div> */}
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
          <div>
            <label className="block text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={handleOpenLogin}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
        <button
          onClick={() => setShowRegisterModal(false)}
          className="mt-4 text-gray-600 hover:text-gray-800 w-full text-center"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Register;
