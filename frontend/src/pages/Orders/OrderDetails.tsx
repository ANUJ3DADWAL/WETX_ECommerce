import React from 'react';
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading.tsx";
import {useGetOrderByIdQuery} from "../../api/orderApi.ts";

const OrderDetails: React.FC = () => {
    const {orderId} = useParams();
    const {data: order, isLoading} = useGetOrderByIdQuery(orderId ?? '', {
        skip: !orderId,
    });

    console.log(order);

    // const status = 'confirmed';
    // const status = 'dispatched';
    // const status = 'out-for-delivery';
    // const status = 'delivered';

    const getProgressWidthFromStatus = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 0;
            case 'dispatched':
                return 34;
            case 'out-for-delivery':
                return 67;
            case 'delivered':
                return 99.5;
            default:
                return 0;
        }
    };

    const progressWidth = getProgressWidthFromStatus(order?.status ?? 'confirmed');

    if (!orderId || isLoading) {
        return <Loading/>;
    }

    const capitalizeFirstLetter = (s: string) => {
        if (!s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    return (
        <div className={"min-h-[80vh] w-full flex flex-col gap-4 justify-center items-center px-14 py-10"}>
            <div className="border shadow-md rounded-lg max-w-5xl w-full overflow-hidden">
                <h2 className="text-3xl p-8 bg-black text-white font-semibold border-b">Order Details</h2>
                <div className={"px-6 py-4 grid grid-cols-2"}>
                    <div className="mb-4">
                        <p><strong>Order ID:</strong> {order.order_id}</p>
                        <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> {capitalizeFirstLetter(order.status)}</p>
                        <p><strong>Total Amount:</strong> ₹ {order.total_amount}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Shipping Address</h3>
                        <p>{order.shipping_base_address}</p>
                        <p>{order.shipping_city}, {order.shipping_state}</p>
                    </div>
                </div>
                <div className={"px-6 pb-4"}>
                    <h3 className="text-xl font-semibold mb-2">Order Items</h3>
                    <div className={"grid grid-cols-2 gap-4"}>
                        {order.order_items.map((item) => (
                            <div key={item.order_item_id} className="mb-4 p-4 border rounded-lg">
                                <div className="flex items-center">
                                    <img
                                        src={item.product.image_url}
                                        alt={item.product.product_name}
                                        className="w-24 h-24 object-cover rounded-lg mr-4"
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">{item.product.product_name}</h4>
                                        <p><strong>Price:</strong> ₹ {item.price}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <h2 className={"text-3xl mt-14 mb-8 font-bold"}>Track Your Order</h2>

            <div className={"flex flex-col gap-8 w-[90%] mb-28 items-center"}>
                <div className={"grid grid-cols-4 gap-8 items-end justify-center"}>
                    <div className={"h-full"}>
                        <img
                            src={"/order-confirmed.webp"}
                            alt={"Order Confirmed"}
                            className={"h-56"}
                        />
                    </div>

                    <div>
                        <img
                            src={"/order-dispatched.webp"}
                            alt={"Order Dispatched"}
                            className={"h-56"}
                        />
                    </div>

                    <div>
                        <img
                            src={"/out-for-delivery.webp"}
                            alt={"Out for Delivery"}
                            className={"h-56"}
                        />
                    </div>

                    <div>
                        <img
                            src={"/order-delivered.avif"}
                            alt={"Order Delivered"}
                            className={"h-56"}
                        />
                    </div>
                </div>

                <div className={"relative w-[75%] h-2 bg-gray-200 rounded-full"}>
                    <div
                        className={"absolute h-full bg-blue-500 rounded-full"}
                        style={{width: `₹ {progressWidth}%`}}
                    ></div>
                    <div
                        className={"absolute top-[-5px] left-0 w-4 h-4 rounded-full bg-blue-600 border border-white"}></div>
                    <div
                        className={"absolute top-[-5px] left-[33%] w-4 h-4 rounded-full " + (progressWidth >= 34 ? "bg-blue-600 border border-white" : "bg-gray-200")}></div>
                    <div
                        className={"absolute top-[-5px] left-[66%] w-4 h-4 rounded-full " + (progressWidth >= 67 ? "bg-blue-600 border border-white" : "bg-gray-200")}></div>
                    <div
                        className={"absolute top-[-5px] right-0 w-4 h-4 rounded-full " + (progressWidth >= 99.5 ? "bg-blue-600 border border-white" : "bg-gray-200")}></div>
                </div>

                <div className={"grid grid-cols-4 w-full text-center font-medium"}>
                    <span>Confirmed</span>
                    <span>Dispatched</span>
                    <span>Out for Delivery</span>
                    <span>Delivered</span>
                </div>
            </div>
        </div>
    );
};
export default OrderDetails;
