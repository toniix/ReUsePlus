import React, { useState } from "react";
import { X, AlertCircle, Camera, MapPin, Tag, Upload } from "lucide-react";
import { supabase } from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, CONDITIONS } from "../../assets/postForm";

export default function PostForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    condition: "Good",
    location: "",
    pickupDetails: "",
    images: [],
    tags: [],
    contactPreference: "Both",
    availabilitySchedule: "",
    termsAccepted: false,
  });

  const [currentTag, setCurrentTag] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5),
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addTag = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (formData.tags.length < 5) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, currentTag.trim()],
        }));
        setCurrentTag("");
      }
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (!formData.pickupDetails.trim())
      newErrors.pickupDetails = "Pickup details are required";

    if (!formData.availabilitySchedule.trim())
      newErrors.availabilitySchedule = "Availability schedule is required";

    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";

    if (formData.images.length === 0)
      newErrors.images = "At least one image is required";

    if (!CATEGORIES.includes(formData.category)) {
      newErrors.category = "Invalid category";
    }

    if (!CONDITIONS.includes(formData.condition)) {
      newErrors.condition = "Invalid condition";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar el formulario (puedes usar tu función validateForm aquí)
    if (validateForm()) {
      try {
        // 1. Insertar el post en la tabla `posts`
        const { data: post, error: postError } = await supabase
          .from("posts")
          .insert([
            {
              title: formData.title,
              description: formData.description,
              category: formData.category, // ENUM
              condition: formData.condition, // ENUM
              location: formData.location,
              pickup_details: formData.pickupDetails,
              contact_preference: formData.contactPreference,
              availability_schedule: formData.availabilitySchedule,
              terms_accepted: formData.termsAccepted,
            },
          ])
          .select()
          .single(); // Retorna el post insertado

        if (postError) {
          throw new Error("Error al insertar el post: " + postError.message);
        }

        const postId = post.id; // ID del post recién insertado

        // 2. Insertar las imágenes en la tabla `post_images`
        if (formData.images.length > 0) {
          const imageRecords = formData.images.map((imageUrl) => ({
            post_id: postId,
            image_url: imageUrl,
          }));

          const { error: imagesError } = await supabase
            .from("post_images")
            .insert(imageRecords);

          if (imagesError) {
            throw new Error(
              "Error al insertar las imágenes: " + imagesError.message
            );
          }
        }

        // 3. Insertar los tags en la tabla `tags` y relacionarlos con el post en `post_tags`
        if (formData.tags.length > 0) {
          // Insertar tags y manejar conflictos
          for (const tagName of formData.tags) {
            // Primero intentamos insertar el tag
            const { data: existingTag, error: selectError } = await supabase
              .from('tags')
              .select()
              .eq('name', tagName)
              .single();

            let tagId;
            
            if (!existingTag) {
              // Si el tag no existe, lo insertamos
              const { data: newTag, error: insertError } = await supabase
                .from('tags')
                .insert([{ name: tagName }])
                .select()
                .single();

              if (insertError) {
                throw new Error("Error al insertar el tag: " + insertError.message);
              }
              
              tagId = newTag.id;
            } else {
              tagId = existingTag.id;
            }

            // Relacionar el tag con el post
            const { error: postTagError } = await supabase
              .from('post_tags')
              .insert([{
                post_id: postId,
                tag_id: tagId
              }]);

            if (postTagError) {
              throw new Error("Error al relacionar tag con el post: " + postTagError.message);
            }
          }
        }

        console.log("Post y datos relacionados insertados correctamente!");
        // Redirigir al usuario o mostrar un mensaje de éxito
        navigate("/dashboard");
      } catch (error) {
        console.error("Error en handleSubmit:", error.message);
        // Mostrar un mensaje de error al usuario
      }
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
            {/* Title */}
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

            {/* Description */}
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

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Imágenes (máximo 5)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
                {formData.images.length < 5 && (
                  <label className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-rose-500 dark:hover:border-rose-400">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      multiple
                    />
                    <Camera className="h-8 w-8 text-gray-400" />
                  </label>
                )}
              </div>
              {errors.images && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.images}
                </p>
              )}
            </div>

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

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Etiquetas (máximo 5)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 rounded-full text-sm"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(index)}>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
              {formData.tags.length < 5 && (
                <div className="relative">
                  <Tag className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={addTag}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Presiona Enter para agregar una etiqueta"
                  />
                </div>
              )}
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
                  setFormData((prev) => ({
                    ...prev,
                    termsAccepted: e.target.checked,
                  }))
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
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Publicar Donación
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
