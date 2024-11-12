import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {logout} from "../features/userSlice.ts";
import Search from "./Search.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, user} = useSelector((state: RootState) => state.user);

    return (
        <div className="w-full flex justify-between items-center h-20 bg-[#E5E5E5] py-8 px-16">
            <div className="text-3xl font-bold">
                <h1>WetX</h1>
            </div>

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
                              className="flex gap-3 items-center border rounded-lg py-2 px-6 border-slate-700">
                            <FontAwesomeIcon icon={faCartShopping}/> Cart
                        </Link>
                        <button
                            onClick={() => dispatch(logout())}
                            className="flex gap-3 items-center px-4 py-2 border border-slate-700 rounded-lg"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket}/> Logout
                        </button>
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
