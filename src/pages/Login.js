import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>

        <div className="space-y-4">
          <div className="relative">
            <i className="ri-user-3-line absolute left-3 top-3 text-lg text-gray-400"></i>
            <input
              type="email"
              id="login-email"
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <i className="ri-lock-2-line absolute left-3 top-3 text-lg text-gray-400"></i>
            <input
              type="password"
              id="login-pass"
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring focus:ring-blue-500"
            />
            <span className="text-sm">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-400 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded mt-6"
        >
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
