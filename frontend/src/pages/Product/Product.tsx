import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "../../api/productApi.ts";
import Rating from "../../components/Rating.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {useAddToCartMutation} from "../../api/cartApi.ts";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QuantityChanger from "../../components/QuantityChanger.tsx";

const Product: React.FC = () => {
    const {productId} = useParams();
    console.log(productId);
    const [quantity, setQuantity] = useState(1);

    const {isAuthenticated, user} = useSelector((state: RootState) => state.user);

    const {data: product} = useGetProductByIdQuery(productId ?? '1');
    const [addToCart] = useAddToCartMutation();
    console.log(product);
    const rating = {count: 101, rate: 5};

    if (!product) return <h1>Loading ...</h1>;

    const handleAddToCart = async () => {
        if (!productId || !user) return;

        await addToCart({product_id: productId, user_id: user.user_id, quantity: quantity});
    };

    const increaseQuantity = () => {
        if (quantity === product.stock_quantity) return;

        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity === 1) return;

        setQuantity(prev => prev - 1);
    };

    return (
        <div className="w-full h-full flex justify-between min-h-[85vh]">
            <div className="w-1/2 p-8 flex justify-center items-center">
                {/*Product {productId}*/}
                <img src={product.image_url} alt={product.product_name} className="w-4/5"/>
            </div>

            <div className="w-1/2 h-full my-auto p-8">
                <h1 className="text-5xl font-bold mt-10 mb-2">{product.product_name}</h1>

                <Rating count={rating.count} stars={rating.rate} otherClasses="mt-2 mb-6"/>

                <h3 className="text-3xl font-semibold my-6">$ {product.price}</h3>

                <h4 className="my-6">
                    <span className="font-medium mb-2">Category:</span> {product.category_name}
                </h4>

                <div>
                    <h4 className="text-lg font-medium mb-2">Description</h4>
                    <p>{product.description}</p>
                </div>

                {
                    product.stock_quantity > 0 ? (
                        <div className="flex items-center gap-4 my-4">
                            <h3 className="font-medium">Quantity: </h3>

                            <QuantityChanger
                                quantity={quantity}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                            />
                        </div>
                    ) : (
                        <h3 className="font-bold my-4 text-xl text-red-500">Out of Stock</h3>
                    )
                }

                <div className={"mt-8"}>
                    {isAuthenticated ? (
                        <button
                            onClick={handleAddToCart}
                            className="w-1/2 mt-10 flex justify-center items-center gap-4 bg-black hover:bg-black/80 hover:shadow-lg ease-in-out transition duration-300 text-white rounded-lg py-4 px-24"
                        >
                            <FontAwesomeIcon icon={faCartShopping}/>
                            Add to Cart
                        </button>
                    ) : (
                        <span className={"text-red-500 font-medium"}>Login/Signup for making a purchase</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
