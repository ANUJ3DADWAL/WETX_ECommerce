import React, {useState} from 'react';
import useFormHandler from "../hooks/useFormHandler.tsx";
import {DeliveryDetails} from "../utils/types.ts";
import {useAddDeliveryDetailsMutation} from "../api/authApi.ts";
import {useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import RazorpayCheckout from "../services/RazorpayCheckout.tsx";
import Toast from "./Toast.tsx";

const DeliveryDetailsModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({isOpen, onClose}) => {
// const DeliveryDetailsModal: React.FC<{ isOpen: boolean }> = ({isOpen}) => {
    const {user} = useSelector((state: RootState) => state.user);
    const initialState: DeliveryDetails = {
        phone: user?.phone_number ?? '',
        base_address: user?.base_address ?? '',
        state: user?.state ?? '',
        city: user?.city ?? '',
    };
    const {formData, changeHandler} = useFormHandler<DeliveryDetails>(initialState);
    const [addDeliveryDetails] = useAddDeliveryDetailsMutation();
    const [isPaymentButtonDisabled, setIsPaymentButtonDisabled] = useState<boolean>(true);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!user) return;

        try {
            const response = await addDeliveryDetails({
                userId: user.user_id,
                deliveryDetails: formData
            }).unwrap();
            // console.log('Delivery details added successfully:', response);
            setToastMessage(response.message);
            setIsPaymentButtonDisabled(false);
        } catch (error) {
            console.error('Failed to add delivery details:', error);
        }
        // resetForm();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[28%]">
                <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="base_address"
                            value={formData.base_address}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mt-8 mb-4 flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full px-4 py-4 transition ease-in-out duration-300 bg-red-600 hover:bg-red-700 text-white rounded-lg mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full px-4 py-4 transition ease-in-out duration-300 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>


                    <RazorpayCheckout
                        isDisabled={isPaymentButtonDisabled}
                        otherClasses={"w-full"}
                    />
                </form>
            </div>

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)}/>}
        </div>
    );
};

export default DeliveryDetailsModal;
