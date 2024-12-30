import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import ProductDetailsGrid from '../components/productspage/ProductDetailsGrid';

const ProductDetails = () => {

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Ürün Detayı"} />

                {/* Main grid content */}
                <ProductDetailsGrid />
            </div>
        </div>

    );
}

export default ProductDetails;
