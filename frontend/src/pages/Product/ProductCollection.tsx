import React from 'react';
import {useGetAllProductsQuery} from "../../api/productApi.ts";
import ProductCard from "../../components/ProductCard.tsx";
// import Filter from "../../components/Filter.tsx";
import Loading from "../../components/Loading.tsx";

const ProductCollection: React.FC = () => {
    const {data: products, isLoading} = useGetAllProductsQuery();
    console.log(products);
    const rating = {count: 101, stars: 5};

    if (isLoading || !products) return <Loading/>;

    return (
        <div className="w-full h-full px-12 py-6 min-h-[78vh]">
            <h1 className="text-3xl font-bold mt-4 mb-8">
                Our Products
            </h1>

            <div>
                <div className="flex flex-wrap gap-4">
                    {products.map(({product_id, product_name, image_url, price, category_id, category_name}) => (
                        <ProductCard
                            key={product_id}
                            productId={product_id}
                            productName={product_name}
                            imageUrl={image_url}
                            price={price}
                            categoryId={category_id}
                            categoryName={category_name}
                            rating={rating}
                        />
                    ))}
                </div>

                <div>
                    {/*<Filter/>*/}
                </div>
            </div>
        </div>
    );
};

export default ProductCollection;
