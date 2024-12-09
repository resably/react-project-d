import React from 'react';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';
import HomeGrid from '../components/homepage/HomeGrid';


const Home = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header title={"Dashboard"}/>

                
                {/* Main grid content */} 
                <HomeGrid />
            </div>
        </div>

    );
}

export default Home;
