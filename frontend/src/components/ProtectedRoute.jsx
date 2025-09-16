import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(userRole)) {
    return (
      <div className="flex items-center justify-center h-[80vh] bg-gray-50 px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <h1 className="text-3xl font-semibold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-600 text-sm mb-6">
            You do not have permission to view this page with your current role.
          </p>
          <p className="text-sm text-gray-500">
            If you think this is a mistake, please contact the system administrator.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
