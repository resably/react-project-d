import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import CustomerDetailsGrid from '../components/customerspage/CustomerDetailsGrid';

const CustomerDetails = () => {
    
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Dashboard"} />

                {/* Main grid content */}
                <CustomerDetailsGrid />
            </div>
        </div>

    );
}

export default CustomerDetails;