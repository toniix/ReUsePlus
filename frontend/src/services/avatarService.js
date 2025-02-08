import { supabase } from "../supabase/client";

export const uploadAvatar = async (avatarFile, user, currentAvatar) => {
  try {
    // Eliminar avatar antiguo si existe
    if (currentAvatar && currentAvatar.includes("/avatars/")) {
      const oldAvatarPath = currentAvatar.split("/avatars/").pop();
      await supabase.storage.from("avatars").remove([oldAvatarPath]);
    }

    // Subir nuevo avatar
    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile);

    if (uploadError) {
      throw new Error(`No se pudo subir el avatar: ${uploadError.message}`);
    }

    const {
      data: { publicUrl },
      error: urlError,
    } = await supabase.storage.from("avatars").getPublicUrl(filePath);

    if (urlError) {
      throw new Error("No se pudo obtener la URL del avatar.");
    }

    return publicUrl;
  } catch (error) {
    console.error("Detailed avatar upload error:", error);
    throw error;
  }
};
