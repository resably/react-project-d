import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/ProductsSlice';



const ProductDetailsGrid = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams(); // product id hook
    const { items: products } = useSelector((state) => state.products);

    const selectedProduct = products.find((product) => product.id === id);

    const formattedCreatedAtDate = new Date(selectedProduct.createdAt).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedCreatedAtTime = new Date(selectedProduct.createdAt).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const formattedUpdateDate = new Date(selectedProduct.lastUpdated).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedUpdateTime = new Date(selectedProduct.lastUpdated).toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const [product, setProduct] = useState({
        barcode: '',
        name: '',
        brand: '',
        category: '',
        stock: 0,
        purchasePrice: 0,
        price: 0,
    });

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
                createdAt: formattedCreatedAtDate + " " + formattedCreatedAtTime || '',
                lastUpdated: formattedUpdateDate + " " + formattedUpdateTime || '',
            });
        }
    }, [selectedProduct]);

    const handleDeleteProduct = (productId) => {
        const confirmDelete = window.confirm("Ürünü silmek istediğinize emin misiniz?");
        if (confirmDelete) {
            dispatch(deleteProduct(productId));
            navigate('/products');
        }
    };

    const handleEditRedirect = (productId) => {
        navigate(`/products/edit-product/${productId}`);
    };


    return (
        <div className="relative flex justify-center items-center flex-1 p-6">
            {/* Geri Dön Butonu */}
            <div className="absolute top-6 left-6 z-10 h-screen">
                <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Geri Dön
                </button>
            </div>

            {/* Ana İçerik */}
            <div className="flex flex-col lg:flex-row bg-gray-800 bg-opacity-90 rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full">
                {/* Ürün Görseli */}
                <div
                    className="lg:w-1/2 h-64 lg:h-auto bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.image || '/img/noimage.jpg'})` }}
                >
                    <div className="h-full w-full bg-black bg-opacity-30 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white drop-shadow-lg">{product.name}</h1>
                    </div>
                </div>

                {/* Ürün Bilgileri */}
                <div className="p-8 lg:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-200 mb-4 border-b border-gray-500 text-center">Ürün Detayları</h2>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Barkod */}
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Barkod:</p>
                                <p className="text-xl text-gray-100">{product.barcode}</p>
                            </div>

                            {/* Kategori */}
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Kategori:</p>
                                <p className="text-xl text-gray-100">{product.category}</p>
                            </div>

                            {/* Marka */}
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Marka:</p>
                                <p className="text-xl text-gray-100">{product.brand}</p>
                            </div>

                            {/* Stok */}
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Stok:</p>
                                <p className="text-xl text-gray-100">{product.stock}</p>
                            </div>

                            {/* Alış Fiyatı */}
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Alış Fiyatı:</p>
                                <p className="text-xl text-gray-100">{product.purchasePrice} TL</p>
                            </div>

                            {/* Satış Fiyatı */}
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Satış Fiyatı:</p>
                                <p className="text-2xl font-bold text-green-400">{product.price} TL</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Eklenme Tarihi:</p>
                                <p className="text-xl text-gray-100">{product.createdAt}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-400">Son Güncelleme:</p>
                                <p className="text-xl text-gray-100">{product.lastUpdated}</p>
                            </div>
                        </div>
                    </div>

                    {/* İşlem Butonları */}
                    <div className="mt-8 flex justify-center gap-6">
                        <button
                            className="bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition transform hover:scale-105"
                            onClick={() => handleDeleteProduct(selectedProduct.id)}
                        >
                            Sil
                        </button>
                        <button
                            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition transform hover:scale-105"
                            onClick={() => handleEditRedirect(selectedProduct.id)}
                        >
                            Düzenle
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProductDetailsGrid;
