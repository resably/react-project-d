import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const Accounting = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Header title={"Muhasebe"} />
            </div>
        </div>

    );
}

export default Accounting;