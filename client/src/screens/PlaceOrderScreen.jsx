import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { Loader2 } from 'lucide-react';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: itemsPrice,
                shippingPrice: shippingPrice,
                taxPrice: taxPrice,
                totalPrice: totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <div className="bg-white p-6 rounded shadow-sm mb-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode},{' '}
                            {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow-sm mb-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded shadow-sm mb-4">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            <div className="space-y-4">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center border-b pb-4 last:border-b-0 last:pb-0">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded" />
                                        <div className="ml-4 flex-1">
                                            <Link to={`/product/${item._id}`} className="text-gray-800 font-medium hover:text-primary">
                                                {item.title}
                                            </Link>
                                        </div>
                                        <div className="text-gray-700">
                                            {item.qty} x ${item.price} = <span className="font-bold">${(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded shadow-sm border">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>${itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>${shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>${taxPrice}</span>
                        </div>
                        <div className="flex justify-between mb-4 border-t pt-2 font-bold text-lg">
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>

                        <button
                            type="button"
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition-colors disabled:bg-gray-300 flex justify-center items-center shadow-md"
                            disabled={cart.cartItems.length === 0 || isLoading}
                            onClick={placeOrderHandler}
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;
