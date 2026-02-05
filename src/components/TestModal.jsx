import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const TestModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  console.log('TestModal rendered, isOpen:', isOpen);
  
  const handleClick = () => {
    console.log('Button clicked!');
    console.log('Setting isOpen to true');
    setIsOpen(true);
    console.log('isOpen after setState:', isOpen);
  };
  
  const handleClose = () => {
    console.log('Close clicked');
    setIsOpen(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Modal Page</h1>
      
      {/* Debug info */}
      <div className="mb-4 p-3 bg-blue-100 rounded">
        <p className="text-blue-800">isOpen: {isOpen ? 'true' : 'false'}</p>
        <p className="text-blue-800">Modal visible: {isOpen ? 'YES' : 'NO'}</p>
      </div>
      
      {/* Test button */}
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Open Test Modal
      </button>
      
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Test Modal</h2>
              <button 
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-green-600 font-medium">✓ SUCCESS! Modal is working!</p>
              <p>If you can see this message, the button and modal are functioning correctly.</p>
              <button
                onClick={handleClose}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestModal;