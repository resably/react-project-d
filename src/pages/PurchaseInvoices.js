import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import PurchaseInvoicesGrid from '../components/purchasepage/PurchaseInvoicesGrid';

const PurchaseInvoices = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Alış Faturaları"} />

                {/* Main grid content */}
                <PurchaseInvoicesGrid />

            </div>
        </div>
    );
}

export default PurchaseInvoices;
