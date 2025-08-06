// resources/js/Pages/Menus/Index.jsx
import React, { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import AddMenuModal from '@/Components/AddMenuModal';
import EditMenuModal from '@/Components/EditMenuModal';
import AddParentModal from '@/Components/AddParentModal';
import '../../../css/app.css';
import Layout from '../../Layouts/Layout';
import toast from 'react-hot-toast'


function Index({ menus }) {
  const { data, setData, post, reset, errors } = useForm({
    name: '',
    parent_id: null,
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [modalData, setModalData] = useState({ id: '', name: '', parent_id: '', parent_name: '', depth: '' });
  const [showAddParentModal, setShowAddParentModal] = useState(false);
  const [expandedIds, setExpandedIds] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('system management');
  const [isExpandActive, setIsExpandActive] = useState(false);
  const [isCollapseActive, setIsCollapseActive] = useState(false);
  const toggleExpand = (id) => {
  if (expandedIds.includes(id)) {
    setExpandedIds((prev) => prev.filter((itemId) => itemId !== id));
  } else {
    setExpandedIds((prev) => [...prev, id]);
  }
};


  const getParentName = (parentId, menus) => {
    for (let menu of menus) {
      if (menu.id === parentId) return menu.name;
      if (menu.children && menu.children.length > 0) {
        const name = getParentName(parentId, menu.children);
        if (name) return name;
      }
    }
    return null;
  };

  useEffect(() => {
    if (modalData.parent_id) {
      const parentName = getParentName(modalData.parent_id, menus);
      setModalData((prev) => ({
        ...prev,
        parent_name: parentName || 'No Parent',
      }));
    }
  }, [modalData.parent_id, menus]);

  useEffect(() => {
  const ids = [];
  const collectIds = (items) => {
    items.forEach((item) => {
      ids.push(item.id);
      if (item.children) collectIds(item.children);
    });
  };
  collectIds(menus);
  setExpandedIds(ids);
  setIsExpandActive(true); // optional, kalau mau tombol “Expand All” tampak aktif
}, [menus]);

  const handleButtonClick = () => {
    setIsExpandActive(false);
    setIsCollapseActive(false);
    setData({ name: '', parent_id: null });
    setShowAddParentModal(true);
  };

  const handleExpandAll = () => {
    const ids = [];
    const collectIds = (items) => {
      items.forEach((item) => {
        ids.push(item.id);
        if (item.children) collectIds(item.children);
      });
    };
    collectIds(menus);
    setExpandedIds(ids);
    setIsExpandActive(true);
    setIsCollapseActive(false);
  };

  const handleCollapseAll = () => {
    setExpandedIds([]);
    setIsCollapseActive(true);
    setIsExpandActive(false);
  };

  const findDepthById = (id, menus) => {
  for (const menu of menus) {
    if (menu.id === id) return menu.depth;
    if (menu.children && menu.children.length > 0) {
      const depth = findDepthById(id, menu.children);
      if (depth !== null) return depth;
    }
  }
  return null;
};

const handleAddSubmenu = (parentId) => {
  const parentDepth = findDepthById(parentId, menus);
  setModalType('add');
  setModalData({
    id: '',
    name: '',
    parent_id: parentId,
    parent_name: '',
    depth: parentDepth !== null ? parentDepth + 1 : 1, // default to 1 if not found
  });
  setShowModal(true);
};

  const handleEdit = (menu) => {
    setModalType('edit');
    const parentName = getParentName(menu.parent_id, menus);
    setModalData({
      id: menu.id,
      name: menu.name,
      parent_id: menu.parent_id,
      parent_name: parentName || 'No Parent',
      depth: menu.depth,
    });
    setShowModal(true);
  };

const handleAddModalSubmit = (e) => {
  e.preventDefault();

  router.post('/menus', modalData, {
    onSuccess: () => {
      setShowModal(false);  // tutup modal
      toast.success('Submenu berhasil ditambahkan');
    },
    onError: (errors) => {
      console.error(errors);
      toast.error('Gagal menambahkan submenu');
    }
  });
};



const handleModalSubmit = (e) => {
  e.preventDefault();

  router.put(`/menus/${modalData.id}`, modalData, {
    onSuccess: () => {
      setShowModal(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });
};

  const handleAddParentSubmit = (e) => {
    e.preventDefault();
    post('/menus', {
      onSuccess: () => {
        reset();
        setShowAddParentModal(false);
      },
    });
  };

const handleDelete = (id) => {
  const url = `/menus/${id}`;
  console.log('Delete ID:', id);
  console.log('URL:', url);

  router.delete(url, {
    data: {},
    preserveScroll: true,
    onSuccess: () => {
      toast.success('Menu berhasil dihapus');
    },
    onError: (errors) => {
      toast.error('Gagal menghapus menu');
      console.error(errors);
    },
  });
};

  const renderTree = (items) => {
    return (
      <ul className="ml-4 border-l border-gray-300">
        {items.map((menu) => {
          const isExpanded = expandedIds.includes(menu.id);
          const hasChildren = menu.children && menu.children.length > 0;

          return (
            <li key={menu.id} className="relative pl-4 mb-2">
              <div className="flex items-center justify-start group">
                <div className="flex items-center gap-1 mr-2">
                  {hasChildren && (
                    <button
                      onClick={() => toggleExpand(menu.id)}
                      className="text-xs text-gray-600 hover:text-black focus:outline-none"
                    >
                      {isExpanded ? '▼' : '▸'}
                    </button>
                  )}
                  <span className="text-gray-800">{menu.name}</span>
                </div>

                {isExpanded && menu.parent_id && (
                  <div className="text-sm text-gray-600 ml-4">
                    Parent: {getParentName(menu.parent_id, menus)}
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleAddSubmenu(menu.id)} className="text-white w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none text-sm font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M12 5v14m7-7H5" />
                    </svg>
                  </button>

                  <button onClick={() => handleEdit(menu)} className="text-white w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none text-sm font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M16 3l5 5-8 8H8V8l8-8z" />
                    </svg>
                  </button>

                  <button onClick={() => handleDelete(menu.id)} className="text-white w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none text-sm font-bold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {hasChildren && isExpanded && (
                <div className="ml-2">
                  {renderTree(menu.children)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  const sortedMenus = [...menus].sort((a, b) => a.id - b.id);

  return (
    <Layout menus={menus} breadcrumb="Menus">
      <div className="p-6 max-w-7xl">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 rounded-full bg-blue-800 flex justify-center items-center text-white mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
            </svg>
          </div>
          <span className="font-bold text-lg">Menus</span>
        </div>

        <div className="flex gap-2 mb-4 items-center">
          <button
            onClick={handleExpandAll}
            className={`${isExpandActive ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-700'} rounded-full px-4 py-2`}
          >
            Expand All
          </button>
          <button
            onClick={handleCollapseAll}
            className={`${isCollapseActive ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-700'} rounded-full px-4 py-2`}
          >
            Collapse All
          </button>

          <button onClick={handleButtonClick} className="ml-auto bg-blue-900 text-white p-3 rounded-full focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M12 5v14m7-7H5" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">

          {renderTree(sortedMenus)}
        </div>

        {/* Modal ADD */}
        {modalType === 'add' && (
          <AddMenuModal
            visible={showModal}
            title="Tambah Submenu"
            onClose={() => setShowModal(false)}
            onSubmit={handleAddModalSubmit} // pastikan ini
            data={modalData}
            setData={(key, value) => setModalData((prev) => ({ ...prev, [key]: value }))}
            errors={errors}
            />

        )}

        {/* Modal EDIT */}
        {modalType === 'edit' && (
          <EditMenuModal
            visible={showModal}
            title="Edit Menu"
            onClose={() => setShowModal(false)}
            onSubmit={handleModalSubmit}
            data={modalData}
            setData={(key, value) => setModalData((prev) => ({ ...prev, [key]: value }))}
            errors={errors}
          />
        )}

        {/* Modal Tambah Parent */}
        <AddParentModal
          visible={showAddParentModal}
          onClose={() => setShowAddParentModal(false)}
          onSubmit={handleAddParentSubmit}
          data={data}
          setData={setData}
          errors={errors}
        />
      </div>
    </Layout>
  );
}

export default Index;
