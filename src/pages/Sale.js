import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import SaleMainGrid from '../components/salepage/SaleMainGrid';

const Sale = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Satış"} />


                {/* Main grid content */}
                <SaleMainGrid />
            </div>
        </div>

    );
}

export default Sale;