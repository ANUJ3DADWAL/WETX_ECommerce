import React, {useEffect, useState} from 'react';
import {ToastProps} from "../utils/types.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const Toast: React.FC<ToastProps> = ({message, duration = 3000, onClose}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration - 500);
        const closeTimer = setTimeout(onClose, duration);
        return () => {
            clearTimeout(timer);
            clearTimeout(closeTimer);
        };
    }, [duration, onClose]);

    return (
        <div
            className={`fixed bottom-4 right-4 bg-neutral-700 text-white border p-4 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <FontAwesomeIcon icon={faCheck} className={"me-2 text-green-500"}/> {message}
        </div>
    );
};

export default Toast;
