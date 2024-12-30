import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import SaleInvoicesGrid from '../components/salepage/SaleInvoicesGrid';

const SaleInvoices = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Satış Faturaları"} />
                
                {/* Main grid content */}
                <SaleInvoicesGrid />
            </div>
        </div>

    );
}

export default SaleInvoices;