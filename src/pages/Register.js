import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>

        <div className="space-y-4">
          <div className="relative">
            <i className="ri-user-3-line absolute left-3 top-3 text-lg text-gray-400"></i>
            <input
              type="text"
              id="register-username"
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500"
              placeholder="Username"
              required
            />
          </div>

          <div className="relative">
            <i className="ri-mail-line absolute left-3 top-3 text-lg text-gray-400"></i>
            <input
              type="email"
              id="register-email"
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <i className="ri-lock-2-line absolute left-3 top-3 text-lg text-gray-400"></i>
            <input
              type="password"
              id="register-pass"
              className="pl-10 w-full p-3 bg-gray-700 text-white rounded focus:ring focus:ring-blue-500"
              placeholder="Password"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded mt-6"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
