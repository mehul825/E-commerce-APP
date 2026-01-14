import { BASE_URL } from '../constants';
import { apiSlice } from './apiSlice';

const CATEGORIES_URL = '/api/categories';

export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => ({
                url: CATEGORIES_URL,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
