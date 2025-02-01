import React, { useState, useEffect } from "react";
import { X, Camera, MapPin, Phone, Mail, AlertCircle } from "lucide-react";
import { supabase } from "../supabase/client";
import { useGlobalContext } from "../context/GlobalContext";

export default function ProfileEdit({ onClose }) {
  const { user, profile: globalProfile } = useGlobalContext();
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalProfile) {
      setProfile({
        fullName: globalProfile.full_name || "",
        email: globalProfile.email || "",
        phone: globalProfile.phone || "",
        location: globalProfile.address || "",
        bio: globalProfile.bio || "",
        avatar: globalProfile.avatar_url || "",
      });
    }
  }, [globalProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({
        ...prev,
        avatar: imageUrl,
      }));
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return profile.avatar;

    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile);

    if (uploadError) {
      console.error("Error uploading avatar:", uploadError);
      return null;
    }

    const {
      data: { publicUrl },
      error: urlError,
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    if (urlError) {
      console.error("Error getting avatar URL:", urlError);
      return null;
    }

    return publicUrl;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profile.fullName.trim()) newErrors.fullName = "El nombre es requerido";
    if (!profile.email.trim()) newErrors.email = "El email es requerido";
    if (!profile.phone.trim()) newErrors.phone = "El teléfono es requerido";
    if (!profile.location.trim())
      newErrors.location = "La ubicación es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const avatarUrl = await uploadAvatar();

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.fullName,
          phone: profile.phone,
          address: profile.location,
          bio: profile.bio,
          avatar_url: avatarUrl || profile.avatar,
        })
        .eq("id", user.id);

      if (error) throw error;

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({ general: "No se pudo actualizar el perfil" });
    } finally {
      setIsLoading(false);
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
                  JPG o PNG. Máximo 1MB.
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

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    } focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
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

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Biografía
              </label>
              <textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Notification Preferences
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Preferencias de notificación
              </h3>
              <div className="space-y-2">
                {Object.entries(profile.notificationPreferences).map(
                  ([key, value]) => (
                    <label key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => handleNotificationChange(key)}
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {key === "email"
                          ? "Notificaciones por email"
                          : key === "push"
                          ? "Notificaciones push"
                          : "Notificaciones de mensajes"}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div> */}

            {/* Privacy Settings
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                Configuración de privacidad
              </h3>
              <div className="space-y-2">
                {Object.entries(profile.privacySettings).map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handlePrivacyChange(key)}
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {key === "showEmail"
                        ? "Mostrar email en perfil público"
                        : key === "showPhone"
                        ? "Mostrar teléfono en perfil público"
                        : "Mostrar ubicación en perfil público"}
                    </span>
                  </label>
                ))}
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? "Guardando..." : "Guardar cambios"}
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
