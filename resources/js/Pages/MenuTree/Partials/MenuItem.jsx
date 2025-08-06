// resources/js/Pages/MenuTree/Partials/MenuItem.jsx

import React from "react";

const MenuItem = ({ menu, onEdit, onDelete, onAddSubmenu }) => {
  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">{menu.name}</span>
        <button
          onClick={() => onEdit(menu)}
          className="text-blue-500 hover:underline text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onAddSubmenu(menu)}
          className="text-green-500 hover:underline text-sm"
        >
          + Submenu
        </button>
        <button
          onClick={() => onDelete(menu.id)}
          className="text-red-500 hover:underline text-sm"
        >
          Delete
        </button>
      </div>

      {/* Tampilkan anak-anaknya jika ada */}
      {menu.children && menu.children.length > 0 && (
        <div className="ml-4">
          {menu.children.map((child) => (
            <MenuItem
              key={child.id}
              menu={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddSubmenu={onAddSubmenu}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
