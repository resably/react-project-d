import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, fetchCategories } from '../redux/ProductsSlice';

const EditProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams(); // Düzenlenecek ürünün ID'sini URL'den al
    const { items: products } = useSelector((state) => state.products);
    const [subCategories, setSubCategories] = useState([]);
    const [noSubCategories, setNoSubCategories] = useState(false);
    const { categories } = useSelector((state) => state.products);

    // Seçilen ürünü ID'ye göre bul
    const selectedProduct = products.find((product) => product.id === id);

    const [product, setProduct] = useState({
        barcode: '',
        name: '',
        brand: '',
        category: '',
        subCategory: '',
        stock: 0,
        purchasePrice: 0,
        price: 0,
        lastUpdated: new Date().toISOString(),
    });

    // Ürün bilgilerini form state'ine yükle
    useEffect(() => {
        if (selectedProduct) {
            setProduct({
                barcode: selectedProduct.barcode || '',
                name: selectedProduct.name || '',
                brand: selectedProduct.brand || '',
                category: selectedProduct.category || '',
                stock: selectedProduct.stock || 0,
                purchasePrice: selectedProduct.purchasePrice || 0,
                price: selectedProduct.price || 0,
                lastUpdated: new Date().toISOString(),
            });
        }
    }, [selectedProduct]);

    const handleUpdateProduct = () => {
        if (!product.name) {
            alert('Ürün adı zorunludur!');
            return;
        }

        // Redux ile güncelleme işlemini tetikle
        dispatch(updateProduct({ id, updatedProduct: product }));
        alert('Ürün başarıyla güncellendi!');
        navigate(-1); // Güncelleme sonrası ürün listesine dön
    };

    const handleCancel = () => {
        navigate(-1); // İptal edilirse ürün listesine dön
    };

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

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
                <h2 className="text-xl mb-4 font-bold">Ürün Düzenle</h2>
                <div>
                    <label className="block mb-2">Ürün Barkodu:</label>
                    <input
                        type="text"
                        value={product.barcode}
                        onChange={(e) => setProduct({ ...product, barcode: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Ürün Adı:</label>
                    <input
                        type="text"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Marka:</label>
                    <input
                        type="text"
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
                        value={product.stock}
                        onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Alış Fiyatı:</label>
                    <input
                        type="number"
                        value={product.purchasePrice}
                        onChange={(e) => setProduct({ ...product, purchasePrice: parseFloat(e.target.value) })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <label className="block mb-2">Satış Fiyatı:</label>
                    <input
                        type="number"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                        className="w-full p-2 mb-4 rounded bg-gray-600 text-gray-100"
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleUpdateProduct}
                            className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                        >
                            Güncelle
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-1/2 bg-red-500 text-white p-2 rounded ml-4 hover:bg-red-600 transition"
                        >
                            İptal
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
