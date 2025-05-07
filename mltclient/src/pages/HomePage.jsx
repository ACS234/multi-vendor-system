import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/bgimg.jpg'
import img2 from '../assets/home.jpg'
import { getCategories } from '../services/apiServices';

const HomePage = () => {

  const [catItems,setCatItems]=useState([])

  const fetchCategory=async()=>{
    try {
      const data=await getCategories();
      setCatItems(data);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    fetchCategory()
  },[])


  return (
    <div className="bg-white text-white min-h-screen flex flex-col" >
      <section className="hero flex justify-center items-center bg-cover bg-center h-96 w-full" style={{ backgroundImage: `url(${img1})` }}>
        <div className="max-w-5xl text-center px-4">
          <h1 className="text-5xl font-extrabold mb-6 text-amber-200">Welcome to MultiVendor Marketplace</h1>
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
      <section className="featured-products py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            <div className="product-card bg-transparent p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={img1}
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
            <div className="product-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={img2}
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
          </div>
        </div>
      </section>
      <section className="product-categories py-16 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">Shop by Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {catItems.map((item)=>(
              <div key={item.id} className="category-card bg-transparent p-6 rounded-lg hover:shadow-xl transition-all duration-300">
              <img
                src={`http://localhost:8005${item.category_image}`}
                alt="Category"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-black mb-2">{item.name}</h3>
              <Link
                to="/products"
                className="text-gray-500 hover:text-gray-800"
              >
                Explore
              </Link>
            </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vendor-spotlight py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">Vendor Spotlight</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            <div className="vendor-card bg-transparent p-6 rounded-lg hover:shadow-xl transition-all duration-300">
              <img
                src={img1}
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
            <div className="vendor-card bg-white p-6 rounded-lg hover:shadow-xl transition-all duration-300">
              <img
                src={img2}
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
          </div>
        </div>
      </section>
      <section className="customer-reviews py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-semibold text-white mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="review-card bg-transparent p-6 rounded-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-400 mb-4">
                "This marketplace is fantastic! Found everything I needed and more!"
              </p>
              <h3 className="text-lg font-semibold text-white">Customer Name</h3>
            </div>
            <div className="review-card bg-transparent p-6 rounded-lg hover:shadow-xl transition-all duration-300">
              <p className="text-gray-400 mb-4">
                "The shopping experience was smooth, and I love the product quality!"
              </p>
              <h3 className="text-lg font-semibold text-white">Customer Name</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="call-to-action py-20 bg-white text-center">
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
      <footer className="bg-[#0d1641] py-12 mt-auto">
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
