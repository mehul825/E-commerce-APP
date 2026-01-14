const products = [
    {
        "title": "Airpods Wireless Bluetooth Headphones",
        "image": "/images/airpods-wireless-bluetooth-headphones.jpg",
        "description": "Bluetooth technology lets you connect it with compatible devices wirelessly.",
        "brand": "Apple",
        "category": "Electronics",
        "price": 89.99,
        "countInStock": 10,
        "rating": 4.5,
        "numReviews": 12,
        "images": [
            "/images/airpods-wireless-bluetooth-headphones.jpg"
        ]
    },
    {
        "title": "iPhone 13 Pro 256GB Memory",
        "image": "/images/iphone-13-pro-256gb-memory.jpg",
        "description": "Introducing the iPhone 13 Pro. A transformative triple-camera system.",
        "brand": "Apple",
        "category": "Electronics",
        "price": 999.99,
        "countInStock": 7,
        "rating": 4.8,
        "numReviews": 8,
        "images": [
            "/images/iphone-13-pro-256gb-memory.jpg"
        ]
    },
    {
        "title": "Sony Playstation 5",
        "image": "/images/sony-playstation-5.jpg",
        "description": "Next-gen gaming console with ultra-high speed SSD.",
        "brand": "Sony",
        "category": "Electronics",
        "price": 499.99,
        "countInStock": 3,
        "rating": 5,
        "numReviews": 15,
        "images": [
            "/images/sony-playstation-5.jpg"
        ]
    },
    {
        "title": "Canon EOS R5 Camera",
        "image": "/images/canon-eos-r5-camera.jpg",
        "description": "Professional mirrorless camera for photography enthusiasts.",
        "brand": "Canon",
        "category": "Electronics",
        "price": 3899.99,
        "countInStock": 2,
        "rating": 4.9,
        "numReviews": 10,
        "images": [
            "/images/canon-eos-r5-camera.jpg"
        ]
    },
    {
        "title": "MacBook Pro 16-inch",
        "image": "/images/macbook-pro-16-inch.jpg",
        "description": "The most powerful MacBook Pro ever is here.",
        "brand": "Apple",
        "category": "Electronics",
        "price": 2499.99,
        "countInStock": 5,
        "rating": 4.8,
        "numReviews": 20,
        "images": [
            "/images/macbook-pro-16-inch.jpg"
        ]
    },
    {
        "title": "Samsung Galaxy S22 Ultra",
        "image": "/images/samsung-galaxy-s22-ultra.jpg",
        "description": "Break the rules of power and light with the S22 Ultra.",
        "brand": "Samsung",
        "category": "Electronics",
        "price": 1199.99,
        "countInStock": 10,
        "rating": 4.7,
        "numReviews": 18,
        "images": [
            "/images/samsung-galaxy-s22-ultra.jpg"
        ]
    },
    {
        "title": "Logitech MX Master 3S",
        "image": "/images/logitech-mx-master-3s.jpg",
        "description": "Performance wireless mouse with ultra-fast scrolling.",
        "brand": "Logitech",
        "category": "Electronics",
        "price": 99.99,
        "countInStock": 25,
        "rating": 4.8,
        "numReviews": 45,
        "images": [
            "/images/logitech-mx-master-3s.jpg"
        ]
    },
    {
        "title": "Keychron K2 Mechanical Keyboard",
        "image": "/images/keychron-k2-mechanical-keyboard.jpg",
        "description": "Wireless mechanical keyboard for Mac and Windows.",
        "brand": "Keychron",
        "category": "Electronics",
        "price": 79.99,
        "countInStock": 15,
        "rating": 4.6,
        "numReviews": 30,
        "images": [
            "/images/keychron-k2-mechanical-keyboard.jpg"
        ]
    },
    {
        "title": "Bose QuietComfort 45",
        "image": "/images/bose-quietcomfort-45.jpg",
        "description": "Iconic noise cancelling headphones.",
        "brand": "Bose",
        "category": "Electronics",
        "price": 329.99,
        "countInStock": 8,
        "rating": 4.7,
        "numReviews": 25,
        "images": [
            "/images/bose-quietcomfort-45.jpg"
        ]
    },
    {
        "title": "GoPro Hero 10 Black",
        "image": "/images/gopro-hero-10-black.jpg",
        "description": "Incredible video stabilization and 5.3K video.",
        "brand": "GoPro",
        "category": "Electronics",
        "price": 399.99,
        "countInStock": 12,
        "rating": 4.5,
        "numReviews": 14,
        "images": [
            "/images/gopro-hero-10-black.jpg"
        ]
    },
    {
        "title": "Men's Classic White T-Shirt",
        "image": "/images/men-s-classic-white-t-shirt.jpg",
        "description": "Soft cotton t-shirt perfect for everyday wear.",
        "brand": "Uniqlo",
        "category": "Clothing",
        "price": 19.99,
        "countInStock": 50,
        "rating": 4.3,
        "numReviews": 20,
        "images": [
            "/images/men-s-classic-white-t-shirt.jpg"
        ]
    },
    {
        "title": "Women's Floral Summer Dress",
        "image": "/images/women-s-floral-summer-dress.jpg",
        "description": "Elegant floral dress for summer outings.",
        "brand": "H&M",
        "category": "Clothing",
        "price": 49.99,
        "countInStock": 20,
        "rating": 4.5,
        "numReviews": 15,
        "images": [
            "/images/women-s-floral-summer-dress.jpg"
        ]
    },
    {
        "title": "Blue Denim Jacket",
        "image": "/images/blue-denim-jacket.jpg",
        "description": "Classic denim jacket that never goes out of style.",
        "brand": "Levis",
        "category": "Clothing",
        "price": 89.99,
        "countInStock": 15,
        "rating": 4.7,
        "numReviews": 30,
        "images": [
            "/images/blue-denim-jacket.jpg"
        ]
    },
    {
        "title": "Men's Chino Pants",
        "image": "/images/men-s-chino-pants.jpg",
        "description": "Slim fit chino pants in beige.",
        "brand": "Zara",
        "category": "Clothing",
        "price": 45,
        "countInStock": 30,
        "rating": 4.2,
        "numReviews": 10,
        "images": [
            "/images/men-s-chino-pants.jpg"
        ]
    },
    {
        "title": "Running Shoes",
        "image": "/images/running-shoes.jpg",
        "description": "High performance running shoes in red.",
        "brand": "Nike",
        "category": "Clothing",
        "price": 120,
        "countInStock": 25,
        "rating": 4.8,
        "numReviews": 55,
        "images": [
            "/images/running-shoes.jpg"
        ]
    },
    {
        "title": "Leather Biker Jacket",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "description": "Genuine leather biker jacket for a rugged look.",
        "brand": "AllSaints",
        "category": "Clothing",
        "price": 350,
        "countInStock": 5,
        "rating": 4.9,
        "numReviews": 8,
        "images": [
            "/images/leather-biker-jacket.jpg"
        ]
    },
    {
        "title": "Oversized Hoodie",
        "image": "/images/oversized-hoodie.jpg",
        "description": "Cozy oversized hoodie in grey.",
        "brand": "Adidas",
        "category": "Clothing",
        "price": 65,
        "countInStock": 18,
        "rating": 4.6,
        "numReviews": 22,
        "images": [
            "/images/oversized-hoodie.jpg"
        ]
    },
    {
        "title": "Silk Scarf",
        "image": "/images/silk-scarf.jpg",
        "description": "Luxurious silk scarf with abstract print.",
        "brand": "Hermes",
        "category": "Clothing",
        "price": 150,
        "countInStock": 10,
        "rating": 4.5,
        "numReviews": 5,
        "images": [
            "/images/silk-scarf.jpg"
        ]
    },
    {
        "title": "Casual Sneakers",
        "image": "/images/casual-sneakers.jpg",
        "description": "White casual sneakers for everyday comfort.",
        "brand": "Convers",
        "category": "Clothing",
        "price": 55,
        "countInStock": 40,
        "rating": 4.4,
        "numReviews": 60,
        "images": [
            "/images/casual-sneakers.jpg"
        ]
    },
    {
        "title": "Beanie Hat",
        "image": "/images/beanie-hat.jpg",
        "description": "Warm knit beanie hat for winter.",
        "brand": "Carhartt",
        "category": "Clothing",
        "price": 25,
        "countInStock": 35,
        "rating": 4.7,
        "numReviews": 12,
        "images": [
            "/images/beanie-hat.jpg"
        ]
    },
    {
        "title": "Smart Coffee Maker",
        "image": "/images/smart-coffee-maker.jpg",
        "description": "Brew the perfect cup with smart app control.",
        "brand": "Nespresso",
        "category": "Home Appliances",
        "price": 199.99,
        "countInStock": 8,
        "rating": 4.8,
        "numReviews": 25,
        "images": [
            "/images/smart-coffee-maker.jpg"
        ]
    },
    {
        "title": "Robot Vacuum Cleaner",
        "image": "/images/robot-vacuum-cleaner.jpg",
        "description": "Automated cleaning for your entire home.",
        "brand": "Roomba",
        "category": "Home Appliances",
        "price": 349.99,
        "countInStock": 6,
        "rating": 4.6,
        "numReviews": 40,
        "images": [
            "/images/robot-vacuum-cleaner.jpg"
        ]
    },
    {
        "title": "Air Fryer XL",
        "image": "/images/air-fryer-xl.jpg",
        "description": "Cook healthy meals with less oil.",
        "brand": "Ninja",
        "category": "Home Appliances",
        "price": 129.99,
        "countInStock": 15,
        "rating": 4.7,
        "numReviews": 35,
        "images": [
            "/images/air-fryer-xl.jpg"
        ]
    },
    {
        "title": "Stand Mixer",
        "image": "/images/stand-mixer.jpg",
        "description": "Professional grade stand mixer for baking.",
        "brand": "KitchenAid",
        "category": "Home Appliances",
        "price": 399.99,
        "countInStock": 4,
        "rating": 4.9,
        "numReviews": 50,
        "images": [
            "/images/stand-mixer.jpg"
        ]
    },
    {
        "title": "Blender 5000",
        "image": "/images/blender-5000.jpg",
        "description": "Powerful blender for smoothies and soups.",
        "brand": "Vitamix",
        "category": "Home Appliances",
        "price": 449.99,
        "countInStock": 7,
        "rating": 4.8,
        "numReviews": 12,
        "images": [
            "/images/blender-5000.jpg"
        ]
    },
    {
        "title": "Smart Thermostat",
        "image": "/images/smart-thermostat.jpg",
        "description": "Save energy with intelligent heating control.",
        "brand": "Nest",
        "category": "Home Appliances",
        "price": 249.99,
        "countInStock": 20,
        "rating": 4.5,
        "numReviews": 18,
        "images": [
            "/images/smart-thermostat.jpg"
        ]
    },
    {
        "title": "Air Purifier",
        "image": "/images/air-purifier.jpg",
        "description": "Clean air for a healthy home environment.",
        "brand": "Dyson",
        "category": "Home Appliances",
        "price": 399.99,
        "countInStock": 10,
        "rating": 4.6,
        "numReviews": 22,
        "images": [
            "/images/air-purifier.jpg"
        ]
    },
    {
        "title": "Electric Kettle",
        "image": "/images/electric-kettle.jpg",
        "description": "Fast boiling kettle with temperature control.",
        "brand": "Smeg",
        "category": "Home Appliances",
        "price": 149.99,
        "countInStock": 12,
        "rating": 4.4,
        "numReviews": 15,
        "images": [
            "/images/electric-kettle.jpg"
        ]
    },
    {
        "title": "Toaster 4-Slice",
        "image": "/images/toaster-4-slice.jpg",
        "description": "Retro style 4-slice toaster.",
        "brand": "Smeg",
        "category": "Home Appliances",
        "price": 189.99,
        "countInStock": 8,
        "rating": 4.3,
        "numReviews": 10,
        "images": [
            "/images/toaster-4-slice.jpg"
        ]
    },
    {
        "title": "Cordless Vacuum",
        "image": "/images/cordless-vacuum.jpg",
        "description": "Lightweight cordless vacuum for quick cleanups.",
        "brand": "Dyson",
        "category": "Home Appliances",
        "price": 499.99,
        "countInStock": 15,
        "rating": 4.7,
        "numReviews": 28,
        "images": [
            "/images/cordless-vacuum.jpg"
        ]
    },
    {
        "title": "Luxury Face Cream",
        "image": "/images/luxury-face-cream.jpg",
        "description": "Rejuvenating face cream for glowing skin.",
        "brand": "La Mer",
        "category": "Beauty",
        "price": 175,
        "countInStock": 20,
        "rating": 4.8,
        "numReviews": 10,
        "images": [
            "/images/luxury-face-cream.jpg"
        ]
    },
    {
        "title": "Matte Lipstick Red",
        "image": "/images/matte-lipstick-red.jpg",
        "description": "Bold red matte lipstick, long wearing.",
        "brand": "MAC",
        "category": "Beauty",
        "price": 22,
        "countInStock": 50,
        "rating": 4.7,
        "numReviews": 45,
        "images": [
            "/images/matte-lipstick-red.jpg"
        ]
    },
    {
        "title": "Perfume Eau de Parfum",
        "image": "/images/perfume-eau-de-parfum.jpg",
        "description": "Floral scent with notes of jasmine and rose.",
        "brand": "Chanel",
        "category": "Beauty",
        "price": 135,
        "countInStock": 15,
        "rating": 4.9,
        "numReviews": 30,
        "images": [
            "/images/perfume-eau-de-parfum.jpg"
        ]
    },
    {
        "title": "Eyeshadow Palette",
        "image": "/images/eyeshadow-palette.jpg",
        "description": "Highly pigmented eyeshadow palette with 12 shades.",
        "brand": "Urban Decay",
        "category": "Beauty",
        "price": 54,
        "countInStock": 25,
        "rating": 4.6,
        "numReviews": 20,
        "images": [
            "/images/eyeshadow-palette.jpg"
        ]
    },
    {
        "title": "Facial Serum Vitamin C",
        "image": "/images/facial-serum-vitamin-c.jpg",
        "description": "Brightening serum for radiant skin.",
        "brand": "The Ordinary",
        "category": "Beauty",
        "price": 12.9,
        "countInStock": 40,
        "rating": 4.5,
        "numReviews": 60,
        "images": [
            "/images/facial-serum-vitamin-c.jpg"
        ]
    },
    {
        "title": "Makeup Brushes Set",
        "image": "/images/makeup-brushes-set.jpg",
        "description": "Professional 10-piece makeup brush set.",
        "brand": "Sigma",
        "category": "Beauty",
        "price": 89,
        "countInStock": 15,
        "rating": 4.8,
        "numReviews": 12,
        "images": [
            "/images/makeup-brushes-set.jpg"
        ]
    },
    {
        "title": "Hair Oil Treatment",
        "image": "/images/hair-oil-treatment.jpg",
        "description": "Nourishing oil for damaged hair.",
        "brand": "Olaplex",
        "category": "Beauty",
        "price": 28,
        "countInStock": 30,
        "rating": 4.7,
        "numReviews": 25,
        "images": [
            "/images/hair-oil-treatment.jpg"
        ]
    },
    {
        "title": "Nail Polish Set",
        "image": "/images/nail-polish-set.jpg",
        "description": "Set of 5 pastel nail polishes.",
        "brand": "Essie",
        "category": "Beauty",
        "price": 40,
        "countInStock": 20,
        "rating": 4.4,
        "numReviews": 18,
        "images": [
            "/images/nail-polish-set.jpg"
        ]
    },
    {
        "title": "Sunscreen SPF 50",
        "image": "/images/sunscreen-spf-50.jpg",
        "description": "Lightweight sunscreen for daily protection.",
        "brand": "Supergoop",
        "category": "Beauty",
        "price": 34,
        "countInStock": 45,
        "rating": 4.6,
        "numReviews": 35,
        "images": [
            "/images/sunscreen-spf-50.jpg"
        ]
    },
    {
        "title": "Bath Bombs Gift Set",
        "image": "/images/bath-bombs-gift-set.jpg",
        "description": "Relaxing bath bombs with essential oils.",
        "brand": "Lush",
        "category": "Beauty",
        "price": 29.99,
        "countInStock": 25,
        "rating": 4.9,
        "numReviews": 40,
        "images": [
            "/images/bath-bombs-gift-set.jpg"
        ]
    },
    {
        "title": "Building Blocks Set",
        "image": "/images/building-blocks-set.jpg",
        "description": "Creative building blocks for hours of fun.",
        "brand": "LEGO",
        "category": "Kids",
        "price": 59.99,
        "countInStock": 30,
        "rating": 4.9,
        "numReviews": 60,
        "images": [
            "/images/building-blocks-set.jpg"
        ]
    },
    {
        "title": "Teddy Bear Plush",
        "image": "/images/teddy-bear-plush.jpg",
        "description": "Soft and cuddly teddy bear.",
        "brand": "Gund",
        "category": "Kids",
        "price": 24.99,
        "countInStock": 40,
        "rating": 4.8,
        "numReviews": 35,
        "images": [
            "/images/teddy-bear-plush.jpg"
        ]
    },
    {
        "title": "Remote Control Car",
        "image": "/images/remote-control-car.jpg",
        "description": "Fast RC car for outdoor racing.",
        "brand": "Hot Wheels",
        "category": "Kids",
        "price": 39.99,
        "countInStock": 15,
        "rating": 4.5,
        "numReviews": 20,
        "images": [
            "/images/remote-control-car.jpg"
        ]
    },
    {
        "title": "Wooden Train Set",
        "image": "/images/wooden-train-set.jpg",
        "description": "Classic wooden train tracks and engines.",
        "brand": "Melissa & Doug",
        "category": "Kids",
        "price": 49.99,
        "countInStock": 12,
        "rating": 4.7,
        "numReviews": 18,
        "images": [
            "/images/wooden-train-set.jpg"
        ]
    },
    {
        "title": "Drawing Tablet for Kids",
        "image": "/images/drawing-tablet-for-kids.jpg",
        "description": "LCD writing tablet for drawing and doodles.",
        "brand": "Crayola",
        "category": "Kids",
        "price": 19.99,
        "countInStock": 25,
        "rating": 4.3,
        "numReviews": 30,
        "images": [
            "/images/drawing-tablet-for-kids.jpg"
        ]
    },
    {
        "title": "Doll House",
        "image": "/images/doll-house.jpg",
        "description": "Large wooden doll house with furniture.",
        "brand": "KidKraft",
        "category": "Kids",
        "price": 129.99,
        "countInStock": 5,
        "rating": 4.6,
        "numReviews": 12,
        "images": [
            "/images/doll-house.jpg"
        ]
    },
    {
        "title": "Board Game - Monopoly",
        "image": "/images/board-game---monopoly.jpg",
        "description": "Classic family board game.",
        "brand": "Hasbro",
        "category": "Kids",
        "price": 24.99,
        "countInStock": 30,
        "rating": 4.8,
        "numReviews": 100,
        "images": [
            "/images/board-game---monopoly.jpg"
        ]
    },
    {
        "title": "Kids Bicycle",
        "image": "/images/kids-bicycle.jpg",
        "description": "Durable bicycle with training wheels.",
        "brand": "Schwinn",
        "category": "Kids",
        "price": 119.99,
        "countInStock": 8,
        "rating": 4.5,
        "numReviews": 15,
        "images": [
            "/images/kids-bicycle.jpg"
        ]
    },
    {
        "title": "Science Kit",
        "image": "/images/science-kit.jpg",
        "description": "Educational science kit for experiments.",
        "brand": "National Geographic",
        "category": "Kids",
        "price": 29.99,
        "countInStock": 20,
        "rating": 4.7,
        "numReviews": 22,
        "images": [
            "/images/science-kit.jpg"
        ]
    },
    {
        "title": "Action Figure Hero",
        "image": "/images/action-figure-hero.jpg",
        "description": "Poseable action figure with accessories.",
        "brand": "Marvel",
        "category": "Kids",
        "price": 14.99,
        "countInStock": 50,
        "rating": 4.6,
        "numReviews": 40,
        "images": [
            "/images/action-figure-hero.jpg"
        ]
    }
];

module.exports = products;
