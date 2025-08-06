// Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, menus, breadcrumb }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar menus={menus} />
      <div className="flex-grow p-6 overflow-auto">
        {/* Breadcrumb di atas konten */}
        <div className="mb-4 text-gray-600 text-sm flex items-center gap-1">
          {/* Icon folder kecil */}
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span>{breadcrumb}</span>
        </div>

        {children}
      </div>
    </div>
  );
}
