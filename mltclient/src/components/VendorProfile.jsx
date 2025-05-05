import React from 'react';
import ProductList from '../components/ProductList';

const VendorProfile = () => {
  // Vendor info (this could be dynamic in a real-world app)
  const vendor = {
    name: 'John Doe',
    storeName: 'John\'s Store',
    storeDescription: 'A great place for all your needs!',
    rating: 4.5,
    totalSales: 1200,  // Total sales value
    totalProductsSold: 500,  // Total products sold
    bestSellingProduct: 'Product 2',  // Best selling product
    stockStatus: 'Low',  // Stock status (could be dynamic based on the actual stock)
    products: [
      {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1',
        price: 29.99,
        image: 'https://via.placeholder.com/200',
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Description of Product 2',
        price: 39.99,
        image: 'https://via.placeholder.com/200',
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Description of Product 3',
        price: 49.99,
        image: 'https://via.placeholder.com/200',
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Description of Product 4',
        price: 59.99,
        image: 'https://via.placeholder.com/200',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{vendor.storeName}</h1>
        <p className="text-lg text-gray-600">{vendor.storeDescription}</p>
        <div className="mt-4 flex justify-center items-center">
          <span className="text-xl font-semibold text-gray-800">Rating: </span>
          <span className="ml-2 text-yellow-500">{vendor.rating} ★</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-blue-700">Total Sales</h3>
          <p className="text-2xl font-bold text-blue-900">${vendor.totalSales}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700">Total Products Sold</h3>
          <p className="text-2xl font-bold text-green-900">{vendor.totalProductsSold}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-yellow-700">Best Selling Product</h3>
          <p className="text-2xl font-bold text-yellow-900">{vendor.bestSellingProduct}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-red-700">Stock Status</h3>
          <p className="text-2xl font-bold text-red-900">{vendor.stockStatus}</p>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default VendorProfile;
