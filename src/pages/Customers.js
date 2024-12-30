import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../redux/CustomerSlice';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const Customers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { customers, status } = useSelector((state) => state.customers);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCustomers());
        }
    }, [status, dispatch]);


    const handleAddCustomerRedirect = () => {
        navigate('/customers/add-customer');
    };

    const handleCustomerDetailsRedirect = (customerId) => {
        navigate(`/customers/${customerId}`);
    };

    const handleCustomerGroupsRedirect = () => {
        navigate('/customers/groups');
    };


    return (
        <div className="flex h-screen bg-[#111827] text-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title="Cari Hesaplar" />
                <div className="p-6">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={handleAddCustomerRedirect}
                    >
                        Cari Ekle
                    </button>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-4"
                        onClick={handleCustomerGroupsRedirect}
                    >
                        Gruplar
                    </button>

                    <table className="table-auto w-full mt-4 bg-gray-800 rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">Cari Adı</th>
                                <th className="px-4 py-2">Yetkili</th>
                                <th className="px-4 py-2">Telefon Numarası</th>
                                <th className="px-4 py-2">E-posta</th>
                                <th className="px-4 py-2">Bakiye *</th>
                                <th className="px-4 py-2">Grubu</th>
                                <th className="px-4 py-2">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="table-auto w-full mt-4 bg-gray-800">
                            {customers.map((customers) => (
                                <tr key={customers.id}>
                                    <td className="border border-gray-700 px-4 py-2">{customers.id}</td>
                                    <td className="border border-gray-700 px-4 py-2">{customers.name}</td>
                                    <td className="border border-gray-700 px-4 py-2">{customers.manager}</td>
                                    <td className="border border-gray-700 px-4 py-2">{customers.phone}</td>
                                    <td className="border border-gray-700 px-4 py-2">{customers.email}</td>
                                    <td className="border border-gray-700 px-4 py-2">{customers.balance}</td>
                                    <td className="border border-gray-700 px-4 py-2">{customers.group}</td>
                                    <td className="border border-gray-700 px-4 py-2 max-w-40">
                                        <div className="flex justify-center gap-3">
                                            {/* Sil Butonu */}
                                            <button
                                                className="text-white hover:bg-red-400 bg-red-500 px-2 py-1 rounded font-light text-base w-20"
                                            //delete customer
                                            >
                                                Sil
                                            </button>

                                            {/* Düzenle Butonu */}
                                            <button
                                                className="text-white hover:bg-orange-400 bg-orange-500 px-2 py-1 rounded font-light text-base w-20"
                                            //edit customer
                                            >
                                                Düzenle
                                            </button>

                                            {/* Detaylar Butonu */}
                                            <button
                                                className="text-white hover:bg-green-400 bg-green-500 px-2 py-1 rounded font-light text-base w-20"
                                                onClick={() => handleCustomerDetailsRedirect(customers.id)}
                                            >
                                                Detaylar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Customers;