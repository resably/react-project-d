import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from '../redux/ProductsSlice';

const AddProductCategories = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.products);

    const [isAdded, setIsAdded] = useState(false);

    const [category, setCategory] = useState({
        name: '',
        subCategories: [],
        description: '',
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
    });

    const handleCancel = () => {
        navigate(-1);
    }

    const handleAddProductCategory = () => {
        if (!category.name) {
            alert("Kategori adı zorunludur!");
            return;
        }

        if (error) {
            alert(error);
            return;
        }

        dispatch(addCategory(category)).then((result) => {
            if (result.type === 'products/addCategory/fulfilled') {
                setIsAdded(true);
                alert("Kategori eklendi!");
            }
        });
        setCategory({ name: '', description: '' });
    }

    useEffect(() => {
        if (isAdded) {
            setTimeout(() => {
                navigate(-1);
            }, 100);
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
            <div className="w-full max-w-3xl bg-gray-700 p-8 rounded shadow-lg">
                <h2 className="text-xl mb-4 mt-4">Kategori Ekle</h2>
                <div className="mt-4">
                    <label className="block">Kategori Adı</label>
                    <input
                        type="text"
                        value={category.name}
                        onChange={(e) => setCategory({ ...category, name: e.target.value })}
                        className="w-full p-2 rounded bg-gray-800 text-gray-100"
                    />
                </div>
                <div className="mt-4">
                    <label className="block">Açıklama</label>
                    <textarea
                        value={category.description}
                        onChange={(e) => setCategory({ ...category, description: e.target.value })}
                        className="w-full p-2 rounded bg-gray-800 text-gray-100"
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="mt-4">
                    <button
                        onClick={handleAddProductCategory}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Kategori Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProductCategories;