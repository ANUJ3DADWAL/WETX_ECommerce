import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import Error404 from "./pages/Error/Error404.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store.ts";
import {logout, setUser} from "./features/userSlice.ts";
import {useGetUserFromTokenMutation} from "./api/authApi.ts";
import ProductCollection from "./pages/Product/ProductCollection.tsx";
import Product from "./pages/Product/Product.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import About from "./pages/About.tsx";
import Footer from "./components/Footer.tsx";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const {user, token} = useSelector((state: RootState) => state.user);
    const [getUserFromToken] = useGetUserFromTokenMutation();

    useEffect(() => {
        const requestHandler = async (token: string) => {
            const response = await getUserFromToken(token);
            if (response.error) {
                throw new Error('Unauthorized');
            }
            return response.data;
        };

        if (token && !user) {
            requestHandler(token).then((response) => {
                if (response.valid) {
                    console.log(response);
                    dispatch(setUser(response.user));
                } else {
                    dispatch(logout());
                }
            }).catch((e) => {
                console.log("Error while fetching user details from token: ", e.message);
                dispatch(logout());
            });
        }
    }, [token, user, dispatch, getUserFromToken]);

    return (
        // <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center font-bold text-3xl">App</div>
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth/*" element={<Auth/>}/>
                <Route path="/products" element={<ProductCollection/>}/>
                <Route path="/product/:productId" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/about" element={<About/>}/>

                <Route path="*" element={<Error404/>}/>
            </Routes>
            <Footer/>
        </div>
    );
};

export default App;
