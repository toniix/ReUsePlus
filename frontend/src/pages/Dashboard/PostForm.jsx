import { AlertCircle, MapPin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { CATEGORIES, CONDITIONS } from "../../utils/postForm";
import { usePostForm } from "../../hooks/usePostForm";
import { ImageUpload } from "../../Components/PostForm/ImageUpload";
import { TagInput } from "../../Components/PostForm/TagInput";
import { useGlobalContext } from "../../context/GlobalContext";

export default function PostForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useGlobalContext();
  const postToEdit = location.state?.postToEdit;

  const {
    formData,
    currentTag,
    errors,
    isSubmitting,
    isEditing,
    handleChange,
    handleImageUpload,
    removeImage,
    addTag,
    removeTag,
    setCurrentTag,
    submitForm,
  } = usePostForm(user, postToEdit);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-10 sm:px-10">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                {isEditing ? "Editar Donación" : "Publicar Donación"}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
                Completa la información de tu donación para ayudar a quienes más
                lo necesitan
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Título de la Donación
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.title
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300`}
                    placeholder="Ej: Colección de libros infantiles"
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Descripción de la Donación
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.description
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300`}
                    placeholder="Describe el artículo que quieres donar..."
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Category and Condition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Categoría
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Estado
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  >
                    {CONDITIONS.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Images */}
              <ImageUpload
                images={formData.images}
                onUpload={handleImageUpload}
                onRemove={removeImage}
                error={errors.images}
              />

              {/* Tags */}
              <TagInput
                tags={formData.tags}
                currentTag={currentTag}
                onAddTag={addTag}
                onRemoveTag={removeTag}
                onTagChange={setCurrentTag}
                error={errors.tags}
              />

              {/* Location and Pickup Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Ubicación
                  </label>
                  <div className="relative">
                    <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 ${
                        errors.location
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300`}
                      placeholder="Ciudad, Zona"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pickupDetails"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Detalles de recojo
                  </label>
                  <input
                    type="text"
                    id="pickupDetails"
                    name="pickupDetails"
                    value={formData.pickupDetails}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${
                      errors.pickupDetails
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300`}
                    placeholder="Ej: Recoger en la dirección indicada"
                  />
                  {errors.pickupDetails && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      {errors.pickupDetails}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Preference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferencia de contacto
                </label>
                <div className="flex gap-4">
                  {["Chat", "Email", "Ambos"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="contactPreference"
                        value={option}
                        checked={formData.contactPreference === option}
                        onChange={handleChange}
                        className="text-rose-600 focus:ring-rose-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Schedule */}
              <div>
                <label
                  htmlFor="availabilitySchedule"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Horario de disponibilidad
                </label>
                <input
                  type="text"
                  id="availabilitySchedule"
                  name="availabilitySchedule"
                  value={formData.availabilitySchedule}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${
                    errors.availabilitySchedule
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300`}
                  placeholder="Ej: Lunes a Viernes, 9am - 6pm"
                />
                {errors.availabilitySchedule && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    {errors.availabilitySchedule}
                  </p>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "termsAccepted",
                        value: e.target.checked,
                      },
                    })
                  }
                  className="mt-1 text-rose-600 focus:ring-rose-500 rounded"
                />
                <label
                  htmlFor="termsAccepted"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Acepto los términos y condiciones de donación y confirmo que
                  soy el propietario legítimo del artículo.
                </label>
              </div>
              {errors.termsAccepted && (
                <p className="text-sm text-red-500 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  {errors.termsAccepted}
                </p>
              )}

              {/* Submit Button */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 
                  text-gray-700 dark:text-gray-300 rounded-xl 
                  hover:bg-gray-50 dark:hover:bg-gray-700 
                  transition-all duration-300 ease-in-out"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl 
                  shadow-md text-lg font-semibold text-white bg-gradient-to-r from-rose-500 to-red-600 
                  hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-rose-500 transition-all duration-300 ease-in-out
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Publicando..."
                    : isEditing
                    ? "Guardar Cambios"
                    : "Publicar Donación"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
