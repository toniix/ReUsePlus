const Login = ({ setShowLoginModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div>
            <label className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Ingresar
          </button>
        </form>
        <button
          onClick={() => setShowLoginModal(false)}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Login;
