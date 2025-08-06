import React, { useState } from 'react';

export default function Sidebar({ menus }) {
  // State untuk toggle sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // State untuk menyimpan menu yang sedang diperluas (expanded)
  const [expandedMenus, setExpandedMenus] = useState([]);

  // State untuk menu yang dipilih
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // State untuk submenu yang aktif

  // Fungsi untuk toggle state sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fungsi untuk toggle submenu (expand/collapse)
  const toggleSubmenu = (id) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((menuId) => menuId !== id) : [...prev, id]
    );
  };

  // Fungsi untuk set active menu
  const setActive = (menuId, isSubmenu = false) => {
    if (isSubmenu) {
      setActiveSubmenu(menuId); // Set active submenu
    } else {
      setActiveMenu(menuId); // Set active parent menu
    }
  };

  // Fungsi untuk render submenu (recursive rendering untuk menu bertingkat)
  const renderSubmenu = (menu) => {
    if (menu.children && menu.children.length > 0) {
      return (
        <ul className="pl-4">
          {menu.children.map((child) => (
            <li key={child.id} className="flex flex-col">
              {/* Child Menu item */}
              <div
                onClick={() => {
                  toggleSubmenu(child.id);
                  setActive(child.id, true); // Set active for submenu
                }}
                className={`flex items-center gap-2 cursor-pointer hover:bg-blue-600 rounded px-2 py-1 ${
                  activeSubmenu === child.id ? 'bg-white text-blue-800' : 'text-white'
                }`} // Menambahkan kelas untuk submenu yang aktif
              >
                {/* Icon grid untuk submenu */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
                </svg>
                <span className="font-semibold">{child.name}</span>
              </div>

              {/* Recursive call for nested submenu */}
              {expandedMenus.includes(child.id) && renderSubmenu(child)}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col bg-blue-700 text-white w-64 h-full p-6 transition-all duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      {/* Header logo + icon menu */}
      <div className="flex justify-between items-center mb-8">
        <div className={`font-bold text-sm leading-tight ${isSidebarOpen ? 'block' : 'hidden'}`}>
          <div>Solusi</div>
          <div>Teknologi</div>
          <div>Kreatif</div>
        </div>
        {/* Hamburger button */}
        <button className="focus:outline-none" onClick={toggleSidebar}>
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu List */}
      <nav>
        <ul className={`${isSidebarOpen ? 'block' : 'hidden'} space-y-4`}>
          {menus.map((menu) => (
            <li key={menu.id} className="flex flex-col">
              {/* Menu item */}
              <div
                onClick={() => {
                  toggleSubmenu(menu.id); // Toggle submenu
                  setActive(menu.id); // Set active for menu
                }}
                className={`flex items-center gap-2 cursor-pointer hover:bg-blue-600 rounded px-2 py-1 ${
                  activeMenu === menu.id ? 'bg-white text-blue-800' : 'text-white'
                }`} // Menambahkan kondisi untuk menu yang aktif
              >
                {/* Icon folder untuk menu parent */}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                <span className="font-semibold">{menu.name}</span>
              </div>

              {/* Recursive call for submenu */}
              {expandedMenus.includes(menu.id) && renderSubmenu(menu)}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
