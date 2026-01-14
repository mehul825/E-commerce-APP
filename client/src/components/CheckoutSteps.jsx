import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <nav className="flex justify-center mb-8">
            <ol className="flex items-center w-full text-xs md:text-sm font-medium text-center text-gray-500">
                <li className={`flex items-center ${step1 ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
                    {step1 ? <Link to="/login">Sign In</Link> : <span className="cursor-not-allowed">Sign In</span>}
                    <span className="mx-2 text-gray-300">/</span>
                </li>
                <li className={`flex items-center ${step2 ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
                    {step2 ? <Link to="/shipping">Shipping</Link> : <span className="cursor-not-allowed">Shipping</span>}
                    <span className="mx-2 text-gray-300">/</span>
                </li>
                <li className={`flex items-center ${step3 ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
                    {step3 ? <Link to="/payment">Payment</Link> : <span className="cursor-not-allowed">Payment</span>}
                    <span className="mx-2 text-gray-300">/</span>
                </li>
                <li className={`flex items-center ${step4 ? 'text-orange-600 font-bold' : 'text-gray-400'}`}>
                    {step4 ? <Link to="/placeorder">Place Order</Link> : <span className="cursor-not-allowed">Place Order</span>}
                </li>
            </ol>
        </nav>
    );
};

export default CheckoutSteps;
