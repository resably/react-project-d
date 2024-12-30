import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from '../redux/groupsSlice';

const AddCustomerGroups = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.groups);


    const [isAdded, setIsAdded] = useState(false);


    const [group, setGroup] = useState({
        name: '',
        description: '',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    });

    const handleCancel = () => {
        navigate(-1);
    }

    const handleAddCustomerGroup = () => {
        if (!group.name) {
            alert("Grup adı zorunludur!");
            return;
        }

        dispatch(addGroup(group)).then((result) => {
            if (result.type === 'groups/addGroup/fulfilled') {
                setIsAdded(true);
                alert("Grup eklendi!");
            }
        });
        setGroup({ name: '', description: '' });
    }

    useEffect(() => {
        if (isAdded) {
            setTimeout(() => {
                navigate(-1);
            }, 500);
        }
    }, [isAdded, navigate]);


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
                <h2 className="text-xl mb-4">Yeni Grup Ekle</h2>
                <div>
                    <label className="block mb-2">Grup Adı</label>
                    <input
                        type="text"
                        name="name"
                        value={group.name}
                        onChange={(e) => setGroup({ ...group, name: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Açıklama</label>
                    <input
                        type="text"
                        name="description"
                        value={group.description}
                        placeholder='Açıklama (isteğe bağlı)'
                        onChange={(e) => setGroup({ ...group, description: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleAddCustomerGroup}
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

export default AddCustomerGroups;