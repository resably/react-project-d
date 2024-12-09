import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Added for navigation
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();  // Hook to navigate between pages

    // Navigate to AddProduct page when Add Product button is clicked
    const handleAddProductRedirect = () => {
        navigate('/add-product'); // Redirects to the add product page
    };

    // Fetch products from a database or state (you can implement Firebase or other data storage here)
    useEffect(() => {
        // Fetch products from an API or database, for now it's empty
        // setProducts(fetchedProducts);
    }, []);

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
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="border px-4 py-2">{product.name}</td>
                                    <td className="border px-4 py-2">{product.brand}</td>
                                    <td className="border px-4 py-2">{product.category}</td>
                                    <td className="border px-4 py-2">{product.quantity}</td>
                                    <td className="border px-4 py-2">{product.purchasePrice} TL</td>
                                    <td className="border px-4 py-2">{product.sellingPrice} TL</td>
                                    <td className="border px-4 py-2">
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
