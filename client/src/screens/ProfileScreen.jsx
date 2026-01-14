import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    return (
        <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="md:w-1/4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h2>
                <div className="bg-white p-6 rounded shadow-sm">
                    <p className="mb-2"><strong>Name:</strong> {userInfo.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {userInfo.email}</p>
                    {/* Add Update Profile Form Here if needed */}
                </div>
            </div>

            <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">My Orders</h2>
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
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DATE</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">TOTAL</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">PAID</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DELIVERED</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order._id.substring(0, 10)}...</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.createdAt.substring(0, 10)}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">${order.totalPrice}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {order.isPaid ? (
                                                <span className="text-green-600 font-bold">{order.paidAt.substring(0, 10)}</span>
                                            ) : (
                                                <X size={18} className="text-red-500" />
                                            )}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {order.isDelivered ? (
                                                <span className="text-green-600 font-bold">{order.deliveredAt.substring(0, 10)}</span>
                                            ) : (
                                                <X size={18} className="text-red-500" />
                                            )}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <Link to={`/order/${order._id}`} className="bg-primary text-white text-xs px-2 py-1 rounded hover:bg-blue-600">
                                                Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;
