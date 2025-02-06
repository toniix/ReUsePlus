import { validatePhone } from "./validations";

export const validateForm = (profile, setErrors) => {
  const newErrors = {};

  // Validate full name
  if (!profile.fullName.trim()) {
    newErrors.fullName = "Por favor, introduce tu nombre completo.";
  }

  // Validate phone
  if (!profile.phone.trim()) {
    newErrors.phone = "Por favor, introduce tu número de teléfono.";
  } else if (!validatePhone(profile.phone)) {
    newErrors.phone = "El número de teléfono debe tener 9 dígitos.";
  }

  // Validate location
  if (!profile.location.trim()) {
    newErrors.location = "Por favor, introduce tu dirección.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
