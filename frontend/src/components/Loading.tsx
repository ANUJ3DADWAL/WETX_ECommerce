import React from 'react';

// <div className="flex space-x-2 justify-center items-center bg-white min-h-screen dark:invert">
//     <span className="sr-only">Loading...</span>
//     <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//     <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//     <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
// </div>

const Loading: React.FC<{ forContainer?: boolean }> = ({forContainer = false}) => {
    return (
        <div className={"flex space-x-2 justify-center items-center w-full " + (
            forContainer ? "h-[10rem]" : "h-[90vh]"
        )}>
            <span className="sr-only">Loading...</span>
            <div
                className={(forContainer ? "h-4 w-4" : "h-8 w-8") + " bg-gray-800 rounded-full animate-bounce [animation-delay:-0.3s]"}></div>
            <div
                className={(forContainer ? "h-4 w-4" : "h-8 w-8") + " bg-gray-800 rounded-full animate-bounce [animation-delay:-0.15s]"}></div>
            <div className={(forContainer ? "h-4 w-4" : "h-8 w-8") + " bg-gray-800 rounded-full animate-bounce"}></div>
        </div>
    );
};

export default Loading;
