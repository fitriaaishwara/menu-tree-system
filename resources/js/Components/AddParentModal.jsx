import React from 'react';

export default function AddParentModal({ visible, onClose, onSubmit, data, setData, errors }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Tambah Menu</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-black"
            >
              Batal
            </button>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
