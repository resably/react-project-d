import React from "react";
import { MdOutlinePerson, MdOutlineSettings, MdOutlinePowerSettingsNew } from "react-icons/md";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

const Header = ({ title }) => {
    
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md text-gray-100">
            <div className="flex items-center justify-between px-8 py-5">
                {/* left */}
                <h1 className="text-2xl font-bold">{title}</h1>

                {/* right */}
                <div className="ml-auto flex items-center space-x-4">
                    <MdOutlinePerson size={24} />
                    <MdOutlineSettings size={24} />
                    <button>
                        <MdOutlinePowerSettingsNew size={24} onClick={handleLogout} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;