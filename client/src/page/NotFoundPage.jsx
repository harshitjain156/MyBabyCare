import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const  location = useLocation();
  const {pathname } = location;
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">Oops! Page not found.</p>
      <Link to={pathname.includes("user")? "/user/login":"/doctor/login"} className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition duration-300">Go to Login Page</Link>
    </div>
  );
};

export default NotFoundPage;
