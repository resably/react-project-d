import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/ProductsSlice';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { items: products, status } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleAddProductRedirect = () => {
        navigate('/products/add-product');
    };

    const handleEditRedirect = (productId) => {
        navigate(`/products/edit-product/${productId}`);
    };

    const handleProductDetailsRedirect = (productId) => {
        navigate(`/products/${productId}`);
    }

    const handleDeleteProduct = (productId) => {
        const confirmDelete = window.confirm("Ürünü silmek istediğinize emin misiniz?");
        if (confirmDelete) {
            dispatch(deleteProduct(productId));
            navigate('/products');
        }
    };

    const handleCategoriesRedirect = () => {
        navigate('/products/categories');
    };

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

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-4"
                    >
                        Stok Güncelle
                    </button>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition ml-4"
                        onClick={handleCategoriesRedirect}
                    >
                        Kategoriler
                    </button>

                    <table className="table-auto w-full mt-4 bg-gray-800 rounded">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Barkod</th>
                                <th className="px-4 py-2">Ürün Adı</th>
                                <th className="px-4 py-2">Marka</th>
                                <th className="px-4 py-2">Kategori</th>
                                <th className="px-4 py-2 max-w-24">Alt Kategori</th>
                                <th className="px-4 py-2">Stok</th>
                                <th className="px-4 py-2 max-w-4">Alış Fiyatı</th>
                                <th className="px-4 py-2 max-w-4">Satış Fiyatı</th>
                                <th className="px-4 py-2">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="table-auto w-full mt-4 bg-gray-800">
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="border border-gray-700 px-4 py-2">{product.barcode}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.name}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.brand}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.category}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.subCategory}</td>
                                    <td className={`border border-gray-700 px-4 py-2 ${product.stock <= 3 ? 'text-red-500' : 'text-white'}`}>{product.stock}</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.purchasePrice} TL</td>
                                    <td className="border border-gray-700 px-4 py-2">{product.price} TL</td>
                                    <td className="border border-gray-700 px-4 py-2 max-w-40">
                                        <div className="flex justify-center gap-3">
                                            {/* Sil Butonu */}
                                            <button
                                                className="text-white hover:bg-red-400 bg-red-500 px-2 py-1 rounded font-light text-base w-20"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                Sil
                                            </button>

                                            {/* Düzenle Butonu */}
                                            <button
                                                className="text-white hover:bg-orange-400 bg-orange-500 px-2 py-1 rounded font-light text-base w-20"
                                                onClick={() => handleEditRedirect(product.id)}
                                            >
                                                Düzenle
                                            </button>

                                            {/* Detaylar Butonu */}
                                            <button
                                                className="text-white hover:bg-green-400 bg-green-500 px-2 py-1 rounded font-light text-base w-20"
                                                onClick={() => handleProductDetailsRedirect(product.id)}
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
};

export default Products;
