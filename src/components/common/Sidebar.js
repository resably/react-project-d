import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/userSlice";
import {
  MdOutlineDashboard,
  MdOutlinePerson,
  MdOutlineShoppingBag,
  MdOutlineShoppingCart,
  MdOutlineTrendingUp,
  MdOutlineSettings,
  MdOutlineMenu,
} from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";

const SIDEBAR_ITEMS = [
  { name: "Dashboard", icon: MdOutlineDashboard, color: "#6366f1", href: "/" },
  { name: "Ürünler", icon: MdOutlineShoppingBag, color: "#8B5CF6", href: "/products" },
  { name: "Satış", icon: MdOutlineShoppingCart, color: "#F59E0B", href: "/orders" },
  { name: "Muhasebe", icon: GiMoneyStack, color: "#10B981", href: "/sales" },
  { name: "Analiz", icon: MdOutlineTrendingUp, color: "#3B82F6", href: "/analytics" },
  { name: "Kullanıcı", icon: MdOutlinePerson, color: "#EC4899", href: "/users" },
  { name: "Ayarlar", icon: MdOutlineSettings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const isSidebarOpen = useSelector((state) => state.user.isSidebarOpen);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-800">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <MdOutlineMenu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2 ${
                  location.pathname === item.href ? "bg-gray-700" : ""
                }`}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
