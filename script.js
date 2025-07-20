document.addEventListener('DOMContentLoaded', () => {

    // --- STATE MANAGEMENT ---
    let state = {
        theme: 'light',
        page: 'home',
        selectedProductId: null,
        cart: [],
        trendingCarouselIndex: 0,
        products: [],
        filteredProducts: [],
    };

    // --- DATA ---
    const placeholderProducts = [
      // Apparel
      { id: 1, name: 'Aura T-Shirt', category: 'Apparel', price: 25.99, rating: 4.5, reviews: 120, images: ['https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A comfortable and stylish t-shirt made from 100% organic cotton. Perfect for everyday wear.', details: ['100% Organic Cotton', 'Regular Fit', 'Machine Washable'], isTrending: true },
      { id: 5, name: 'Vortex Hoodie', category: 'Apparel', price: 65.00, rating: 4.9, reviews: 310, images: ['https://images.pexels.com/photos/702350/pexels-photo-702350.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/3761336/pexels-photo-3761336.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A premium fleece hoodie that is incredibly soft and warm. Features a unique vortex-inspired design.', details: ['80% Cotton, 20% Polyester', 'Fleece Lined', 'Front Pouch Pocket'], isTrending: true },
      { id: 7, name: 'Classic Denim Shirt', category: 'Apparel', price: 49.99, rating: 4.6, reviews: 95, images: ['https://images.pexels.com/photos/3761118/pexels-photo-3761118.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/6764037/pexels-photo-6764037.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A timeless denim shirt for a rugged yet stylish look. Made with durable, high-quality denim.', details: ['100% Cotton Denim', 'Slim Fit', 'Button-down Collar'], isTrending: false },
      { id: 8, name: 'Urban Chino Pants', category: 'Apparel', price: 55.00, rating: 4.7, reviews: 110, images: ['https://images.pexels.com/photos/1007023/pexels-photo-1007023.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/2080960/pexels-photo-2080960.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Versatile chino pants that are perfect for both casual and semi-formal occasions.', details: ['98% Cotton, 2% Spandex', 'Tapered Fit', 'Four Pockets'], isTrending: true },
      { id: 9, name: 'Breeze Linen Shorts', category: 'Apparel', price: 34.50, rating: 4.4, reviews: 78, images: ['https://images.pexels.com/photos/4065137/pexels-photo-4065137.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Lightweight and breathable linen shorts, ideal for warm summer days.', details: ['100% Linen', 'Relaxed Fit', 'Drawstring Waist'], isTrending: false },
      
      // Footwear
      { id: 2, name: 'Nebula Sneakers', category: 'Footwear', price: 89.99, rating: 4.8, reviews: 250, images: ['https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Lightweight and breathable sneakers with a futuristic design. Provides excellent comfort and support.', details: ['Synthetic Mesh Upper', 'Cushioned Insole', 'Durable Rubber Outsole'], isTrending: true },
      { id: 10, name: 'Flex-Run Trainers', category: 'Footwear', price: 110.00, rating: 4.9, reviews: 180, images: ['https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'High-performance running shoes designed for maximum flexibility and support on any terrain.', details: ['Fly-Knit Upper', 'Responsive Foam Midsole', 'High-traction Outsole'], isTrending: false },

      // Accessories
      { id: 3, name: 'Chrono Watch', category: 'Accessories', price: 199.50, rating: 4.7, reviews: 85, images: ['https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A sleek and modern watch with a stainless steel case and sapphire crystal glass. Water-resistant up to 50m.', details: ['Stainless Steel Case', 'Sapphire Crystal', '50m Water Resistance'], isTrending: false },
      { id: 6, name: 'Echo Smart Glass', category: 'Accessories', price: 350.00, rating: 4.3, reviews: 45, images: ['https://images.pexels.com/photos/3945659/pexels-photo-3945659.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/7889396/pexels-photo-7889396.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Experience augmented reality with these stylish smart glasses. Connects to your phone for notifications and more.', details: ['Augmented Reality Display', 'Bluetooth Connectivity', '8-hour Battery Life'], isTrending: false },

      // Bags
      { id: 4, name: 'Pixel Backpack', category: 'Bags', price: 59.99, rating: 4.6, reviews: 150, images: ['https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/2440856/pexels-photo-2440856.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A durable and spacious backpack with multiple compartments, including a padded laptop sleeve.', details: ['Water-resistant Fabric', 'Padded Laptop Sleeve', '25L Capacity'], isTrending: true },

      // Electronics
      { id: 11, name: 'Zenith Ultrabook', category: 'Electronics', price: 1299.99, rating: 4.8, reviews: 210, images: ['https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A powerful and lightweight ultrabook with a stunning 4K display and all-day battery life.', details: ['13.3" 4K Touch Display', '16GB RAM, 1TB SSD', 'Intel Core i7'], isTrending: true },
      { id: 12, name: 'Rift Gaming Laptop', category: 'Electronics', price: 1999.00, rating: 4.9, reviews: 150, images: ['https://images.pexels.com/photos/3815750/pexels-photo-3815750.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Unleash your gaming potential with this top-of-the-line gaming laptop featuring a high-refresh-rate screen and a powerful GPU.', details: ['15.6" 144Hz Display', 'NVIDIA RTX 4070', 'RGB Backlit Keyboard'], isTrending: true },
      { id: 13, name: 'Aura Buds Pro', category: 'Electronics', price: 179.00, rating: 4.7, reviews: 350, images: ['https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Immersive sound with active noise cancellation. These wireless earbuds offer a premium listening experience.', details: ['Active Noise Cancellation', '24-hour Battery Life', 'Wireless Charging Case'], isTrending: true },
      { id: 14, name: 'Cinema 4K TV', category: 'Electronics', price: 899.00, rating: 4.6, reviews: 125, images: ['https://images.pexels.com/photos/5721865/pexels-photo-5721865.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Bring the movie theater home with this 65-inch 4K Smart TV, featuring vibrant colors and smart streaming capabilities.', details: ['65-inch QLED Display', 'Dolby Vision & Atmos', 'Smart TV with WebOS'], isTrending: false },
      { id: 15, name: 'Apex Gaming Desktop', category: 'Electronics', price: 2499.00, rating: 4.9, reviews: 90, images: ['https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A pre-built gaming desktop with extreme performance for professional gamers and creators.', details: ['Intel Core i9', 'NVIDIA RTX 4080', 'Liquid Cooling System'], isTrending: false },

      // Sportswear
      { id: 16, name: 'Active Performance Tee', category: 'Sportswear', price: 39.99, rating: 4.8, reviews: 130, images: ['https://images.pexels.com/photos/936039/pexels-photo-936039.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'A moisture-wicking performance t-shirt designed to keep you cool and dry during intense workouts.', details: ['Moisture-Wicking Fabric', 'Athletic Fit', 'Reflective Logos'], isTrending: true },
      { id: 17, name: 'Pro-Fit Gym Shorts', category: 'Sportswear', price: 45.00, rating: 4.7, reviews: 115, images: ['https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop', 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'], description: 'Durable and flexible gym shorts with a built-in liner for comfort and support.', details: ['4-Way Stretch Fabric', 'Zippered Pockets', '7-inch Inseam'], isTrending: false },
    ];
    state.products = placeholderProducts;
    state.filteredProducts = placeholderProducts;

    const categories = [
        { name: 'Apparel', icon: '👕', color: 'bg-purple-500' },
        { name: 'Footwear', icon: '👟', color: 'bg-pink-500' },
        { name: 'Accessories', icon: '⌚', color: 'bg-teal-500' },
        { name: 'Bags', icon: '🎒', color: 'bg-orange-500' },
        { name: 'Electronics', icon: '💻', color: 'bg-blue-500' },
        { name: 'Sportswear', icon: '🏃', color: 'bg-green-500' },
    ];

    // --- DOM Elements ---
    const headerContainer = document.getElementById('header-container');
    const mainContent = document.getElementById('main-content');
    
    // --- ICONS (as functions returning SVG strings) ---
    const ShoppingCartIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
    const SunIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`;
    const MoonIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>`;
    const ChevronLeftIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>`;
    const ChevronRightIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>`;
    const XIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;

    // --- RENDER FUNCTIONS ---
    
    /**
     * Main render function that orchestrates rendering of header and current page
     */
    const render = () => {
        renderHeader();
        renderPage();
    };

    /**
     * Renders the header component
     */
    const renderHeader = () => {
        const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        headerContainer.innerHTML = `
            <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-md transition-colors duration-300">
                <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center justify-between h-20">
                        <a href="#" data-page="home" class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                            AuraStore
                        </a>
                        <nav class="hidden md:flex items-center space-x-8">
                            <a href="#" data-page="home" class="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400 transition-colors duration-300 font-medium">Home</a>
                            <a href="#" data-page="products" class="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400 transition-colors duration-300 font-medium">Products</a>
                            <a href="#" data-page="contact" class="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400 transition-colors duration-300 font-medium">Contact</a>
                        </nav>
                        <div class="flex items-center space-x-4">
                            <a href="#" data-page="login" class="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400 transition-colors duration-300 font-medium hidden sm:block">Login</a>
                            <button id="theme-toggle" class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                                ${state.theme === 'light' ? MoonIcon() : SunIcon()}
                            </button>
                            <button data-page="cart" class="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
                                ${ShoppingCartIcon()}
                                ${cartItemCount > 0 ? `<span class="absolute top-0 right-0 block h-5 w-5 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">${cartItemCount}</span>` : ''}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    /**
     * Renders the current page based on the state
     */
    const renderPage = () => {
        mainContent.innerHTML = ''; // Clear previous content
        window.scrollTo(0, 0); // Scroll to top on page change
        switch (state.page) {
            case 'home':
                mainContent.innerHTML = renderHomePage();
                break;
            case 'products':
                mainContent.innerHTML = renderProductsPage();
                break;
            case 'productDetail':
                mainContent.innerHTML = renderProductDetailPage();
                break;
            case 'cart':
                mainContent.innerHTML = renderCartPage();
                break;
            case 'login':
                mainContent.innerHTML = renderLoginPage();
                break;
            case 'contact':
                mainContent.innerHTML = renderContactPage();
                break;
            default:
                mainContent.innerHTML = renderHomePage();
        }
    };

    const GlassCard = (content, className = '') => `<div class="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-2xl shadow-lg transition-all duration-300 ${className}">${content}</div>`;
    const AnimatedButton = (text, dataAttrs = '', className = '') => `<button ${dataAttrs} class="px-6 py-3 font-semibold text-white rounded-lg shadow-md transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}">${text}</button>`;
    
    /**
     * Generates HTML for the Home Page
     */
    const renderHomePage = () => {
        const trendingProducts = state.products.filter(p => p.isTrending);
        
        const categoriesHTML = categories.map((category, index) => `
            <div class="group relative overflow-hidden rounded-2xl shadow-lg transform transition-transform duration-500 hover:scale-105" style="animation-delay: ${index * 150}ms">
                <div class="absolute inset-0 ${category.color} transition-opacity duration-500 group-hover:opacity-80"></div>
                <div class="relative p-8 flex flex-col items-center justify-center h-48 text-white">
                    <span class="text-5xl mb-4 transition-transform duration-500 group-hover:scale-125">${category.icon}</span>
                    <h3 class="text-xl font-semibold">${category.name}</h3>
                </div>
            </div>
        `).join('');
        
        const trendingCarouselHTML = trendingProducts.map((product, index) => `
            <div class="carousel-item absolute w-full h-full transition-transform duration-700 ease-in-out" style="transform: translateX(${(index - state.trendingCarouselIndex) * 100}%)">
                ${GlassCard(`
                    <img src="${product.images[0]}" alt="${product.name}" class="w-full md:w-1/2 h-64 md:h-full object-cover rounded-xl shadow-md" />
                    <div class="text-center md:text-left">
                        <h3 class="text-2xl font-bold text-gray-800 dark:text-white">${product.name}</h3>
                        <p class="text-purple-600 dark:text-pink-400 font-semibold text-xl my-2">$${product.price}</p>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">${product.description.substring(0, 80)}...</p>
                        ${AnimatedButton('View Details', `data-action="view-product" data-product-id="${product.id}"`, 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105')}
                    </div>
                `, `w-11/12 md:w-3/4 lg:w-1/2 mx-auto h-full p-6 flex flex-col md:flex-row items-center gap-6 cursor-pointer`)}
            </div>
        `).join('');

        return `
            <div class="space-y-16 md:space-y-24 pb-16">
                <!-- Hero Banner -->
                <section class="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
                    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"></div>
                    <div class="absolute inset-0 bg-black/50"></div>
                    <div class="relative z-10 p-4">
                        <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 animate-fade-in-down">Mid-Season Sale is ON!</h1>
                        <p class="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-200 animate-fade-in-up">Get up to 40% off on the latest styles. Don't miss out!</p>
                        ${AnimatedButton('Shop the Sale', 'data-page="products"', 'bg-gradient-to-r from-pink-500 to-orange-400 hover:scale-105')}
                    </div>
                </section>

                <!-- Animated Product Categories -->
                <section class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Shop by Category</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">${categoriesHTML}</div>
                </section>

                <!-- Trending Items Carousel -->
                <section class="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">Trending Now</h2>
                    <div class="relative">
                        <div id="trending-carousel" class="overflow-hidden relative h-[450px]">${trendingCarouselHTML}</div>
                        <button data-action="prev-slide" class="absolute top-1/2 left-0 md:-left-4 transform -translate-y-1/2 p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">${ChevronLeftIcon()}</button>
                        <button data-action="next-slide" class="absolute top-1/2 right-0 md:-right-4 transform -translate-y-1/2 p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">${ChevronRightIcon()}</button>
                    </div>
                </section>
            </div>
        `;
    };

    /**
     * Generates HTML for the Products Page
     */
    const renderProductsPage = () => {
        const productsHTML = state.filteredProducts.map((product, index) => `
            <div class="group animate-fade-in" data-action="view-product" data-product-id="${product.id}" style="animation-delay: ${index * 50}ms">
                ${GlassCard(`
                    <div class="relative">
                        <img src="${product.images[0]}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-110" />
                        <div class="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">${product.category}</div>
                    </div>
                    <h3 class="text-xl font-bold text-gray-800 dark:text-white truncate">${product.name}</h3>
                    <div class="flex justify-between items-center mt-2">
                        <p class="text-lg font-semibold text-purple-600 dark:text-pink-400">$${product.price}</p>
                        <div class="flex items-center">
                            <span class="text-yellow-400">⭐</span>
                            <span class="ml-1 text-gray-600 dark:text-gray-300">${product.rating}</span>
                        </div>
                    </div>
                `, 'p-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2')}
            </div>
        `).join('');

        return `
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">Our Collection</h1>
                ${GlassCard(`
                    <div class="flex items-center gap-4">
                        <label for="filter" class="font-semibold text-gray-700 dark:text-gray-200">Filter:</label>
                        <select id="filter" class="bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="All">All Categories</option>
                            ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="flex items-center gap-4">
                        <label for="sort" class="font-semibold text-gray-700 dark:text-gray-200">Sort by:</label>
                        <select id="sort" class="bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option value="default">Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A-Z</option>
                        </select>
                    </div>
                `, 'p-4 mb-8 flex flex-col md:flex-row justify-between items-center gap-4')}
                <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    ${productsHTML}
                </div>
            </div>
        `;
    };

    /**
     * Generates HTML for the Product Detail Page
     */
    const renderProductDetailPage = () => {
        const product = state.products.find(p => p.id === state.selectedProductId);
        if (!product) return `<p class="text-center py-12">Product not found.</p>`;

        return `
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button data-page="products" class="mb-8 flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-pink-400 transition-colors">
                    ${ChevronLeftIcon()} Back to Products
                </button>
                ${GlassCard(`
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        <!-- Image Gallery -->
                        <div>
                            <div class="relative w-full h-[350px] md:h-[500px] overflow-hidden rounded-xl shadow-lg cursor-zoom-in group">
                                <img id="main-product-image" src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-300" />
                                <div id="zoom-box" class="absolute top-0 left-0 w-full h-full bg-no-repeat pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style="background-image: url(${product.images[0]}); background-size: 200%;"></div>
                            </div>
                            <div class="flex gap-4 mt-4">
                                ${product.images.map((img, index) => `
                                    <img src="${img}" alt="${product.name} thumbnail ${index + 1}" data-action="select-image" data-image-src="${img}" class="w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition-all ${index === 0 ? 'border-purple-500 scale-105' : 'border-transparent'}">
                                `).join('')}
                            </div>
                        </div>

                        <!-- Product Info -->
                        <div>
                            <h1 class="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">${product.name}</h1>
                            <div class="flex items-center gap-4 mb-4">
                                <div class="flex items-center">
                                    <span class="text-yellow-400">⭐</span>
                                    <span class="ml-1 text-gray-600 dark:text-gray-300">${product.rating} (${product.reviews} reviews)</span>
                                </div>
                                <span class="text-gray-400 dark:text-gray-500">|</span>
                                <span class="text-green-500 font-semibold">In Stock</span>
                            </div>
                            <p class="text-3xl font-bold text-purple-600 dark:text-pink-400 mb-6">$${product.price}</p>
                            <p class="text-gray-600 dark:text-gray-300 mb-6">${product.description}</p>
                            <div class="mb-8">
                                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Details:</h3>
                                <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                                    ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                                </ul>
                            </div>
                            ${AnimatedButton('Add to Cart', `data-action="add-to-cart" data-product-id="${product.id}"`, 'w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105')}
                        </div>
                    </div>
                `, 'p-6 md:p-8')}
                
                <!-- Reviews Section -->
                ${GlassCard(`
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Customer Reviews</h2>
                    <div class="space-y-6">
                        <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <div class="flex items-center mb-2"><p class="font-semibold text-gray-800 dark:text-white">Jane Doe</p><span class="text-yellow-400 ml-4">⭐⭐⭐⭐⭐</span></div>
                            <p class="text-gray-600 dark:text-gray-300">Absolutely love this! The quality is amazing and it looks even better in person.</p>
                        </div>
                        <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <div class="flex items-center mb-2"><p class="font-semibold text-gray-800 dark:text-white">John Smith</p><span class="text-yellow-400 ml-4">⭐⭐⭐⭐</span></div>
                            <p class="text-gray-600 dark:text-gray-300">Great product, fast shipping. A bit pricier than I'd like, but worth it.</p>
                        </div>
                    </div>
                `, 'p-6 md:p-8 mt-12')}
            </div>
        `;
    };

    /**
     * Generates HTML for the Cart Page
     */
     const renderCartPage = () => {
        if (state.cart.length === 0) {
            return `
                <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <div class="w-24 h-24 mx-auto text-gray-400 dark:text-gray-500">${ShoppingCartIcon()}</div>
                    <h1 class="text-3xl font-bold mt-4 text-gray-800 dark:text-white">Your Cart is Empty</h1>
                    <p class="text-gray-600 dark:text-gray-300 mt-2">Looks like you haven't added anything to your cart yet.</p>
                </div>
            `;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        const cartItemsHTML = state.cart.map(item => `
            ${GlassCard(`
                <img src="${item.images[0]}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg" />
                <div class="flex-grow">
                    <h3 class="font-bold text-lg text-gray-800 dark:text-white">${item.name}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${item.category}</p>
                    <p class="font-semibold text-purple-600 dark:text-pink-400 mt-1">$${item.price}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button data-action="update-quantity" data-product-id="${item.id}" data-change="-1" class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">-</button>
                    <span>${item.quantity}</span>
                    <button data-action="update-quantity" data-product-id="${item.id}" data-change="1" class="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">+</button>
                </div>
                <p class="font-bold w-20 text-right text-gray-800 dark:text-white">$${(item.price * item.quantity).toFixed(2)}</p>
                <button data-action="remove-from-cart" data-product-id="${item.id}" class="text-gray-400 hover:text-red-500 transition-colors">${XIcon()}</button>
            `, 'p-4 flex items-center gap-4 transition-all duration-300')}
        `).join('');

        return `
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">Your Shopping Cart</h1>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-6">${cartItemsHTML}</div>
                    <div class="lg:col-span-1">
                        ${GlassCard(`
                            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h2>
                            <div class="space-y-4">
                                <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
                                <div class="flex justify-between text-gray-600 dark:text-gray-300"><span>Taxes (8%)</span><span>$${tax.toFixed(2)}</span></div>
                                <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                                <div class="flex justify-between text-xl font-bold text-gray-800 dark:text-white"><span>Total</span><span>$${total.toFixed(2)}</span></div>
                            </div>
                            ${AnimatedButton('Proceed to Checkout', '', 'w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105')}
                        `, 'p-6')}
                    </div>
                </div>
            </div>
        `;
    };

    /**
     * Generates HTML for the Login Page
     */
    const renderLoginPage = () => `
        <div class="min-h-[calc(100vh-10rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                ${GlassCard(`
                    <div id="auth-container" class="relative h-96 overflow-hidden">
                        <!-- Login Form -->
                        <div id="login-form-wrapper" class="absolute w-full p-8 transition-all duration-500 ease-in-out opacity-100 transform translate-x-0">
                            <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
                            <form class="mt-8 space-y-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                                    <input type="email" required class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <input type="password" required class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                ${AnimatedButton('Sign In', '', 'w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105')}
                            </form>
                        </div>
                        <!-- Register Form -->
                        <div id="register-form-wrapper" class="absolute w-full p-8 transition-all duration-500 ease-in-out opacity-0 transform translate-x-full">
                            <h2 class="text-center text-3xl font-extrabold text-gray-900 dark:text-white">Create a new account</h2>
                            <form class="mt-8 space-y-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                    <input type="text" required class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
                                    <input type="email" required class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <input type="password" required class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                                </div>
                                ${AnimatedButton('Create Account', '', 'w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105')}
                            </form>
                        </div>
                    </div>
                `, 'p-0')}
                <p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    <span id="auth-toggle-text">Don't have an account? </span>
                    <button id="auth-toggle-button" data-action="toggle-auth" class="font-medium text-purple-600 hover:text-purple-500 dark:text-pink-400 dark:hover:text-pink-300">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    `;

    /**
     * Generates HTML for the Contact Page
     */
    const renderContactPage = () => `
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 class="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">Get In Touch</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                ${GlassCard(`
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Send us a Message</h2>
                    <form class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                            <input type="email" class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                            <textarea rows="4" class="mt-1 block w-full px-3 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"></textarea>
                        </div>
                        ${AnimatedButton('Send Message', '', 'w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105')}
                    </form>
                `, 'p-8')}
                <div>
                    <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Our Location</h2>
                    <div class="rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121822.42493149723!2d78.399635425218!3d17.41215320653608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1678886523678!5m2!1sen!2sin"
                            width="100%" height="350" style="border:0;" allowfullscreen="" loading="lazy" class="filter dark:invert dark:hue-rotate-180">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    `;

    // --- HELPER FUNCTIONS ---

    /**
     * Sets the current page and re-renders the UI
     */
    const setPage = (newPage) => {
        state.page = newPage;
        render();
    };

    /**
     * Toggles the color theme
     */
    const toggleTheme = () => {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        renderHeader(); // Re-render header to update icon
    };
    
    /**
     * Handles filtering and sorting of products
     */
    const filterAndSortProducts = () => {
        const filterValue = document.getElementById('filter')?.value || 'All';
        const sortValue = document.getElementById('sort')?.value || 'default';

        let tempProducts = [...state.products];

        if (filterValue !== 'All') {
            tempProducts = tempProducts.filter(p => p.category === filterValue);
        }

        if (sortValue === 'price-asc') {
            tempProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            tempProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        state.filteredProducts = tempProducts;
        
        // Re-render only the product grid part of the page
        const productsGrid = document.getElementById('products-grid');
        if(productsGrid) {
            productsGrid.innerHTML = state.filteredProducts.map((product, index) => `
                <div class="group animate-fade-in" data-action="view-product" data-product-id="${product.id}" style="animation-delay: ${index * 50}ms">
                    ${GlassCard(`
                        <div class="relative">
                            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-500 group-hover:scale-110" />
                            <div class="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">${product.category}</div>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 dark:text-white truncate">${product.name}</h3>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-lg font-semibold text-purple-600 dark:text-pink-400">$${product.price}</p>
                            <div class="flex items-center">
                                <span class="text-yellow-400">⭐</span>
                                <span class="ml-1 text-gray-600 dark:text-gray-300">${product.rating}</span>
                            </div>
                        </div>
                    `, 'p-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2')}
                </div>
            `).join('');
        }
    };
    
    /**
     * Cart manipulation functions
     */
    const addToCart = (productId) => {
        const product = state.products.find(p => p.id === productId);
        if (!product) return;

        const cartItem = state.cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            state.cart.push({ ...product, quantity: 1 });
        }
        render(); // Re-render to update cart icon and page if on cart page
    };

    const updateCartQuantity = (productId, change) => {
        const cartItem = state.cart.find(item => item.id === productId);
        if (!cartItem) return;
        
        cartItem.quantity += change;
        
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            render();
        }
    };

    const removeFromCart = (productId) => {
        state.cart = state.cart.filter(item => item.id !== productId);
        render();
    };


    // --- EVENT LISTENERS ---
    
    /**
     * Central event listener for the whole document
     */
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('[data-page], [data-action]');
        if (!target) return;

        e.preventDefault();
        
        const page = target.dataset.page;
        const action = target.dataset.action;

        if (page) {
            setPage(page);
        }

        if (action) {
            handleAction(action, target.dataset);
        }
    });
    
    /**
     * Handles all data-action clicks
     */
    const handleAction = (action, dataset) => {
        const productId = parseInt(dataset.productId, 10);
        switch (action) {
            case 'toggle-theme':
                toggleTheme();
                break;
            case 'view-product':
                state.selectedProductId = productId;
                setPage('productDetail');
                break;
            case 'add-to-cart':
                addToCart(productId);
                break;
            case 'remove-from-cart':
                removeFromCart(productId);
                break;
            case 'update-quantity':
                updateCartQuantity(productId, parseInt(dataset.change, 10));
                break;
            case 'select-image':
                const mainImage = document.getElementById('main-product-image');
                const zoomBox = document.getElementById('zoom-box');
                if (mainImage && zoomBox) {
                    mainImage.src = dataset.imageSrc;
                    zoomBox.style.backgroundImage = `url(${dataset.imageSrc})`;
                    // Update border on thumbnails
                    document.querySelectorAll('[data-action="select-image"]').forEach(img => {
                        img.classList.toggle('border-purple-500', img.dataset.imageSrc === dataset.imageSrc);
                        img.classList.toggle('scale-105', img.dataset.imageSrc === dataset.imageSrc);
                        img.classList.toggle('border-transparent', img.dataset.imageSrc !== dataset.imageSrc);
                    });
                }
                break;
            case 'next-slide':
            case 'prev-slide':
                const trendingProducts = state.products.filter(p => p.isTrending);
                if (action === 'next-slide') {
                    state.trendingCarouselIndex = (state.trendingCarouselIndex + 1) % trendingProducts.length;
                } else {
                    state.trendingCarouselIndex = (state.trendingCarouselIndex - 1 + trendingProducts.length) % trendingProducts.length;
                }
                document.querySelectorAll('.carousel-item').forEach((item, index) => {
                    item.style.transform = `translateX(${(index - state.trendingCarouselIndex) * 100}%)`;
                });
                break;
            case 'toggle-auth':
                const loginForm = document.getElementById('login-form-wrapper');
                const registerForm = document.getElementById('register-form-wrapper');
                const toggleText = document.getElementById('auth-toggle-text');
                const toggleButton = document.getElementById('auth-toggle-button');
                
                const isLoginVisible = loginForm.classList.contains('opacity-100');

                if(isLoginVisible) {
                    loginForm.classList.replace('opacity-100', 'opacity-0');
                    loginForm.classList.replace('translate-x-0', '-translate-x-full');
                    registerForm.classList.replace('opacity-0', 'opacity-100');
                    registerForm.classList.replace('translate-x-full', 'translate-x-0');
                    toggleText.textContent = "Already have an account? ";
                    toggleButton.textContent = "Sign in";
                } else {
                    loginForm.classList.replace('opacity-0', 'opacity-100');
                    loginForm.classList.replace('-translate-x-full', 'translate-x-0');
                    registerForm.classList.replace('opacity-100', 'opacity-0');
                    registerForm.classList.replace('translate-x-0', 'translate-x-full');
                    toggleText.textContent = "Don't have an account? ";
                    toggleButton.textContent = "Sign up";
                }
                break;
        }
    };
    
    /**
     * Event listeners for dynamic content that needs more than just clicks
     */
    mainContent.addEventListener('change', (e) => {
        if (e.target.id === 'filter' || e.target.id === 'sort') {
            filterAndSortProducts();
        }
    });

    mainContent.addEventListener('mousemove', (e) => {
        if (e.target.closest('.cursor-zoom-in')) {
            const zoomBox = document.getElementById('zoom-box');
            if (!zoomBox) return;
            const container = e.target.closest('.cursor-zoom-in');
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = ((e.pageX - left) / width) * 100;
            const y = ((e.pageY - top - window.scrollY) / height) * 100;
            zoomBox.style.backgroundPosition = `${x}% ${y}%`;
        }
    });

    headerContainer.addEventListener('click', (e) => {
        const toggle = e.target.closest('#theme-toggle');
        if (toggle) {
            toggleTheme();
        }
    });
    
    // --- INITIALIZATION ---
    const init = () => {
        // Set initial theme based on user's system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            state.theme = 'dark';
            document.documentElement.classList.add('dark');
        }
        render();
    };

    init();
});