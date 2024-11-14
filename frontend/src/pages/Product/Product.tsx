import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetProductByIdQuery} from "../../api/productApi.ts";
import Rating from "../../components/Rating.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {
    useAddToCartMutation,
    useCheckIfInCartByUserIdAndProductIdQuery
} from "../../api/cartApi.ts";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QuantityChanger from "../../components/QuantityChanger.tsx";
import Loading from "../../components/Loading.tsx";
import Toast from "../../components/Toast.tsx";

const Product: React.FC = () => {
    const {productId} = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(1);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const {isAuthenticated, user} = useSelector((state: RootState) => state.user);

    const {data: product, isLoading} = useGetProductByIdQuery(productId ?? '1');
    const [addToCart] = useAddToCartMutation();
    const rating = {count: 101, rate: 5};

    const {data: res, refetch} = useCheckIfInCartByUserIdAndProductIdQuery({
        userId: user?.user_id ?? '',
        productId: product?.product_id.toString() ?? ''
    }, {
        skip: !user?.user_id || !product?.product_id
    });

    if (isLoading || product === undefined) return <Loading/>;

    const handleAddToCart = async () => {
        if (!productId || !user) return;

        try {
            const {data} = await addToCart({product_id: productId, user_id: user.user_id, quantity: quantity});
            refetch();

            if (data) setToastMessage(data.message);
        } catch (e) {
            console.log("Error in adding to cart", e);
        }
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
                <img src={product.image_url} alt={product.product_name} className="h-3/4"/>
            </div>

            <div className="w-1/2 h-full my-auto p-8">
                <h1 className="text-5xl font-bold mt-10 mb-2">{product.product_name}</h1>

                <Rating count={rating.count} stars={rating.rate} otherClasses="mt-2 mb-6"/>

                <h3 className="text-3xl font-semibold my-6">₹ {product.price}</h3>

                <h4 className="my-6">
                    <span className="font-medium mb-2">Category:</span> {product.category_name}
                </h4>

                <div>
                    <h4 className="text-lg font-medium mb-2">Description</h4>
                    <p>{product.description}</p>
                </div>

                {
                    product.stock_quantity > 0 ? (
                        <div className="flex items-center gap-4 mb-4 mt-8">
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
                        <>
                            {res?.found ? (
                                <button
                                    onClick={() => navigate('/cart')}
                                    className="w-1/2 mt-10 flex justify-center items-center gap-4 bg-black hover:bg-black/80 hover:shadow-lg ease-in-out transition duration-300 text-white rounded-lg py-4 px-24"
                                >
                                    <FontAwesomeIcon icon={faCartShopping}/>
                                    Go to Cart
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    className="w-1/2 mt-10 flex justify-center items-center gap-4 bg-black hover:bg-black/80 hover:shadow-lg ease-in-out transition duration-300 text-white rounded-lg py-4 px-24"
                                >
                                    <FontAwesomeIcon icon={faCartShopping}/>
                                    Add to Cart
                                </button>
                            )}
                        </>
                    ) : (
                        <span className={"text-red-500 font-medium"}>
                            Login/Signup for making a purchase
                        </span>
                    )}
                </div>
            </div>

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)}/>}
        </div>
    );
};

export default Product;
