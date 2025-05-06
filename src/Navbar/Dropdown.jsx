import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Logs, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export default function Example() {
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem("loginUser"));

    const clickToLogout = () => {
        localStorage.removeItem("loginUser");
        navigate("/login");
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                    <Logs />
                </MenuButton>
            </div>

            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                    {loggedInUser && (
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    href="/profile"
                                    className={`block px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                        }`}
                                >
                                    Profile
                                </a>
                            )}
                        </MenuItem>
                    )}

                    {loggedInUser && (
                        <MenuItem>
                            {({ active }) => (
                                <a
                                    href="/orders"
                                    className={`block px-4 py-2 text-sm ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                        }`}
                                >
                                    Order Details
                                </a>
                            )}
                        </MenuItem>
                    )}
                    <MenuItem>
                        {({ active }) => (
                            <button
                                onClick={() => {
                                    if (loggedInUser) {
                                        clickToLogout();
                                    } else {
                                        navigate("/login");
                                    }
                                }}
                                className={`w-full text-left flex items-center px-4 py-2 text-sm font-bold ${active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                                    } hover:text-red-600`}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                {loggedInUser ? "Logout" : "Login"}
                            </button>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}
