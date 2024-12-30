import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchCategories } from "../redux/ProductsSlice";


const AddProduct = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.products);
    const [isAdded, setIsAdded] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [noSubCategories, setNoSubCategories] = useState(false);
    const { categories } = useSelector((state) => state.products);


    const [product, setProduct] = useState({
        barcode: '',
        name: '',
        brand: '',
        category: '',
        subCategory: '',
        stock: 0,
        purchasePrice: 0,
        price: 0,
    });

    const handleAddProduct = () => {
        if (!product.barcode || !product.name || !product.category) {
            alert("Barkod ürün adı ve kategori zorunludur!");
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

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCancel = () => {
        navigate('/products');
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setProduct({ ...product, category: selectedCategoryId, subCategory: "" });

        // Seçilen kategoriye ait alt kategorileri filtrele
        const selectedCategory = categories.find(
            (category) => category.id === selectedCategoryId
        );

        if (selectedCategory && selectedCategory.subCategories.length > 0) {
            setSubCategories(selectedCategory.subCategories);
            setNoSubCategories(false); // Alt kategoriler varsa, "Alt kategori yok" mesajını kaldır
        } else {
            setSubCategories([]);
            setNoSubCategories(true); // Alt kategori yoksa, "Alt kategori yok" mesajını göster
        }
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
                <h2 className="text-xl mb-4 font-bold">Ürün Ekle</h2>
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
                    <select
                        value={product.category}
                        onChange={handleCategoryChange}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    >
                        <option value="">Kategori Seçiniz</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <label className="block mb-2">Alt Kategori:</label>
                    <select
                        value={product.subCategory}
                        onChange={(e) => setProduct({ ...product, subCategory: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                        disabled={noSubCategories} // Alt kategori yoksa seçimi disable et
                    >
                        <option value="">Alt Kategori Seçiniz</option>
                        {noSubCategories ? (
                            <option disabled>Alt Kategori Yok</option> // Alt kategori yoksa mesaj göster
                        ) : (
                            subCategories.map((subCategory) => (
                                <option key={subCategory.id} value={subCategory.id}>
                                    {subCategory}
                                </option>
                            ))
                        )}
                    </select>

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
            </div>
        </div>
    );
};

export default AddProduct;
