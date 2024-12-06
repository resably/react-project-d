import React from "react";
import { MdOutlineWarehouse, MdOutlineShoppingBag, MdOutlineShoppingCart, MdOutlineTrendingUp, MdOutlinePerson } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";

const HomeGrid = () => {
    const items = [
        { icon: <MdOutlineShoppingCart size={120} color="#F59E0B" />, label: "Satış Ekranı" },
        { icon: <GiMoneyStack size={120} color="#10B981" />, label: "Muhasebe" },
        { icon: <MdOutlineTrendingUp size={120} color="#3B82F6" />, label: "Analiz" },
        { icon: <MdOutlineShoppingBag size={120} color="#8B5CF6" />, label: "Ürünler" },
        { icon: <MdOutlineWarehouse size={120} color="#ED333A"/>, label: "Stoklar" },
        { icon: <MdOutlinePerson size={120} color="#EC4899" />, label: "Kullanıcı" },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="bg-gray-700 shadow-lg p-4 rounded-lg flex flex-col items-center"
                >
                    <div className="mb-4">{item.icon}</div>
                    <p className="text-lg">{item.label}</p>
                </div>
            ))}
        </div>
    );
};

export default HomeGrid;