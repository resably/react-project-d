import React from "react";
import { MdOutlineDescription, MdAddShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PurchaseMainGrid = () => {
    const navigate = useNavigate();

    const items = [
        { icon: <MdAddShoppingCart size={120} color="#EF4444" />, label: "Alış Ekranı", path: "/purchases/topurchase" },
        { icon: <MdOutlineDescription size={120} color="#10B981" />, label: "Faturalar", path: "/purchases/invoices" },
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {items.map((item, index) => (
                <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    className="bg-gray-700 shadow-lg p-4 rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-600 transition border border-gray-500 focus:ring focus:ring-gray-400 focus:outline-none"
                >
                    <div className="mb-4">{item.icon}</div>
                    <p className="text-lg font-semibold text-white">{item.label}</p>
                </button>
            ))}
        </div>
    );
};

export default PurchaseMainGrid;