import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {logout} from "../features/userSlice.ts";
import Search from "./Search.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faCartShopping, faCircleUser, faRightFromBracket, faUser} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector((state: RootState) => state.user);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mouseEvent = (e: MouseEvent) => {
            if (dropdownOpen && componentRef.current &&
                !componentRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', mouseEvent);

        return () => {
            document.removeEventListener('mousedown', mouseEvent);
        };
    }, [dropdownOpen]);

    return (
        <div className="w-full flex justify-between items-center h-20 bg-[#E5E5E5] py-8 px-16">
            <div className="text-3xl font-bold">
                {/* I am not able to add logo properly showing very small */}
                <h1>WetX</h1>
            </div>
            
            {/* <div className="text-3xl font-bold">
    <img src="/images/wetx.png" alt="WetX Logo" style={{ width: '64px', height: '64px' }} />
</div> */}

            <div className="flex gap-20 items-center">
                <Link
                    className="text-slate-600 font-medium hover:text-slate-950 transition ease-in-out duration-500"
                    to="/">
                    Home
                </Link>
                <Link
                    className="text-slate-600 font-medium hover:text-slate-950 transition ease-in-out duration-500"
                    to="/products">
                    Products
                </Link>
                <Link
                    className="text-slate-600 font-medium hover:text-slate-950 transition ease-in-out duration-500"
                    to="/about">
                    About
                </Link>
            </div>

            <div className="flex justify-center items-center gap-5">
                <Search/>
                {isAuthenticated ? (
                    <>
                        <Link to="/cart"
                              className="flex gap-3 items-center border rounded-lg py-2 px-6 border-slate-700 hover:bg-slate-800 hover:text-white transition-ease-md">
                            <FontAwesomeIcon icon={faCartShopping}/> Cart
                        </Link>

                        {/*<button*/}
                        {/*    className={"hover:bg-neutral-400/40 p-1.5 rounded-lg transition ease-in-out duration-300 flex justify-center items-center"}>*/}
                        {/*    <FontAwesomeIcon className={"h-7 w-7"} icon={faCircleUser}/>*/}
                        {/*</button>*/}
                        <div
                            ref={componentRef}
                            className="relative z-50 font-medium"
                        >
                            <button
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="p-1.5 rounded-lg py-2 px-6 border border-slate-700 hover:bg-slate-800 hover:text-white transition-ease-md flex justify-center items-center gap-3">
                                <FontAwesomeIcon className="h-7 w-7" icon={faCircleUser}/>
                                {user?.first_name}
                            </button>
                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg flex flex-col gap-1 p-1">
                                    <Link to="/profile"
                                          onClick={() => setDropdownOpen(false)}
                                          className="px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg transition-ease-md flex gap-3 items-center">
                                        <FontAwesomeIcon icon={faUser}/> Profile
                                    </Link>

                                    <Link to="/orders"
                                          onClick={() => setDropdownOpen(false)}
                                          className="px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-lg transition-ease-md flex gap-3 items-center">
                                        <FontAwesomeIcon icon={faBox}/> My Orders
                                    </Link>

                                    <button
                                        onClick={() => {
                                            dispatch(logout());
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 flex items-center gap-3 rounded-lg transition-ease-md">
                                        <FontAwesomeIcon icon={faRightFromBracket}/> Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/*<button*/}
                        {/*    onClick={() => dispatch(logout())}*/}
                        {/*    className="flex gap-3 items-center px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition duration-300 ease-in-out"*/}
                        {/*>*/}
                        {/*    <FontAwesomeIcon icon={faRightFromBracket}/> Logout*/}
                        {/*</button>*/}
                    </>
                ) : (
                    <>
                        <Link to="/auth/login" className={"bg-black px-6 py-2 rounded-lg text-white"}>
                            Login
                        </Link>

                        <Link to="/auth/signup" className={"bg-black px-6 py-2 rounded-lg text-white"}>
                            Signup
                        </Link>
                    </>
                )}
                {/*<h1>{isAuthenticated && user ? user.first_name : "Guest"}</h1>*/}
            </div>
        </div>
    );
};

export default Navbar;
