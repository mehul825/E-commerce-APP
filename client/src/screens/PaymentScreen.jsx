import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-2xl font-bold mb-6 text-center text-orange-600">Payment Method</h1>
            <form onSubmit={submitHandler}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Method</label>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                className="form-radio text-primary focus:ring-primary h-4 w-4"
                                label="PayPal or Credit Card"
                                id="PayPal"
                                name="paymentMethod"
                                value="PayPal"
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label className="ml-2" htmlFor="PayPal">PayPal or Credit Card</label>
                        </div>
                        {/* Add Stripe or others here */}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition duration-300 shadow-md"
                >
                    Continue
                </button>
            </form>
        </FormContainer>
    );
};

export default PaymentScreen;
