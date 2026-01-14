import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';
import { Loader2, Trash2, Edit, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const { data, isLoading, error, refetch } = useGetProductsQuery({ keyword: '', pageNumber: 1 });

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const navigate = useNavigate();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id);
                refetch();
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Create a new product?')) {
            try {
                const result = await createProduct();
                // Assuming createProduct returns the created product or message. 
                // Correct implementation typically returns the data.
                refetch();
                alert('Product Created');
            } catch (err) {
                alert(err?.data?.message || err.error);
            }
        }
    };

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <button
                    className="bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300 flex items-center gap-2"
                    onClick={createProductHandler}
                >
                    <Plus size={18} /> Create Product
                </button>
            </div>

            {loadingCreate && <Loader2 className="animate-spin mb-2" />}
            {loadingDelete && <Loader2 className="animate-spin mb-2" />}

            {isLoading ? (
                <Loader2 className="animate-spin text-primary" size={32} />
            ) : error ? (
                <div className="text-red-500">{error?.data?.message || error.error}</div>
            ) : (
                <div className="overflow-x-auto bg-white rounded shadow-sm">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NAME</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">PRICE</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">CATEGORY</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">BRAND</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product._id.substring(0, 10)}...</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.title}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${product.price}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.category}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.brand}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
                                        <Link to={`/admin/product/${product._id}/edit`} className="bg-gray-200 p-2 rounded hover:bg-gray-300">
                                            <Edit size={16} className="text-gray-700" />
                                        </Link>
                                        <button
                                            className="bg-red-100 p-2 rounded hover:bg-red-200"
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <Trash2 size={16} className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default ProductListScreen;
