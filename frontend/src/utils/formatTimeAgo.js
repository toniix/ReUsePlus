export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "justo ahora";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} minutos`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} horas`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `hace ${days} días`;
  return date.toLocaleDateString();
}
