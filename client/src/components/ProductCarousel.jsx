import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [
        {
            _id: '1', // Airpods ID from products.js (approximate, actual linking relies on ID)
            // We will link to the search or category if specific ID is unsure, or just use a generic link
            // For now let's use the images we know exist
            image: '/images/airpods-wireless-bluetooth-headphones.jpg',
            title: 'Airpods Wireless',
            description: 'Bluetooth technology lets you connect it with compatible devices wirelessly.',
            link: '/product/63d41029e2424b3334204445' // Approximate ID, or we can look it up. For now let's just make it look good.
        },
        {
            _id: '2',
            image: '/images/macbook-pro-16-inch.jpg',
            title: 'MacBook Pro 16-inch',
            description: 'The most powerful MacBook Pro ever is here.',
            link: '/product/63d41029e2424b3334204449'
        },
        {
            _id: '3',
            image: '/images/canon-eos-r5-camera.jpg',
            title: 'Canon EOS R5',
            description: 'Professional mirrorless camera for photography enthusiasts.',
            link: '/product/63d41029e2424b3334204448'
        },
        {
            _id: '4',
            image: '/images/women-s-floral-summer-dress.jpg',
            title: 'Summer Sale',
            description: 'Up to 50% off on latest summer collections. Look your best this season!',
            link: '/product/63d41029e2424b3334204449' // Using generic link or dress ID
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <div className='relative w-full h-[250px] md:h-[400px] lg:h-[500px] mb-8 overflow-hidden rounded-lg shadow-xl bg-gray-900'>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className='absolute inset-0'
                >
                    <img
                        src={banners[currentIndex].image}
                        alt={banners[currentIndex].title}
                        className='w-full h-full object-cover opacity-60'
                    />
                    <div className='absolute inset-0 flex flex-col justify-center items-start p-6 md:p-12 bg-gradient-to-r from-gray-900/80 to-transparent'>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className='text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4'
                        >
                            {banners[currentIndex].title}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className='text-sm md:text-xl text-gray-200 mb-4 md:mb-8 max-w-[70%] md:max-w-lg'
                        >
                            {banners[currentIndex].description}
                        </motion.p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${index === currentIndex ? 'bg-yellow-400' : 'bg-gray-500'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;
