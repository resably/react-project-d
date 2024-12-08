import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        productCode: '',
        name: '',
        brand: '',
        category: '',
        quantity: 0,
        purchasePrice: 0,
        sellingPrice: 0,
    });

    const [addedProduct, setAddedProduct] = useState(null);
    const navigate = useNavigate(); // Use navigate for redirection

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Handle form submission (temporary, without Firebase for now)
    const handleAddProduct = () => {
        // Add the new product to the table (for now, just in state)
        setAddedProduct(newProduct);
        // Reset form fields
        setNewProduct({
            productCode: '',
            name: '',
            brand: '',
            category: '',
            quantity: 0,
            purchasePrice: 0,
            sellingPrice: 0,
        });
        // Navigate back to products page after adding product
        setTimeout(() => navigate('/products'), 2000); // Redirect after 2 seconds (for animation)
    };

    // Handle cancel button click
    const handleCancel = () => {
        navigate('/products');
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
                <h2 className="text-xl mb-4">Ürün Ekle</h2>
                <div>
                    <label className="block mb-2">Ürün Kodu:</label>
                    <input
                        type="text"
                        name="productCode"
                        value={newProduct.productCode}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Ürün Adı:</label>
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Marka:</label>
                    <input
                        type="text"
                        name="brand"
                        value={newProduct.brand}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Kategori:</label>
                    <input
                        type="text"
                        name="category"
                        value={newProduct.category}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Adet:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={newProduct.quantity}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Alış Fiyatı:</label>
                    <input
                        type="number"
                        name="purchasePrice"
                        value={newProduct.purchasePrice}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Satış Fiyatı:</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        value={newProduct.sellingPrice}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleAddProduct}
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

                {/* Confirmation table (temporary, only shows after product is added) */}
                {addedProduct && (
                    <div className="mt-8 p-4 bg-gray-600 rounded">
                        <h3 className="text-lg mb-4">Ürün Eklendi!</h3>
                        <table className="table-auto w-full bg-gray-700 rounded">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Ürün Adı</th>
                                    <th className="px-4 py-2">Marka</th>
                                    <th className="px-4 py-2">Kategori</th>
                                    <th className="px-4 py-2">Adet</th>
                                    <th className="px-4 py-2">Alış Fiyatı</th>
                                    <th className="px-4 py-2">Satış Fiyatı</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-4 py-2">{addedProduct.name}</td>
                                    <td className="border px-4 py-2">{addedProduct.brand}</td>
                                    <td className="border px-4 py-2">{addedProduct.category}</td>
                                    <td className="border px-4 py-2">{addedProduct.quantity}</td>
                                    <td className="border px-4 py-2">{addedProduct.purchasePrice}₺</td>
                                    <td className="border px-4 py-2">{addedProduct.sellingPrice}₺</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddProduct;
