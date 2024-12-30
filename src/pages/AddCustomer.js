import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addCustomer } from "../redux/CustomerSlice";
import { fetchGroups } from '../redux/groupsSlice';

const AddCustomer = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const { groups } = useSelector((state) => state.groups);

    const error = null;


    const [customer, setCustomer] = useState({
        name: '',
        manager: '',
        phone: '',
        email: '',
        balance: 0,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    });

    const handleAddCustomer = () => {
        if (!selectedGroup) {
            alert("Grup seçiniz!");
            return;
        }
        if (!customer.name || !customer.manager || !customer.phone || !customer.email) {
            alert("Cari adı, yetkili, telefon numarası ve email zorunludur!");
            return;
        }

        dispatch(addCustomer(customer)).then((result) => {
            if (result.type === 'customers/addCustomer/fulfilled') {
                setIsAdded(true);
            }
        }
        );
        setCustomer({ name: '', manager: '', phone: '', email: '', balance: 0, createdAt: new Date().toISOString(), lastUpdated: new Date().toISOString() });
        alert("Cari eklendi!");
    };

    useEffect(() => {
        if (isAdded) {
            setTimeout(() => {
                navigate('/customers');
            }, 100);
        }
    }, [isAdded, navigate]);

    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    const handleCancel = () => {
        navigate('/customers');
    };

    const handleSelectGroup = (groupId) => {
        const group = groups.find((group) => group.id === groupId);
        setSelectedGroup(group);
        setCustomer({ ...customer, group: groupId });
    };

    return (
        <div className="relative flex justify-center items-center bg-gray-800 min-h-screen text-gray-100">
            <div className="absolute top-4 left-4">
                <button
                    onClick={handleCancel}
                    className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                >
                    X
                </button>
            </div>
            <div className="w-full max-w-lg bg-gray-700 p-8 rounded shadow-lg">
                <h2 className="text-xl mb-4 font-bold">Yeni Cari Ekle</h2>
                <div>
                    <label className="block mb-2">Cari Adı</label>
                    <input
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Yetkili</label>
                    <input
                        type="text"
                        name="manager"
                        value={customer.manager}
                        onChange={(e) => setCustomer({ ...customer, manager: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Grup</label>
                    <select
                        value={selectedGroup?.id || ""}
                        onChange={(e) => handleSelectGroup(e.target.value)}
                        className="w-full p-3 rounded bg-gray-600 text-gray-100 mb-4"
                    >
                        <option value="" disabled>
                            Grup Seçiniz
                        </option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2 min-h-5">Adres</label>
                    <input
                        type="text"
                        name="address"
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Telefon Numarası</label>
                    <input
                        type="tel"
                        pattern="(0|\+90)[0-9]{10}"
                        name="phone"
                        maxLength={11}
                        placeholder='0XXXXXXXXXX'
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />
                    <label className="block mb-2">Email Adresi</label>
                    <input
                        type="email"
                        name="email"
                        placeholder='test@test.com'
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleAddCustomer}
                            className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        >
                            Ekle
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-1/2 bg-red-500 text-white p-2 rounded ml-4 hover:bg-red-600 transition"
                        >
                            İptal
                        </button>
                    </div>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

            </div>
        </div>
    );
}

export default AddCustomer;