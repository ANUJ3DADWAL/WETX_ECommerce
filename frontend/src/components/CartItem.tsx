// import React, {useEffect, useState} from 'react';
// import {useGetProductByIdQuery} from "../api/productApi.ts";
// import QuantityChanger from "./QuantityChanger.tsx";
// import {faCheck, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {useRemoveFromCartMutation, useUpdateCartItemQuantityMutation} from "../api/cartApi.ts";
// import {CartItemProps} from "../utils/types.ts";
// import Rating from "./Rating.tsx";
// import Loading from "./Loading.tsx";
// import {useNavigate} from "react-router-dom";
//
// const CartItem: React.FC<CartItemProps> = ({userId, productId, quantity}) => {
//     const navigate = useNavigate();
//
//     const {data: product} = useGetProductByIdQuery(productId);
//     const [prodQuantity, setProdQuantity] = useState<number>(quantity);
//     const [isEditing, setIsEditing] = useState<boolean>(false);
//     const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
//     const [removeFromCart] = useRemoveFromCartMutation();
//
//     useEffect(() => {
//         const requestHandler = async () => {
//             if (quantity !== prodQuantity) {
//                 return await updateCartItemQuantity({
//                     product_id: productId,
//                     user_id: userId,
//                     quantity: prodQuantity
//                 }).unwrap();
//             }
//         };
//
//         requestHandler()
//             .then((res) => {
//                 if (res && res.cart) {
//                     console.log(res);
//                     setProdQuantity(res.cart.quantity);
//                 }
//             })
//             .catch((e) => console.log(e));
//
//     }, [prodQuantity, userId, productId, updateCartItemQuantity, quantity]);
//
//     // useEffect(() => {
//     //     setTotalPrice((prev: number) =>
//     //         prev + Number.parseFloat(String((Number.parseFloat(product?.price) * prodQuantity) || '0'))
//     //     );
//     // }, [prodQuantity, product?.price, setTotalPrice]);
//
//     if (!product) {
//         return <Loading forContainer/>;
//     }
//
//     const increaseQuantity = () => {
//         if (prodQuantity === product.stock_quantity) return;
//
//         setProdQuantity(prev => prev + 1);
//     };
//
//     const decreaseQuantity = () => {
//         if (prodQuantity === 1) return;
//
//         setProdQuantity(prev => prev - 1);
//     };
//
//     const removeItem = async () => {
//         try {
//             await removeFromCart({user_id: userId, product_id: productId});
//             navigate(0);
//         } catch (e) {
//             console.log(e);
//         }
//     };
//
//     const rating = {count: 101, rate: 5};
//
//     return (
//         <div className="flex items-center gap-12 py-6 px-12 rounded-lg shadow-lg border lg:min-h-[12rem]">
//             <div>
//                 <img src={product.image_url} alt={product.product_name} className="w-48"/>
//             </div>
//
//             <div className="w-full flex justify-between items-center">
//                 <div>
//                     <h2 className="text-2xl font-bold">{product.product_name}</h2>
//                     <Rating count={rating.count} stars={rating.rate} type="md" otherClasses=" "/>
//                     <p>{product.description}</p>
//                 </div>
//
//                 <div className="flex flex-col gap-4 items-center h-full">
//                     {/*<h5 className="font-medium">Quantity</h5>*/}
//                     <QuantityChanger
//                         quantity={prodQuantity}
//                         increaseQuantity={increaseQuantity}
//                         decreaseQuantity={decreaseQuantity}
//                         disabled={!isEditing}
//                     />
//                 </div>
//
//                 <div className="h-full flex flex-col justify-between gap-2 w-1/6">
//                     {/*<QuantityChanger*/}
//                     {/*    quantity={prodQuantity}*/}
//                     {/*    increaseQuantity={increaseQuantity}*/}
//                     {/*    decreaseQuantity={decreaseQuantity}*/}
//                     {/*/>*/}
//                     <h3 className="mb-4 text-2xl font-bold text-gray-800 text-right">
//                         $ {(Number.parseFloat(product.price) * prodQuantity).toFixed(2)}
//                     </h3>
//
//                     <div className="flex items-center justify-between">
//                         <span className="text-gray-600">{isEditing ? "Save" : "Edit Quantity"}</span>
//                         <FontAwesomeIcon
//                             icon={isEditing ? faCheck : faPenToSquare}
//                             onClick={() => setIsEditing(prev => !prev)}
//                             className="text-white bg-green-600 hover:bg-green-700 p-3 w-fit rounded-lg cursor-pointer"
//                         />
//                     </div>
//
//                     <div className="flex items-center justify-between">
//                         {/*<span className="text-base text-gray-600">Edit</span>*/}
//                         {/*<FontAwesomeIcon*/}
//                         {/*    icon={faPenToSquare}*/}
//                         {/*    className="text-white bg-green-600 hover:bg-green-700 p-3 w-fit rounded-lg cursor-pointer"*/}
//                         {/*/>*/}
//                         <span className="text-base text-gray-600">Remove</span>
//                         <FontAwesomeIcon
//                             icon={faTrashCan}
//                             onClick={removeItem}
//                             className="text-white bg-red-500 hover:bg-red-600 p-3 w-fit rounded-lg cursor-pointer"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default CartItem;

// src/components/CartItem.tsx
import React, {useEffect, useState} from 'react';
import {useGetProductByIdQuery} from "../api/productApi.ts";
import QuantityChanger from "./QuantityChanger.tsx";
import {faCheck, faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRemoveFromCartMutation, useUpdateCartItemQuantityMutation} from "../api/cartApi.ts";
import {CartItemProps} from "../utils/types.ts";
import Rating from "./Rating.tsx";
import Loading from "./Loading.tsx";
import {useNavigate} from "react-router-dom";
import Toast from "./Toast.tsx";

const CartItem: React.FC<CartItemProps & { refetchCartItems: Function }> = ({
                                                                                userId,
                                                                                productId,
                                                                                quantity,
                                                                                refetchCartItems
                                                                            }) => {
    const navigate = useNavigate();

    const {data: product} = useGetProductByIdQuery(productId);
    const [prodQuantity, setProdQuantity] = useState<number>(quantity);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
    const [removeFromCart] = useRemoveFromCartMutation();

    useEffect(() => {
        const requestHandler = async () => {
            if (quantity !== prodQuantity) {
                await updateCartItemQuantity({
                    product_id: productId,
                    user_id: userId,
                    quantity: prodQuantity
                }).unwrap();

                refetchCartItems();
            }
        };

        requestHandler().catch((e) => console.log(e));
    }, [prodQuantity, userId, productId, updateCartItemQuantity, quantity, product?.price, refetchCartItems]);

    if (!product) {
        return <Loading forContainer/>;
    }

    const increaseQuantity = () => {
        if (prodQuantity === product.stock_quantity) return;
        setProdQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (prodQuantity === 1) return;
        setProdQuantity(prev => prev - 1);
    };

    const removeItem = async () => {
        try {
            const {data} = await removeFromCart({user_id: userId, product_id: productId});
            refetchCartItems();
            if (data) setToastMessage(data.message);
        } catch (e) {
            console.log(e);
        }
    };

    const rating = {count: 101, rate: 5};

    return (
        <div className="flex items-center gap-12 py-6 px-12 rounded-lg shadow-lg border lg:min-h-[12rem]">
            <div onClick={() => navigate(`/product/${productId}`)} className={"cursor-pointer"}>
                <img src={product.image_url} alt={product.product_name} className="w-48"/>
            </div>

            <div className="w-full grid grid-cols-[50%_20%_20%] gap-6 justify-between items-center">
                <div onClick={() => navigate(`/product/${productId}`)} className={"cursor-pointer"}>
                    <h2 className="text-2xl font-bold">{product.product_name}</h2>
                    <Rating count={rating.count} stars={rating.rate} type="md" otherClasses=" "/>
                    <p>{product.description}</p>
                </div>

                <div className="flex flex-col gap-4 items-center h-full justify-center">
                    <QuantityChanger
                        quantity={prodQuantity}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        disabled={!isEditing}
                    />
                </div>

                <div className="h-full w-full flex flex-col justify-between gap-2">
                    <h3 className="mb-4 text-2xl font-bold text-gray-800 text-right">
                        $ {(Number.parseFloat(product.price) * prodQuantity).toFixed(2)}
                    </h3>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-600">{isEditing ? "Save" : "Edit Quantity"}</span>
                        <FontAwesomeIcon
                            icon={isEditing ? faCheck : faPenToSquare}
                            onClick={() => setIsEditing(prev => !prev)}
                            className="text-white bg-green-600 hover:bg-green-700 p-3 w-fit rounded-lg cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-base text-gray-600">Remove</span>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            onClick={removeItem}
                            className="text-white bg-red-500 hover:bg-red-600 p-3 w-fit rounded-lg cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)}/>}
        </div>
    );
};
export default CartItem;
