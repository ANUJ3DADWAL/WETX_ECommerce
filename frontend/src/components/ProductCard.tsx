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
                                                 categoryId,
                                                 categoryName,
                                                 rating
                                             }) => {
    console.log(productId);
    console.log(categoryId);

    const navigate = useNavigate();

    return (
        <div className="w-56 rounded-md shadow p-4 cursor-pointer"
             onClick={() => navigate(`/product/${productId}`)}>
            {/*<Image url={image} altText={title}/>*/}
            <img src={image} alt={title} className="w-full"/>
            <h1>{title}</h1>
            <h4>{price}</h4>
            <h6>{categoryName}</h6>
            <div>
                <Rating count={rating.count} stars={rating.stars}/>
            </div>
        </div>
    );
};

export default ProductCard;
