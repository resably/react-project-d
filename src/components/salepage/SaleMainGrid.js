import React from "react";
import { MdOutlineDescription, MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SaleMainGrid = () => {
    const navigate = useNavigate();

    const items = [
        { icon: <MdOutlineShoppingCart size={120} color="#F59E0B" />, label: "Satış Ekranı", path: "/sales/tosale" },
        { icon: <MdOutlineDescription size={120} color="#10B981" />, label: "Faturalar", path: "/sales/invoices" },
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

export default SaleMainGrid;