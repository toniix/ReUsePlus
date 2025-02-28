import React, { useEffect } from 'react';
import { formatTimeAgo } from '../../utils/formatTimeAgo';

export const NotificationItem = ({ notification, onAccept, onReject, onRead }) => {
  useEffect(() => {
    if (!notification.is_read) {
      onRead?.();
    }
  }, []);

  const renderActions = () => {
    if (notification.type === 'RESERVATION_REQUEST') {
      return (
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => onAccept(notification.reservation_id)}
            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Aceptar
          </button>
          <button
            onClick={() => onReject(notification.reservation_id)}
            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Rechazar
          </button>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className={`p-4 border-b border-gray-200 dark:border-gray-700 ${
        notification.is_read ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'
      }`}
    >
      <p className="text-gray-800 dark:text-gray-200">{notification.content}</p>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {formatTimeAgo(notification.created_at)}
      </span>
      {renderActions()}
    </div>
  );
};