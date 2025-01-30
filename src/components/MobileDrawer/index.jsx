import React from 'react';
import { HiX } from 'react-icons/hi';

const MobileDrawer = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  actions 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div 
        className="fixed inset-x-0 bottom-0 transform transition-transform duration-300 ease-in-out bg-white rounded-t-xl shadow-xl"
        style={{ maxHeight: '85vh' }}
      >
        {/* Cabeçalho do Drawer */}
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-xl">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <HiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Conteúdo do Drawer */}
        <div className="overflow-y-auto p-4 space-y-4">
          {children}
        </div>

        {/* Ações do Drawer (opcional) */}
        {actions && (
          <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

// Componente auxiliar para campos do drawer
export const DrawerField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500">{label}</label>
    <div className="mt-1 text-gray-900">
      {children}
    </div>
  </div>
);

export default MobileDrawer; 