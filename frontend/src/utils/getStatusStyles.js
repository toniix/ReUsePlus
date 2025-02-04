const getStatusStyles = (status) => {
  switch (status) {
    case "DISPONIBLE":
      return {
        container: "bg-green-500/90 dark:bg-green-500/80 shadow-green-500/20",
        text: "text-white dark:text-white",
        icon: "•",
      };
    case "RESERVADO":
      return {
        container:
          "bg-yellow-500/90 dark:bg-yellow-500/80 shadow-yellow-500/20",
        text: "text-white dark:text-white",
        icon: "•",
      };
    case "NO_DISPONIBLE":
      return {
        container: "bg-gray-500/90 dark:bg-gray-500/80 shadow-gray-500/20",
        text: "text-white dark:text-white",
        icon: "×",
      };
    default:
      return {
        container: "",
        text: "",
        icon: "",
      };
  }
};

export default getStatusStyles;
