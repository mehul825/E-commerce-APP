import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex flex-col items-center">
            <Link to={`/product/${product._id}`} className="w-full flex justify-center h-48 mb-4">
                <img src={product.image} alt={product.title} className="max-h-full object-contain" />
            </Link>
            <div className="w-full text-center">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-gray-800 font-medium text-sm truncate hover:text-primary transition-colors" title={product.title}>
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center justify-center gap-1 mt-1">
                    <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <span className="font-bold">{product.rating}</span> <Star size={10} fill="white" />
                    </div>
                    <span className="text-gray-500 text-xs">({product.numReviews})</span>
                </div>
                <div className="mt-2 text-lg font-bold text-gray-900">
                    ${product.price}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
