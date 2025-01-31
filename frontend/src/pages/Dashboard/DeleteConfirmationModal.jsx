import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Confirmar Eliminación
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          ¿Estás seguro de que quieres eliminar esta publicación? Esta acción no
          se puede deshacer.
        </p>
        <div className="flex justify-between space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-md hover:shadow-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
