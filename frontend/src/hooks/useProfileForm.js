import { useState, useEffect, useCallback } from "react";
import { validateForm } from "../utils/validationEditForm";

export const useProfileForm = (globalProfile, user) => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    location: "",
    avatar: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (globalProfile) {
      setProfile({
        fullName: globalProfile.full_name || "",
        email: user?.email || "",
        phone: globalProfile.phone || "",
        location: globalProfile.address || "",
        avatar: globalProfile.avatar || "",
      });
    }
  }, [globalProfile, user]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name !== "email") {
        setProfile((prev) => ({
          ...prev,
          [name]: value,
        }));

        if (errors[name]) {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
      }
    },
    [errors]
  );

  const validateProfileForm = useCallback(() => {
    // Pasar setErrors como segundo argumento
    return validateForm(profile, setErrors);
  }, [profile]);

  const setAvatar = useCallback((avatarUrl) => {
    setProfile((prev) => ({
      ...prev,
      avatar: avatarUrl,
    }));
  }, []);

  return {
    profile,
    setProfile,
    errors,
    handleChange,
    validateProfileForm,
    setAvatar,
  };
};
