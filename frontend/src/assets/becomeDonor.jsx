const becomeDonor = async () => {
  try {
    const { error } = await supabase
      .from("users")
      .update({ is_donor: true }) // Si usas un campo booleano
      // .update({ role: 'donador' }) // Si usas un campo de texto para roles
      .eq("id", user.id);

    if (error) throw error;

    alert("¡Ahora eres donador!");
    // Opcional: Refresca el estado del usuario en la app
  } catch (err) {
    console.error("Error al cambiar el rol:", err.message);
  }
};
