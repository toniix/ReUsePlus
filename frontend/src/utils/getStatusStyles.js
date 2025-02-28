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
    case "DONADO":
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

// Add this status styles mapping at the top of your file, outside the component
// const getStatusStyles = (status) => {
//   switch (status) {
//     case "DISPONIBLE":
//       return {
//         container: "bg-green-50 dark:bg-green-900/20",
//         text: "text-green-600 dark:text-green-400",
//         icon: "🟢",
//       };
//     case "RESERVADO":
//       return {
//         container: "bg-yellow-50 dark:bg-yellow-900/20",
//         text: "text-yellow-600 dark:text-yellow-400",
//         icon: "🟡",
//       };
//     case "ENTREGADO":
//       return {
//         container: "bg-blue-50 dark:bg-blue-900/20",
//         text: "text-blue-600 dark:text-blue-400",
//         icon: "🔵",
//       };
//     default:
//       return {
//         container: "bg-gray-50 dark:bg-gray-900/20",
//         text: "text-gray-600 dark:text-gray-400",
//         icon: "⚪",
//       };
//   }
// };
