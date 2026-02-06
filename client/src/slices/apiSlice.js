import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

import products from '../data/products';

const baseQuery = async ({ url, method, body, params }) => {
    // Mock latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock Products API
    if (url.includes('/api/products')) {
        if (url.includes('/top')) {
            return { data: products.slice(0, 3) };
        }
        if (url.endsWith('/api/products') || url.includes('?')) {
            let filteredProducts = products;

            // Handle params passed from RTK Query
            if (params) {
                if (params.category) {
                    filteredProducts = filteredProducts.filter(p => p.category === params.category);
                }
                if (params.keyword) {
                    const keyword = params.keyword.toLowerCase();
                    filteredProducts = filteredProducts.filter(p =>
                        p.name.toLowerCase().includes(keyword) ||
                        p.description.toLowerCase().includes(keyword)
                    );
                }
            }

            return { data: { products: filteredProducts, page: 1, pages: 1 } };
        }
        // Get ID from URL
        const idParts = url.split('/');
        const id = idParts[idParts.length - 1];
        if (id) {
            const product = products.find((p) => p._id === id);
            if (product) return { data: product };
        }
    }

    // Mock Categories API
    if (url.includes('/api/categories')) {
        const categories = [...new Set(products.map((p) => p.category))].map((cat, index) => ({
            _id: index.toString(),
            name: cat
        }));
        return { data: categories };
    }

    // Mock Config API
    if (url.includes('/api/config/paypal')) {
        return { data: 'mock_paypal_id' };
    }

    // Mock Auth & Orders (Success/No-op)
    if (url.includes('/api/auth') || url.includes('/api/orders')) {
        // Return dummy user/success
        if (url.includes('login') || url.includes('register')) {
            return {
                data: {
                    _id: 'mock_user_id',
                    name: 'Demo User',
                    email: 'demo@example.com',
                    isAdmin: false,
                    token: 'mock_token'
                }
            };
        }
        return { data: { message: 'Success (Mock Mode)' } };
    }

    return { error: { status: 404, data: { message: 'Not Found' } } };
};

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: (builder) => ({}),
});
