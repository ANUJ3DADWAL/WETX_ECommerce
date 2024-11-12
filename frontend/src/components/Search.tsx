import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const Search: React.FC = () => {
    const searchHandler = () => {
    };

    return (
        <div className="border border-gray-500 rounded-lg flex items-center bg-white">
            <input type="text" placeholder="Search"
                   className="px-4 py-2 w-full outline-none border-none rounded-lg"/>
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={searchHandler}
                className="mx-2 cursor-pointer"
            />
        </div>
    );
};
export default Search;
