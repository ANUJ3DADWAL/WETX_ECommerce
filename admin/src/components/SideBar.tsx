import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="h-screen w-64 bg-gray-800 text-white flex flex-col fixed">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Admin Dashboard
            </div>
            <nav className="flex-1 p-4">
                <ul>
                    <li className="mb-4">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            Products
                        </NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            Users
                        </NavLink>
                    </li>
                    <li className="mb-4">
                        <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                        >
                            Orders
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
