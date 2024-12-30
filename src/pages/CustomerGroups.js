import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, deleteGroup } from '../redux/groupsSlice';

const CustomerGroups = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    const { groups, error } = useSelector((state) => state.groups);


    useEffect(() => {
        dispatch(fetchGroups());
    }, [dispatch]);

    console.log(groups);

    const handleCancel = () => {
        navigate(-1);
    };

    const handleNavigateAddGroup = () => {
        navigate('/customers/groups/add-group');
    };

    const handleDeleteGroup = (groupId) => {
        const confirmDelete = window.confirm("Grubu silmek istediğinize emin misiniz?");
        if (confirmDelete) {
            dispatch(deleteGroup(groupId));
            navigate('/customers/groups');
        }
    }

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
            <div className="w-full max-w-3xl bg-gray-700 p-8 rounded shadow-lg">
                <button
                    onClick={handleNavigateAddGroup}
                    className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition'
                >
                    Grup Ekle
                </button>
                <h2 className="text-xl mb-4 mt-4">Gruplar</h2>
                <table className="table-auto w-full mt-4 bg-gray-800 rounded">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Grup Adı</th>
                            <th className="px-4 py-2">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="table-auto w-full mt-4 bg-gray-800">
                        {groups.map((group) => (
                            <tr key={group.id}>
                                <td className="border border-gray-700 px-4 py-2 max-w-full text-lg font-bold">{group.name}</td>
                                <td className="border border-gray-700 px-4 py-2 max-w-24">
                                    <div className="flex justify-center gap-3">
                                        {/* Sil Butonu */}
                                        <button
                                            className="text-white hover:bg-red-400 bg-red-500 px-2 py-1 rounded font-light text-base w-20"
                                            onClick={() => handleDeleteGroup(group.id)}
                                        >
                                            Sil
                                        </button>

                                        {/* Düzenle Butonu */}
                                        <button
                                            className="text-white hover:bg-green-400 bg-green-500 px-2 py-1 rounded font-light text-base w-20"
                                        // onClick={() => handleEditRedirect(product.id)}
                                        >
                                            Düzenle
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CustomerGroups;