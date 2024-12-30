import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, addSubcategory } from '../redux/ProductsSlice';

const AddProductSubCategories = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.products);

    const [isAdded, setIsAdded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [name, setName] = useState('');
    const { categories } = useSelector((state) => state.products);

    console.log(name, setName);

    const handleCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (isAdded) {
            setTimeout(() => {
                navigate(-1);
            }, 100);
        }
    }, [isAdded, navigate]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);


    const handleSelectGroup = (categoryId) => {
        const category = categories.find((category) => category.id === categoryId);
        setSelectedCategory(category);
    };

    const handleAddProductSubCategory = () => {
        if (!name || !selectedCategory) {
            alert('Lütfen alt kategori adı ve üst kategori seçiniz.');
            return;
        }

        dispatch(addSubcategory({
            parentId: selectedCategory.id,
            subCategoryName: name,
        }))
            .unwrap()
            .then(() => {
                alert('Alt kategori eklendi!');
                setIsAdded(true);
            })
            .catch((err) => {
                alert(err);
            });
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
            <div className="w-full max-w-3xl bg-gray-700 p-8 rounded shadow-lg">
                <h2 className="text-xl mb-4 mt-4">Alt Kategori Ekle</h2>
                <div className="mt-4">
                    <label className="block text-gray-100">Alt Kategori Adı</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 text-gray-100 mt-1"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-100">Üst Kategorisi</label>
                    <select
                        value={selectedCategory?.id || ""}
                        onChange={(e) => handleSelectGroup(e.target.value)}
                        className="w-full p-3 rounded bg-gray-600 text-gray-100 mb-4"
                    >
                        <option value="" disabled>
                            Üst Kategori Seçiniz
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleAddProductSubCategory}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Alt Kategori Ekle
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProductSubCategories;