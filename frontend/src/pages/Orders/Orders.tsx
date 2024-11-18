import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {useGetAllOrdersByUserIdQuery} from "../../api/orderApi.ts";
import Loading from "../../components/Loading.tsx";
import OrderItem from "../../components/OrderItem.tsx";
import {OrderItemProps} from "../../utils/types.ts";

const Orders: React.FC = () => {
    const {user} = useSelector((state: RootState) => state.user);

    const {data: orders, isLoading} = useGetAllOrdersByUserIdQuery(user?.user_id.toString() ?? '', {
        skip: !user?.user_id,
    });

    if (orders === undefined || isLoading) {
        return <Loading/>;
    }

    return (
        <>
            <h1 className="w-full text-4xl font-bold mb-8 flex justify-center items-center bg-black text-white py-24">
                My Orders
            </h1>
            <div className={"min-h-[80vh] w-full"}>
                {orders.length !== 0 ? (
                    orders.map((order: OrderItemProps, ind: number) => (
                        <OrderItem key={ind} {...order} />
                    ))
                ) : (
                    <div>No orders found</div>
                )}
            </div>
        </>
    );
};
export default Orders;
