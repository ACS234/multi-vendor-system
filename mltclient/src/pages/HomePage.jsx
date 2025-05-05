import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="hero flex justify-center items-center bg-black py-32">
        <div className="max-w-5xl text-center px-4">
          <h1 className="text-5xl font-extrabold mb-6">Welcome to MultiVendor Marketplace</h1>
          <p className="text-xl mb-8">
            Discover a world of products from trusted vendors. Shop now and enjoy exclusive deals.
          </p>
          <Link
            to="/products"
            className="inline-block bg-green-500 text-black py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-400 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {/* Sample Product Card */}
            <div className="product-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://via.placeholder.com/300"
                alt="Product"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">Product Name</h3>
              <p className="text-gray-400 mb-4">A short description of the product goes here.</p>
              <Link
                to="/product-detail"
                className="text-green-500 hover:text-green-400"
              >
                View Details
              </Link>
            </div>
            {/* Repeat Product Card as needed */}
            <div className="product-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://via.placeholder.com/300"
                alt="Product"
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">Product Name</h3>
              <p className="text-gray-400 mb-4">A short description of the product goes here.</p>
              <Link
                to="/product-detail"
                className="text-green-500 hover:text-green-400"
              >
                View Details
              </Link>
            </div>
            {/* More Product Cards */}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="product-categories py-16 bg-black">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">Shop by Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {/* Category Card */}
            <div className="category-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Category"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">Category Name</h3>
              <Link
                to="/products"
                className="text-green-500 hover:text-green-400"
              >
                Explore
              </Link>
            </div>
            {/* Repeat Category Card as needed */}
            <div className="category-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Category"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">Category Name</h3>
              <Link
                to="/products"
                className="text-green-500 hover:text-green-400"
              >
                Explore
              </Link>
            </div>
            {/* More Category Cards */}
          </div>
        </div>
      </section>

      {/* Vendor Spotlight Section */}
      <section className="vendor-spotlight py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">Vendor Spotlight</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {/* Vendor Card */}
            <div className="vendor-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Vendor"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">Vendor Name</h3>
              <p className="text-gray-400 mb-4">A brief description of the vendor goes here.</p>
              <Link
                to="/vendor-profile"
                className="text-green-500 hover:text-green-400"
              >
                Visit Vendor
              </Link>
            </div>
            {/* Repeat Vendor Card as needed */}
            <div className="vendor-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Vendor"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">Vendor Name</h3>
              <p className="text-gray-400 mb-4">A brief description of the vendor goes here.</p>
              <Link
                to="/vendor-profile"
                className="text-green-500 hover:text-green-400"
              >
                Visit Vendor
              </Link>
            </div>
            {/* More Vendor Cards */}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="customer-reviews py-16 bg-black">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Review Card */}
            <div className="review-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-400 mb-4">
                "This marketplace is fantastic! Found everything I needed and more!"
              </p>
              <h3 className="text-lg font-semibold text-white">Customer Name</h3>
            </div>
            {/* Repeat Review Card as needed */}
            <div className="review-card bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-400 mb-4">
                "The shopping experience was smooth, and I love the product quality!"
              </p>
              <h3 className="text-lg font-semibold text-white">Customer Name</h3>
            </div>
            {/* More Review Cards */}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="call-to-action py-20 bg-gray-900 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Join our Vendor Network
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Become a vendor today and start selling your products to a global audience.
          </p>
          <Link
            to="/register"
            className="inline-block bg-green-500 text-black py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-400 transition duration-300"
          >
            Start Selling
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 mt-auto">
        <div className="max-w-7xl mx-auto text-center px-4">
          <p className="text-gray-400">© 2025 MultiVendor. All Rights Reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link to="/about" className="text-gray-400 hover:text-white">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-white">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
