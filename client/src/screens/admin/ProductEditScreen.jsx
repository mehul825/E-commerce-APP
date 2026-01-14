import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice';
import FormContainer from '../../components/FormContainer';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage] = useUploadProductImageMutation(); // Need to implement upload endpoint later or use text input

    useEffect(() => {
        if (product) {
            setTitle(product.title);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category); // Assuming category is string ID or populated object name
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                title,
                price,
                image,
                brand,
                category,
                description,
                countInStock,
            }).unwrap();
            alert('Product Updated');
            navigate('/admin/productlist');
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3 flex items-center gap-1 text-gray-600 hover:text-primary mb-4">
                <ArrowLeft size={18} /> Go Back
            </Link>

            <FormContainer>
                <h1 className="text-2xl font-bold mb-6 text-center text-primary">Edit Product</h1>
                {loadingUpdate && <Loader2 className="animate-spin mb-2 mx-auto" />}

                {isLoading ? (
                    <Loader2 className="animate-spin text-primary mx-auto" size={32} />
                ) : error ? (
                    <div className="text-red-500">{error?.data?.message || 'Error'}</div>
                ) : (
                    <form onSubmit={submitHandler}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="Enter name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        {/* Simplified Image Input - Text URL */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Count In Stock</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="Enter stock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Category (ID)</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary"
                                placeholder="Enter category ID"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                            <textarea // Changed to textarea for multiline
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary min-h-[100px]"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                        >
                            Update
                        </button>
                    </form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
