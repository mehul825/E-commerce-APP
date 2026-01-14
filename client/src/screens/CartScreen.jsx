import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ArrowLeft } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-3/4">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <div className="bg-white p-6 rounded shadow-sm text-center">
                            <p className="text-gray-600 mb-4">Your cart is empty</p>
                            <Link to="/" className="text-primary hover:underline flex items-center justify-center gap-1">
                                <ArrowLeft size={16} /> Go Back
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded shadow-sm">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center border-b p-4 last:border-b-0">
                                    <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded" />
                                    <div className="ml-4 flex-1">
                                        <Link to={`/product/${item._id}`} className="text-gray-800 font-medium hover:text-primary">
                                            {item.title}
                                        </Link>
                                        <p className="text-gray-500 text-sm mt-1">{item.brand}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="font-bold text-gray-900">${item.price}</div>
                                        <select
                                            className="border rounded p-1"
                                            value={item.qty}
                                            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => removeFromCartHandler(item._id)}
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="md:w-1/4">
                    <div className="bg-white p-6 rounded shadow-sm border sticky top-24">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        <div className="text-2xl font-bold text-gray-900 mb-6">
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                        <button
                            type="button"
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition-all transform hover:scale-105 shadow-md disabled:bg-gray-300 disabled:scale-100 disabled:shadow-none mb-3"
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Buy Now
                        </button>
                        <Link
                            to="/"
                            className="w-full block text-center bg-gray-100 text-gray-700 font-bold py-3 rounded hover:bg-gray-200 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartScreen;
