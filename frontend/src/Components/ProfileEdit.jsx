import React, { useState } from "react";
import { X, Camera, MapPin, Phone, AlertCircle } from "lucide-react";
import { useGlobalContext } from "../context/GlobalContext";
import { errorToast } from "../utils/toastNotifications";
import { useProfileForm } from "../hooks/useProfileForm";
import { uploadAvatar } from "../services/avatarService";

export default function ProfileEdit({ onClose }) {
  const { user, profile: globalProfile, updateProfile } = useGlobalContext();
  const [avatarFile, setAvatarFile] = useState(null);
  const { profile, errors, handleChange, validateProfileForm, setAvatar } =
    useProfileForm(globalProfile, user);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Usar setAvatar para actualizar correctamente
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario antes de enviar
    const isValid = validateProfileForm();
    if (!isValid) {
      errorToast("Por favor, completa todos los campos correctamente");
      return;
    }

    try {
      let avatarUrl = profile.avatar;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile, user, globalProfile.avatar);
      }

      const updateResult = await updateProfile(user.id, {
        full_name: profile.fullName,
        address: profile.location,
        avatar_url: avatarUrl,
        phone: profile.phone,
      });

      if (updateResult) {
        onClose();
      } else {
        errorToast("No se pudo actualizar el perfil");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      errorToast("Ocurrió un error al actualizar el perfil");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Editar Perfil
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Upload */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src={profile.avatar || "/default-avatar.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <label className="absolute bottom-0 right-0 p-2 bg-rose-600 rounded-full cursor-pointer hover:bg-rose-700 transition-colors">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Foto de perfil
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  JPG o PNG. Máximo 5MB.
                </p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user?.email || ""}
                    readOnly
                    disabled
                    className="
                      mt-1 
                      block 
                      w-full 
                      rounded-md 
                      border 
                      border-gray-300 
                      dark:border-gray-600 
                      dark:bg-gray-800 
                      dark:text-gray-200 
                      focus:ring-blue-500 
                      focus:border-blue-500 
                      sm:text-sm 
                      py-2 
                      px-3
                      opacity-60
                      cursor-not-allowed
                    "
                  />
                  <div
                    className="
                      absolute 
                      inset-y-0 
                      right-0 
                      pr-3 
                      flex 
                      items-center 
                      pointer-events-none
                    "
                  >
                    <AlertCircle
                      className="h-5 w-5 text-gray-400 dark:text-gray-500"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Este campo no puede ser modificado
                </p>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      errors.phone
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.phone}
                  </p>
                )}
              </div>

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
                    value={profile.location}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      errors.location
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Guardar cambios
              </button>
            </div>

            {errors.general && (
              <div className="text-red-500 text-center mt-4">
                {errors.general}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
