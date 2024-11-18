import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login.tsx";
import Error404 from "./pages/Error/Error404.tsx";
import Products from "./pages/Products/Products.tsx";
import AddProduct from "./pages/Products/AddProduct.tsx";
import EditProduct from "./pages/Products/EditProduct.tsx";
import Sidebar from "./components/SideBar.tsx";

const App:React.FC = () => {

    return (
        <div className="flex">
            <Sidebar/>
            <div className={`flex-1 bg-gray-100 ${"ml-64"} overflow-auto`}>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard" element={<Products/>}/>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/product/add" element={<AddProduct/>}/>
                    <Route path="/product/edit/:productId" element={<EditProduct/>}/>
                    <Route path="/*" element={<Error404/>}/>
                </Routes>
            </div>
        </div>
    );
};
export default App;
