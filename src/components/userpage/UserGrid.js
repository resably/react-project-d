import React, { useState } from "react";

const UserGrid = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Kullanıcı Bilgileri:', userData);
    alert('Bilgiler başarıyla gönderildi!');
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Container */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Kullanıcı Bilgileri</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="firstName" className="block text-sm font-medium text-black">
                Ad:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                placeholder="Adınızı giriniz"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-black text-black"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="block text-sm font-medium text-black">
                Soyad:
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                placeholder="Soyadınızı giriniz"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-black text-black"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="block text-sm font-medium text-black">
                Telefon Numarası:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                placeholder="Telefon numaranızı giriniz"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-black text-black"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="block text-sm font-medium text-black">
                E-posta:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                placeholder="E-posta adresinizi giriniz"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-black text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Gönder
            </button>
          </form>
        </div>

        {/* Information Table */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-black">Bilgi Tablosu</h2>
          <table className="table-auto w-full border border-gray-300 text-sm text-left shadow-md">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-4 py-2 border">Bilgi Türü</th>
                <th className="px-4 py-2 border">Bilgi</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border text-black">Ad</td>
                <td className="px-4 py-2 border text-black">{userData.firstName || '-'}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-black">Soyad</td>
                <td className="px-4 py-2 border text-black">{userData.lastName || '-'}</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-4 py-2 border text-black">Telefon Numarası</td>
                <td className="px-4 py-2 border text-black">{userData.phone || '-'}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border text-black">E-posta</td>
                <td className="px-4 py-2 border text-black">{userData.email || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserGrid;
