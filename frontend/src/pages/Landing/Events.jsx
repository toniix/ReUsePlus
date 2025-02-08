import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "Gran Feria de Donaciones Navideñas",
    date: "24 de Diciembre, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Plaza Central",
    description:
      "Únete a nuestra feria navideña donde podrás donar juguetes, ropa y alimentos para familias necesitadas.",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500",
  },
  {
    id: 2,
    title: "Campaña de Útiles Escolares",
    date: "15 de Febrero, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Centro Comunitario Norte",
    description:
      "Ayuda a estudiantes a comenzar el año escolar con los materiales necesarios para su educación.",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500",
  },
  {
    id: 3,
    title: "Donación de Abrigos de Invierno",
    date: "1 de Junio, 2024",
    time: "11:00 AM - 5:00 PM",
    location: "Parque Municipal",
    description:
      "Recolección de abrigos y ropa de invierno para personas en situación de calle.",
    image:
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500",
  },
];

function Events({ handleOpenRegister }) {
  return (
    <section id="events" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4">
          Próximos Eventos
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Participa en nuestros eventos de donación y ayuda a crear un impacto
          positivo en tu comunidad.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Próximamente
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="w-5 h-5 text-blue-600 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaClock className="w-5 h-5 text-blue-600 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="w-5 h-5 text-blue-600 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button
                  onClick={handleOpenRegister}
                  className="mt-6 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  Participar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Events;
