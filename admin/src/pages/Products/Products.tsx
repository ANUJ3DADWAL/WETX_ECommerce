import React from 'react';
import { useGetAllProductsQuery, useDeleteProductMutation } from '../../apis/adminApi';
import { useNavigate } from 'react-router-dom';

const AdminProducts: React.FC = () => {
    const { data: products, error, isLoading } = useGetAllProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const navigate = useNavigate();

    const handleEdit = (productId: number) => {
        navigate(`/product/edit/${productId}`);
    };

    const handleDelete = async (productId: number) => {
        await deleteProduct(productId.toString());
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Products</h1>

            <div className={"w-full flex gap-4 my-6"}>
                <input type={"text"} className={"flex-grow border h-full focus:outline-none px-6 py-3"} placeholder={"Search Product"} />

                <button
                    onClick={() => navigate('/product/add')}
                    className={"px-6 py-3 bg-black text-white rounded-md"}
                >Add Product</button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Product Name</th>
                        <th className="py-2 px-4 border-b">Category</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products?.map((product) => (
                        <tr key={product.product_id}>
                            <td className="py-2 px-4 border-b">{product.product_name}</td>
                            <td className="py-2 px-4 border-b">{product.category_name}</td>
                            <td className="py-2 px-4 border-b">₹ {product.price}</td>
                            <td className="py-2 px-4 border-b">{product.stock_quantity}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(product.product_id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.product_id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
