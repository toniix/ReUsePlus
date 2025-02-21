import { supabase } from "../supabase/client";
import { useState } from "react";
import { validateRegisterForm } from "../utils/validations";

const Register = ({
  setShowRegisterModal,
  handleOpenLogin,
  onSuccessfulRegistration,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    address: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phone: "",
    address: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar el mensaje de error del campo cuando el usuario empieza a escribir
    setFieldErrors({ ...fieldErrors, [name]: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFieldErrors({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phone: "",
      address: "",
    });
   

    // Usar la función de validación
    const validationErrors = validateRegisterForm(formData);

    // Si hay errores de validación
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      // Verificar si el correo ya está registrado
      const { data: existingUser, error: existingUserError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", formData.email)
        .single();

      if (existingUser) {
        setFieldErrors({
          ...fieldErrors,
          email: "Este correo ya está registrado.",
        });
        return;
      }

      // Registro en el sistema de autenticación
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw new Error(authError.message);

      // Almacena datos adicionales en 'profiles'
      const { error: profileError } = await supabase.from("profiles").insert({
        id: data.user.id,
        email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      });

      if (profileError) throw new Error(profileError.message);

      // Reset form data
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
        phone: "",
        address: "",
      });

      // Call the prop function to show confirmation modal
      onSuccessfulRegistration();
    } catch (error) {
      setFieldErrors({ ...fieldErrors, general: error.message });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden my-8">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Image and Welcome Text */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center text-white">
            <div className="mb-8">
              <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Community"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4 text-center">
              ¡Hagámoslo Juntos!
            </h2>
            <p className="text-white/80 text-center">
              Únete a nuestra comunidad y sé parte del cambio que queremos ver
              en el mundo.
            </p>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-1/2 bg-white p-8 overflow-y-auto max-h-[90vh]">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Crear una Cuenta en ReUse+
              </h3>
              <p className="text-gray-600">Completa tus datos para comenzar</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Nombre Completo"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {fieldErrors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Teléfono"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {fieldErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {fieldErrors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.address}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {fieldErrors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                {fieldErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition duration-300"
              >
                Crear Cuenta
              </button>
            </form>

            <div className="mt-6 text-center">
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
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
