import React, { useEffect } from 'react';
import { Product} from "../utils/types.ts";
import useFormHandler from '../hooks/useFormHandler';

interface ProductFormProps {
    initialProduct?: Product;
    onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialProduct, onSubmit }) => {
    const { formData: product, changeHandler, resetForm, setFormData } = useFormHandler<Product>({
        product_id: initialProduct?.product_id || 0,
        category_id: initialProduct?.category_id || 0,
        product_name: initialProduct?.product_name || '',
        description: initialProduct?.description || '',
        price: initialProduct?.price || 0,
        stock_quantity: initialProduct?.stock_quantity || 0,
        image_url: initialProduct?.image_url || '',
        created_at: initialProduct?.created_at || new Date(),
        category_name: initialProduct?.category_name || '',
    });

    useEffect(() => {
        if (initialProduct) {
            setFormData(initialProduct);
        }
    }, [initialProduct, setFormData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(product);
        resetForm();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{initialProduct ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="product_name" className="block text-gray-700 font-bold mb-2">Product Name</label>
                        <input
                            type="text"
                            id="product_name"
                            name="product_name"
                            value={product.product_name}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category_name" className="block text-gray-700 font-bold mb-2">Category Name</label>
                        <input
                            type="text"
                            id="category_name"
                            name="category_name"
                            value={product.category_name}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock_quantity" className="block text-gray-700 font-bold mb-2">Stock Quantity</label>
                        <input
                            type="number"
                            id="stock_quantity"
                            name="stock_quantity"
                            value={product.stock_quantity}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image_url" className="block text-gray-700 font-bold mb-2">Image URL</label>
                        <input
                            type="text"
                            id="image_url"
                            name="image_url"
                            value={product.image_url}
                            onChange={changeHandler}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
                    >
                        {initialProduct ? 'Update Product' : 'Add Product'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
