import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { FiEdit2, FiTrash2 } from 'react-icons/fi'; // Feather icons

const ActionMenu = ({ row, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => setOpen(prev => !prev);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="actionMenuWrapper" ref={menuRef} style={{ position: 'relative' }}>
      <div onClick={toggleMenu} style={{ cursor: 'pointer', width: '16px' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="16" height="16" fill="black">
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
        </svg>
      </div>

      {open && (
        <div
          className="dropdownMenu"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '4px 0',
            zIndex: 100,
            minWidth: '100px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
        >
          <div
            className="menuItem"
            style={{ padding: '6px 12px', cursor: 'pointer', gap: '10px',display: 'flex',alignItems: 'center'}}
            onClick={() => {
              setOpen(false);
              onEdit?.(row.original);
            }}
          >
            <FiEdit2 size={15} />
            Edit
          </div>
          <div
            className="menuItem"
            style={{ padding: '6px 12px', cursor: 'pointer', gap: '10px',display: 'flex',alignItems: 'center', color:'red' }}
            onClick={() => {
              setOpen(false);
              const employeeID = row.original._id
              onDelete?.(employeeID);
            }}
          >
            <FiTrash2 size={15} />
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
