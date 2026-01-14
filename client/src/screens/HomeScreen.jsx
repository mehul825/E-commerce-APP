import React from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { useGetCategoriesQuery } from '../slices/categoriesApiSlice';
import ProductCard from '../components/ProductCard';
import ProductCarousel from '../components/ProductCarousel';
import { Loader2 } from 'lucide-react';

import { useParams, useLocation } from 'react-router-dom';

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('');
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const keyword = sp.get('keyword') || '';
    const pageNumber = sp.get('pageNumber') || 1;

    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber, category: selectedCategory });
    const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery();

    return (
        <>
            {/* Banner Area */}
            {/* Banner Area */}
            <ProductCarousel />

            {/* Category Filter */}
            <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                    <span className="w-1 h-6 bg-secondary rounded-full"></span>
                    Shop by Category
                </h3>
                {loadingCategories ? (
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-32 h-10 bg-gray-200 animate-pulse rounded-full"></div>)}
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory('')}
                            className={`px-5 py-2 rounded-full font-medium transition-all ${selectedCategory === ''
                                ? 'bg-orange-600 text-white shadow-md transform scale-105'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                        >
                            All
                        </button>
                        {categories?.map((cat) => (
                            <button
                                key={cat._id}
                                onClick={() => setSelectedCategory(cat._id)}
                                className={`px-5 py-2 rounded-full font-medium transition-all ${selectedCategory === cat._id
                                    ? 'bg-orange-600 text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <span className="w-1 h-8 bg-orange-600 rounded-full"></span>
                Latest Products
            </h1>

            {isLoading ? (
                <div className="flex justify-center mt-20">
                    <Loader2 size={40} className="animate-spin text-orange-600" />
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded text-center">
                    {error?.data?.message || 'Error loading products'}
                </div>
            ) : (
                <>
                    {data.products.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded shadow-sm">
                            <p className="text-gray-500 text-lg">No products found for this category.</p>
                            <button onClick={() => setSelectedCategory('')} className="mt-4 text-orange-600 font-medium hover:underline">Clear Filter</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {data.products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default HomeScreen;
