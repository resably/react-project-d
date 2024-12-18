import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/ProductsSlice";
import { use } from 'react';


const AddProduct = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.products);

    const [isAdded, setIsAdded] = useState(false);


    const [product, setProduct] = useState({
        barcode: '',
        name: '',
        brand: '',
        category: '',
        stock: 0,
        purchasePrice: 0,
        price: 0,
    });

    const handleAddProduct = () => {
        if (!product.barcode || !product.name) {
            alert("Barkod ve ürün adı zorunludur!");
            return;
        }

        dispatch(addProduct(product)).then((result) => {
            if (result.type === 'products/addProduct/fulfilled') {
                setIsAdded(true);
            }
        });
        setProduct({ name: '', brand: '', category: '', stock: 0, purchasePrice: 0, price: 0 });
        alert("Ürün eklendi!");

    };

    useEffect(() => {
        if (isAdded) {
            setTimeout(() => {
                navigate('/products');
            }, 500);
        }
    }, [isAdded, navigate]);


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
                    <label className="block mb-2">Ürün Barkodu:</label>
                    <input
                        type="text"
                        name="productCode"
                        value={product.barcode}
                        onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Ürün Adı:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Marka:</label>
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Kategori:</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Adet:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Alış Fiyatı:</label>
                    <input
                        type="number"
                        name="purchasePrice"
                        value={product.purchasePrice}
                        onChange={(e) => setProduct({ ...product, purchasePrice: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Satış Fiyatı:</label>
                    <input
                        type="number"
                        name="sellingPrice"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
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

                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Confirmation table (temporary, only shows after product is added)
                    {addedProduct && (
                        <div className="mt-8 p-4 bg-gray-600 rounded">
                            <h3 className="text-lg mb-4">Ürün Eklendi!</h3>
                            <table className="table-auto w-full bg-gray-700 rounded">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Barkod</th>
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
                                        <td className="border px-4 py-2">{addedProduct.barcode}</td>
                                        <td className="border px-4 py-2">{addedProduct.name}</td>
                                        <td className="border px-4 py-2">{addedProduct.brand}</td>
                                        <td className="border px-4 py-2">{addedProduct.category}</td>
                                        <td className="border px-4 py-2">{addedProduct.stock}</td>
                                        <td className="border px-4 py-2">{addedProduct.purchasePrice}₺</td>
                                        <td className="border px-4 py-2">{addedProduct.price}₺</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )} */}
            </div>
        </div>
    );
};

export default AddProduct;
