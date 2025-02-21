import { X, Tag, AlertCircle } from 'lucide-react';

export const TagInput = ({ tags, currentTag, onAddTag, onRemoveTag, onTagChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Etiquetas (Mínimo 1, Máximo 5)
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-rose-50 dark:bg-rose-900/20 text-rose-800 dark:text-rose-200"
          >
            {tag}
            <button
              onClick={() => onRemoveTag(index)}
              className="ml-2 text-rose-600 hover:text-rose-800 dark:text-rose-300 dark:hover:text-rose-100"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>
      {tags.length < 5 && (
        <div className={`flex items-center border rounded-lg ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}>
          <span className="px-3 py-2 text-gray-500 dark:text-gray-400">
            <Tag size={20} />
          </span>
          <input
            type="text"
            value={currentTag}
            onChange={(e) => onTagChange(e.target.value)}
            onKeyDown={onAddTag}
            placeholder="Agrega una etiqueta y presiona Enter"
            className="flex-1 p-2 outline-none bg-transparent dark:text-white"
          />
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
};
