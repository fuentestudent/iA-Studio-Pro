import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Layout = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl text-gray-800">INTEGRADA</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-800 mr-4">Hola, {user?.name}</span>
              <button
                onClick={logoutUser}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
