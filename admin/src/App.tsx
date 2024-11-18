import React from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Auth/Login.tsx";
import Error404 from "./pages/Error/Error404.tsx";
import Products from "./pages/Products/Products.tsx";

const App:React.FC = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Login/>} />
                <Route path={'/dashboard'} element={<Products/>} />

                <Route path={'/*'} element={<Error404 />} />
            </Routes>
        </div>
    );
};
export default App;
