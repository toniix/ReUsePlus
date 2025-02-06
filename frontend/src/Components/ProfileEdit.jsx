import React, { useState, useEffect } from "react";
import { X, Camera, MapPin, Phone, Mail, AlertCircle } from "lucide-react";
import { supabase } from "../supabase/client";
import { useGlobalContext } from "../context/GlobalContext";
import { successToast, errorToast } from "../utils/toastNotifications";
import { validateForm } from "../utils/validationEditForm";

export default function ProfileEdit({ onClose }) {
  const {
    user,
    profile: globalProfile,
    setProfile: setGlobalProfile,
  } = useGlobalContext();

  const [profile, setProfile] = useState({
    fullName: "",
    email: user?.email || "", // Use email from user context
    phone: "",
    location: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (globalProfile) {
      setProfile({
        fullName: globalProfile.full_name || "",
        email: user?.email || "", // Ensure email is set from user context
        phone: globalProfile.phone || "",
        location: globalProfile.address || "",
        avatar: globalProfile.avatar || "",
      });
    }
  }, [globalProfile, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent changing email
    if (name !== "email") {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
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

  //SUBIR UN AVATAR
  const uploadAvatar = async (avatarFile, user, profile) => {
    if (!avatarFile) return profile.avatar;

    // Validación del archivo
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(avatarFile.type)) {
      throw new Error(
        "Tipo de archivo no permitido. Solo se permiten imágenes JPG, PNG o GIF."
      );
    }

    if (avatarFile.size > maxSize) {
      throw new Error(
        "El archivo es demasiado grande. El tamaño máximo permitido es 5MB."
      );
    }

    try {
      // Eliminar el avatar antiguo (si existe)
      if (profile.avatar && profile.avatar.includes("/avatars/")) {
        const oldAvatarPath = profile.avatar.split("/avatars/").pop();
        const { error: deleteError } = await supabase.storage
          .from("avatars")
          .remove([oldAvatarPath]);

        if (deleteError) {
          console.error("Error deleting old avatar:", deleteError);
          // Don't throw, as this might not be a critical failure
        }
      }
      // Subir el nuevo avatar
      const fileExt = avatarFile.name.split(".").pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Log file details for debugging
      console.log("Uploading file:", {
        name: avatarFile.name,
        type: avatarFile.type,
        size: avatarFile.size,
        path: filePath,
      });

      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile);

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        throw new Error(`No se pudo subir el avatar: ${uploadError.message}`);
      }

      // Obtener la URL pública
      const {
        data: { publicUrl },
        error: urlError,
      } = await supabase.storage.from("avatars").getPublicUrl(filePath);

      if (urlError) {
        console.error("Error getting public URL:", urlError);
        throw new Error("No se pudo obtener la URL del avatar.");
      }

      return publicUrl;
    } catch (error) {
      console.error("Detailed avatar upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm(profile, setErrors)) {
      return;
    }

    try {
      // Subir imagen de perfil si hay una nueva
      let avatarUrl = profile.avatar;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile, user, profile);
      }

      // Actualizar perfil en Supabase
      const { data, error } = await supabase
        .from("profiles")
        .update({
          full_name: profile.fullName,
          address: profile.location,
          avatar_url: avatarUrl,
          phone: profile.phone,
        })
        .eq("id", user.id)
        .select();

      if (error) throw error;

      // Actualizar contexto global
      setGlobalProfile((prev) => ({
        ...prev,
        full_name: profile.fullName,
        phone: profile.phone,
        address: profile.location,
        avatar: avatarUrl,
      }));

      successToast("Perfil actualizado exitosamente");
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      errorToast("No se pudo actualizar el perfil");
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
                  className="block text-sm font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm cursor-not-allowed"
                />
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
