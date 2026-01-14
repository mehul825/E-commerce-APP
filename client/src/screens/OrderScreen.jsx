import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const calculateItemsPrice = (items) => {
        return items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    }

    const successPaymentHandler = async () => {
        try {
            await payOrder({ orderId, details: { id: 'MOCK_PAYMENT_ID', status: 'COMPLETED', update_time: new Date().toISOString(), payer: { email_address: userInfo.email } } });
            refetch();
            alert('Payment Successful');
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    }

    const deliverOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            alert('Order Delivered');
        } catch (err) {
            alert(err?.data?.message || err.error);
        }
    }

    return isLoading ? (
        <div className="flex justify-center mt-20">
            <Loader2 size={40} className="animate-spin text-primary" />
        </div>
    ) : error ? (
        <div className="text-red-500 text-center">{error?.data?.message || 'Error loading order'}</div>
    ) : (
        <div className="flex flex-col md:flex-row gap-8 mt-8">
            <div className="md:w-2/3">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Order {order._id}</h1>

                <div className="bg-white p-6 rounded shadow-sm mb-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Shipping</h2>
                    <p className="mb-2">
                        <strong>Name: </strong> {order.user.name}
                    </p>
                    <p className="mb-2">
                        <strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-primary hover:underline">{order.user.email}</a>
                    </p>
                    <p className="mb-4">
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <div className="bg-green-100 text-green-700 p-2 rounded">Delivered on {order.deliveredAt.substring(0, 10)}</div>
                    ) : (
                        <div className="bg-red-100 text-red-700 p-2 rounded">Not Delivered</div>
                    )}
                </div>

                <div className="bg-white p-6 rounded shadow-sm mb-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Payment Method</h2>
                    <p className="mb-4">
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <div className="bg-green-100 text-green-700 p-2 rounded">Paid on {order.paidAt.substring(0, 10)}</div>
                    ) : (
                        <div className="bg-red-100 text-red-700 p-2 rounded">Not Paid</div>
                    )}
                </div>

                <div className="bg-white p-6 rounded shadow-sm mb-4">
                    <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Order Items</h2>
                    {order.orderItems.length === 0 ? (
                        <p>Order is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center border-b pb-4 last:border-b-0 last:pb-0">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded" />
                                    <div className="ml-4 flex-1">
                                        <Link to={`/product/${item.product}`} className="text-gray-800 font-medium hover:text-primary">
                                            {item.name}
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
                        <span>${calculateItemsPrice(order.orderItems)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>${order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Tax</span>
                        <span>${order.taxPrice}</span>
                    </div>
                    <div className="flex justify-between mb-4 border-t pt-2 font-bold text-lg">
                        <span>Total</span>
                        <span>${order.totalPrice}</span>
                    </div>

                    {!order.isPaid && (
                        <button
                            className="w-full bg-secondary text-white font-bold py-3 rounded hover:bg-orange-600 transition-colors mb-2"
                            onClick={successPaymentHandler}
                            disabled={loadingPay}
                        >
                            {loadingPay ? 'Processing...' : 'Pay Now (Mock)'}
                        </button>
                    )}

                    {loadingDeliver && <Loader2 className="animate-spin mx-auto" />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <button
                            className="w-full bg-slate-800 text-white font-bold py-3 rounded hover:bg-slate-700 transition-colors"
                            onClick={deliverOrderHandler}
                        >
                            Mark As Delivered
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
