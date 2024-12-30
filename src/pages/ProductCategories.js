import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from '../redux/ProductsSlice';

const ProductCategories = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAdded, setIsAdded] = useState(false);

    const { categories } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchCategories());
        console.log(categories);
    }, [dispatch]);

    const handleCancel = () => {
        navigate(-1);
    }

    const handleNavigateAddCategory = () => {
        navigate('/products/categories/add-category');
    }

    const handleNavigateAddSubCategory = () => {
        navigate('/products/categories/add-subcategory');
    }

    const handleDeleteCategory = (categoryId) => {
        const confirmDelete = window.confirm("Kategoriyi silmek istediğinize emin misiniz?");
        if (confirmDelete) {
            dispatch(deleteCategory(categoryId));
            navigate('/products/categories');
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
                    onClick={handleNavigateAddCategory}
                    className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition'
                >
                    Kategori Ekle
                </button>
                <button
                    onClick={handleNavigateAddSubCategory}
                    className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition ml-4'
                >
                    Alt Kategori Ekle
                </button>
                <h2 className="text-xl mb-4 mt-4">Kategoriler</h2>
                <table className="table-auto w-full mt-4 bg-gray-800 rounded">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Kategori Adı</th>
                            <th className="px-4 py-2">Alt Kategorileri</th>
                            <th className="px-4 py-2">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className='table-auto w-full mt-4 bg-gray-800'>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td className="border border-gray-700 px-4 py-2 ">{category.name}</td>
                                <td className="border border-gray-700 px-4 py-2">
                                    {category.subCategories && category.subCategories.length > 0 ? (
                                        category.subCategories.map((subCategory, index) => (
                                            <span key={subCategory.id}>
                                                {subCategory}
                                                {index < category.subCategories.length - 1 && " | "}
                                            </span>
                                        ))
                                    ) : (
                                        "-"
                                    )}
                                </td>                               <td className="border border-gray-700 px-4 py-2 max-w-20">
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="text-white hover:bg-red-400 bg-red-500 px-2 py-1 rounded font-light text-base w-20"
                                        >
                                            Sil
                                        </button>
                                        <button
                                            className="text-white hover:bg-green-400 bg-green-500 px-2 py-1 rounded font-light text-base w-20"
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


export default ProductCategories;



