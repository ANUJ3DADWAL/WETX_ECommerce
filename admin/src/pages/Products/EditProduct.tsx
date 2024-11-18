import React from 'react';
import ProductForm from "../../components/ProductForm.tsx";
import {useGetProductByIdQuery, useUpdateProductMutation} from "../../apis/adminApi.ts";
import {Product} from "../../utils/types.ts";
import {useParams} from "react-router-dom";
import {data} from "autoprefixer";

const EditProduct: React.FC = () => {
    const {productId} = useParams();
    const [updateProduct] = useUpdateProductMutation();
    const {data: product} = useGetProductByIdQuery(productId ?? '', {skip: !productId});

    const submitHandler = async (product: Product) => {
        const res = await updateProduct(product);
        console.log(res.data);
    }

    if (!data) return <h1>Loading...</h1>;

    return (
        <div>
            <ProductForm onSubmit={submitHandler} initialProduct={product} />
        </div>
    );
};
export default EditProduct;
