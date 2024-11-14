// import React from 'react';

import Rating from "./Rating.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";
import {ProductState} from "../utils/types.ts";

const ProductCard: React.FC<ProductState> = ({
                                                 productId,
                                                 productName: title,
                                                 imageUrl: image,
                                                 price,
                                                 categoryName,
                                                 rating
                                             }) => {

    const navigate = useNavigate();

    return (
        <div
            className="rounded-md h-[27rem] shadow-lg border cursor-pointer hover:scale-105 transition ease-in-out duration-500"
            onClick={() => navigate(`/product/${productId}`)}
        >
            {/*<Image url={image} altText={title}/>*/}
            <img src={image} alt={title} className="w-full h-2/3 object-contain border-b object-center"/>
            <div className={"px-6 py-4"}>
                <h1 className={"font-bold text-lg"}>{title}</h1>
                <h4 className={"font-medium"}>₹ {price}</h4>
                <h6 className={"font-light text-gray-600 text-sm my-1"}>{categoryName}</h6>
                <div>
                    <Rating count={rating.count} stars={rating.stars}/>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
