// import React from 'react';

const Image = ({url, altText}) => {
    return (
        <div>
            <img src={url} alt={altText}/>
        </div>
    );
};
export default Image;
