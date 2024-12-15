import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/ProductsSlice';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';



const Products = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items: products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
            console.log('fetching products');
        }
    }, [status, dispatch]);

    const handleAddProductRedirect = () => {
        navigate('/add-product');
    };

    if (status === "loading") {
        return <p className="text-white">Ürünler yükleniyor...</p>;
    }

    if (status === "failed") {
        return <p className="text-red-500">Hata: {error}</p>;
    }


    return (
        <div className="flex h-screen bg-[#111827] text-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title="Ürünler" />
                <div className="p-6">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        onClick={handleAddProductRedirect}
                    >
                        Ürün Ekle
                    </button>

                    <table className="table-auto w-full mt-4 bg-gray-800 rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Ürün Adı</th>
                                <th className="px-4 py-2">Marka</th>
                                <th className="px-4 py-2">Kategori</th>
                                <th className="px-4 py-2">Miktar</th>
                                <th className="px-4 py-2">Alış Fiyatı</th>
                                <th className="px-4 py-2">Satış Fiyatı</th>
                                <th className="px-4 py-2">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className='table-auto w-full mt-4 bg-gray-800'>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="border border-gray-700 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.brand}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.category}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.stock}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.purchasePrice} TL</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.price} TL</td>
                                    <td className="border border-gray-700 px-4 py-2">
                                        <button
                                            className="text-red-500 hover:underline"
                                        // Handle delete or other actions here
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


export default Products;
