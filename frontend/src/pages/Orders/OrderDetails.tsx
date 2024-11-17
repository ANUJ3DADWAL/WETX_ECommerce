import React from 'react';
import {useParams} from "react-router-dom";
import Loading from "../../components/Loading.tsx";

const OrderDetails: React.FC = () => {
    const {orderId} = useParams();

    const status = 'confirmed';
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

    const progressWidth = getProgressWidthFromStatus(status);

    if (!orderId) {
        return <Loading/>;
    }

    return (
        <div className={"min-h-[80vh] w-full flex flex-col gap-4 justify-center items-center"}>
            <div>
                Order Details
            </div>

            <div className={"flex flex-col gap-8 w-[90%] items-center"}>
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
                        style={{width: `${progressWidth}%`}}
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
