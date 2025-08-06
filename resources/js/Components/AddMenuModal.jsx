import React from 'react';

export default function AddMenuModal({
  visible,
  onClose,
  onSubmit,
  data,
  setData,
  errors,
  title,
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <form onSubmit={onSubmit}>
          {/* Hidden ID */}
          <input type="hidden" value={data.id || ''} />

          {/* Depth */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Depth</label>
            <input
              value={data.depth || ''}
              onChange={(e) => setData('depth', e.target.value)}
              className="w-full p-2 border rounded"
              required
              disabled // agar tidak bisa diubah manual
            />
          </div>

          {/* Parent */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Parent</label>
            <input
              value={data.parent_name || 'No Parent'}
              className="w-full p-3 border rounded-md text-sm bg-gray-100"
              disabled
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              value={data.name || ''}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 text-sm">Batal</button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
