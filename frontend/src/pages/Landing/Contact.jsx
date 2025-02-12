const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-[#E3F2FD]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#1565C0] mb-12">
          ¿Necesitas Ayuda?
        </h2>
        <div className="max-w-lg mx-auto">
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-4 py-2 border border-[#90CAF9] rounded-lg focus:outline-none focus:border-[#1976D2] bg-white"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border border-[#90CAF9] rounded-lg focus:outline-none focus:border-[#1976D2] bg-white"
              />
            </div>
            <div>
              <textarea
                placeholder="Mensaje"
                rows="4"
                className="w-full px-4 py-2 border border-[#90CAF9] rounded-lg focus:outline-none focus:border-[#1976D2] bg-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1976D2] text-white px-6 py-3 rounded-lg hover:bg-[#1565C0] transition duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
