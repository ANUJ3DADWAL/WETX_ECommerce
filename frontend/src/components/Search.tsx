import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useSearchProductQuery} from "../api/productApi.ts";
import {ProductResponseBody} from "../utils/types.ts";
import {useNavigate} from "react-router-dom";

const SearchResultTile: React.FC<ProductResponseBody> = ({product_id, product_name, image_url}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/product/${product_id}`)}
            className="grid grid-cols-4 gap-4 items-center rounded-lg p-3 hover:bg-neutral-100 cursor-pointer"
        >
            <img src={image_url} alt={product_name} className="col-span-1"/>
            <h3 className="col-span-3">{product_name}</h3>
        </div>
    );
};

const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const {data: searchResults, refetch} = useSearchProductQuery(searchTerm, {skip: !searchTerm});
    const searchRef = useRef<HTMLDivElement>(null);

    const searchHandler = () => {
        if (searchTerm.trim() !== '') {
            refetch();
            setIsVisible(true);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

        if (!isVisible && searchTerm !== '') setIsVisible(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={"relative"} ref={searchRef}>
            <div className="border border-gray-500 rounded-lg flex items-center bg-white">
                <input type="text" placeholder="Search" value={searchTerm}
                       onChange={onChangeHandler}
                       className="px-4 py-2 w-full outline-none border-none rounded-lg"/>
                <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    onClick={searchHandler}
                    className="mx-2 cursor-pointer"
                />
            </div>

            {isVisible && (
                <div
                    className="absolute top-full left-0 w-full bg-white shadow-lg border rounded-lg flex flex-col gap-1 z-20">
                    {searchResults && searchTerm !== '' && (
                        searchResults.map((product, ind) => (
                            <div key={product.product_id}>
                                <SearchResultTile {...product} />
                                {(ind + 1 !== searchResults.length) && <hr className="my-0.5"/>}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};
export default Search;
