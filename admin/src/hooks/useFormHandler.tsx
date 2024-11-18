import React, {useState} from "react";

const useFormHandler = <T extends object>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const resetForm = () => {
        setFormData(initialState);
    };

    return {
        formData,
        setFormData,
        changeHandler,
        resetForm
    };
};
export default useFormHandler;
