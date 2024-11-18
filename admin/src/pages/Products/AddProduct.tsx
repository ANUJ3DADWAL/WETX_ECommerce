import React from 'react';
import ProductForm from "../../components/ProductForm.tsx";
import {useAddProductMutation} from "../../apis/adminApi.ts";
import {Product} from "../../utils/types.ts";

const AddProduct: React.FC = () => {
    const [addProduct] = useAddProductMutation();

    const submitHandler = async (product: Product) => {
        const res = await addProduct(product);
        console.log(res.data);
    }

    return (
        <div>
            <ProductForm onSubmit={submitHandler} />
        </div>
    );
};
export default AddProduct;
