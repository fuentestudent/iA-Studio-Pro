import React, { useState } from 'react';

const CodeEditor = ({ onOptimize }) => {
  const [code, setCode] = useState('Escribe tu prompt o código aquí...');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleOptimize = () => {
    if (onOptimize) {
      onOptimize(code);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-semibold text-white">Editor de Código</h3>
        <button
          onClick={handleOptimize}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Optimizar Prompt
        </button>
      </div>
      <textarea
        className="flex-1 bg-gray-900 text-gray-200 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        value={code}
        onChange={handleChange}
        placeholder="Escribe tu prompt o código aquí..."
        rows="10"
      ></textarea>
    </div>
  );
};

export default CodeEditor;