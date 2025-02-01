// Validar el formato del email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Validar la fortaleza de la contraseña
export const validatePassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

// Validar el formato del teléfono
export const validatePhone = (phone) => {
  const re = /^\d{9}$/;
  return re.test(phone);
};

// Validaciones generales para el formulario de registro
export const validateRegisterForm = (formData) => {
  const errors = {};

  if (!formData.fullName) {
    errors.fullName = "Por favor, introduce tu nombre completo.";
  }

  if (!formData.email) {
    errors.email = "Por favor, introduce tu email.";
  } else if (!validateEmail(formData.email)) {
    errors.email = "Por favor, introduce un email válido.";
  }

  if (!formData.phone) {
    errors.phone = "Por favor, introduce tu número de teléfono.";
  } else if (!validatePhone(formData.phone)) {
    errors.phone = "El número de teléfono debe tener 9 dígitos.";
  }

  if (!formData.address) {
    errors.address = "Por favor, introduce tu dirección.";
  }

  //   if (!formData.password) {
  //     errors.password = "Por favor, introduce una contraseña.";
  //   } else if (!validatePassword(formData.password)) {
  //     errors.password =
  //       "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
  //   }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Por favor, confirma tu contraseña.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};
