import React from 'react';
import {useNavigate} from "react-router-dom";
import {OrderItemProps} from "../utils/types.ts";

const OrderItem: React.FC<OrderItemProps> = ({
                                                 order_date,
                                                 order_id,
                                                 order_items,
                                                 shipping_base_address,
                                                 shipping_city,
                                                 shipping_state,
                                                 status,
                                                 total_amount,
                                             }) => {
    const navigate = useNavigate();

    const capitalizeFirstLetter = (s: string) => {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg border overflow-hidden my-4">
            <div className="bg-neutral-800 text-white p-4 flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-semibold">Order ID: {order_id}</h2>
                    <p className="text-gray-300">Order Date: {new Date(order_date).toLocaleDateString()}</p>
                    <p className="text-gray-300">Status: {capitalizeFirstLetter(status)}</p>
                    <p className="text-gray-200 mt-2 font-semibold">Total: ₹ {total_amount}</p>
                </div>
                <button
                    onClick={() => navigate(`/order-details/${order_id}`)}
                    className={"border border-white hover:bg-white hover:text-black transition-ease-md px-6 py-3 rounded-lg"}
                >
                    Track Order
                </button>
            </div>

            {order_items.map((orderItem) => (
                <div className="p-4 flex" key={orderItem.product.product_id}>
                    <img
                        src={orderItem.product.image_url}
                        alt={orderItem.product.product_name}
                        className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold">{orderItem.product.product_name}</h3>
                        <p className="text-gray-600">{orderItem.product.description}</p>
                        <p className="text-gray-800 font-semibold">Price: ₹ {orderItem.price}</p>
                        <p className="text-gray-800 font-semibold">Quantity: {orderItem.quantity}</p>
                    </div>
                </div>
            ))}

            <div className="bg-gray-100 p-4">
                <h4 className="text-lg font-semibold">Shipping Address</h4>
                <p className="text-gray-600">{shipping_base_address}</p>
                <p className="text-gray-600">{shipping_city}, {shipping_state}</p>
            </div>
        </div>
    );
};

export default OrderItem;
