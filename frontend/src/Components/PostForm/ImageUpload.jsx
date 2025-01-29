import React from 'react';
import { X, Camera } from 'lucide-react';

export const ImageUpload = ({ images, onUpload, onRemove, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Images (Max 5)
      </label>
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-24 h-24 object-cover rounded"
            />
            <button
              onClick={() => onRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <label className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-gray-400">
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              className="hidden"
              multiple
            />
            <Camera className="text-gray-400" />
          </label>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
