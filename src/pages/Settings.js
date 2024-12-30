import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const Settings = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header title={"Ayarlar"} />
                <div className="p-6">
                    <h1>Ayarlar</h1>
                </div>
            </div>
        </div>
    );
}

export default Settings;