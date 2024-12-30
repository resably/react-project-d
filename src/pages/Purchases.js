import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import PurchaseMainGrid from '../components/purchasepage/PurchaseMainGrid';

const Purchases = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Alış"} />


                {/* Main grid content */}
                <PurchaseMainGrid />
            </div>
        </div>

    );
}

export default Purchases;