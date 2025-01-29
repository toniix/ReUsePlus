import { AlertCircle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, CONDITIONS } from "../../assets/postForm";
import { usePostForm } from "../../hooks/usePostForm";
import { ImageUpload } from "../../components/PostForm/ImageUpload";
import { TagInput } from "../../components/PostForm/TagInput";
import { useGlobalContext } from "../../context/GlobalContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostForm() {
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const {
    formData,
    currentTag,
    errors,
    isSubmitting,
    handleChange,
    handleImageUpload,
    removeImage,
    addTag,
    removeTag,
    setCurrentTag,
    submitForm
  } = usePostForm(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitForm();
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Publicar Donación
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.title
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Ej: Colección de libros infantiles"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Describe el artículo que quieres donar..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.description}
                </p>
              )}
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      errors.location
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Ciudad, Zona"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
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
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.pickupDetails
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Ej: Recoger en la dirección indicada"
                />
                {errors.pickupDetails && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
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
                {["Chat", "Email", "Both"].map((option) => (
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
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.availabilitySchedule
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                placeholder="Ej: Lunes a Viernes, 9am - 6pm"
              />
              {errors.availabilitySchedule && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
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
                    target: { name: "termsAccepted", value: e.target.checked },
                  })
                }
                className="mt-1 text-rose-600 focus:ring-rose-500 rounded"
              />
              <label
                htmlFor="termsAccepted"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Acepto los términos y condiciones de donación y confirmo que soy
                el propietario legítimo del artículo.
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.termsAccepted}
              </p>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 flex items-center gap-2 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Publicando...
                  </>
                ) : (
                  'Publicar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
