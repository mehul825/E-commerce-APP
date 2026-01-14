import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';
import { Loader2 } from 'lucide-react';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    };

    return (
        <FormContainer>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h1>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition duration-300 flex justify-center items-center shadow-md"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                </button>
            </form>

            <div className="mt-4 text-center">
                <span className="text-gray-600">New Customer? </span>
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary font-semibold hover:underline">
                    Register
                </Link>
            </div>
        </FormContainer>
    );
};

export default LoginScreen;
