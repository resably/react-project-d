import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import UserGrid from '../components/userpage/UserGrid';

// not used
const User = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Dashboard"}/>

                {/* Page content */}
                <UserGrid />
                
            </div>
        </div>

    );
}

export default User;