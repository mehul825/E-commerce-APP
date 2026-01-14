import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import { Loader2, ArrowLeft, Star, ShoppingCart } from 'lucide-react';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    return (
        <>
            <Link className="btn btn-light my-3 flex items-center gap-1 text-gray-600 hover:text-primary mb-4" to="/">
                <ArrowLeft size={18} /> Go Back
            </Link>

            {isLoading ? (
                <div className="flex justify-center mt-20">
                    <Loader2 size={40} className="animate-spin text-primary" />
                </div>
            ) : error ? (
                <div className="text-red-500 text-center">{error?.data?.message || 'Error loading product'}</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image */}
                        <div className="flex justify-center bg-white p-4 rounded-sm">
                            <img src={product.image} alt={product.title} className="max-h-[500px] object-contain" />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
                                <p className="text-sm text-gray-500 mt-1">Brand: {product.brand}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-green-600 text-white text-sm px-2 py-0.5 rounded flex items-center gap-1">
                                    <span className="font-bold">{product.rating}</span> <Star size={12} fill="white" />
                                </div>
                                <span className="text-gray-500 text-sm">({product.numReviews} Reviews)</span>
                            </div>

                            <div className="text-3xl font-bold text-gray-900 my-2">
                                ${product.price}
                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Add to Cart Card */}
                            <div className="bg-white border text-gray-700 rounded shadow-sm p-4 w-full md:max-w-xs mt-4 sticky top-24 z-10">
                                <div className="flex justify-between border-b pb-2 mb-2">
                                    <span>Price:</span>
                                    <span className="font-bold text-xl text-gray-900">${product.price}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 mb-2">
                                    <span>Status:</span>
                                    <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {product.countInStock > 0 && (
                                    <div className="flex justify-between items-center mb-4">
                                        <span>Qty:</span>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                            className="border rounded p-1"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={addToCartHandler}
                                        className="w-full bg-yellow-500 text-white font-bold py-3 rounded hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
                                        disabled={product.countInStock === 0}
                                    >
                                        <ShoppingCart size={20} />
                                        {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                    {product.countInStock > 0 && (
                                        <button
                                            onClick={() => {
                                                dispatch(addToCart({ ...product, qty }));
                                                navigate('/login?redirect=/shipping');
                                            }}
                                            className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition-all transform hover:scale-105 shadow-md"
                                        >
                                            Buy Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section Placeholder */}
                    <div className="mt-12 bg-white p-6 rounded shadow-sm">
                        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                        {product.reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
                        <div className="space-y-4">
                            {product.reviews.map(review => (
                                <div key={review._id} className="border-b pb-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 w-fit">
                                            <span className="font-bold">{review.rating}</span> <Star size={10} fill="white" />
                                        </div>
                                        <span className="font-semibold">{review.name}</span>
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProductScreen;
