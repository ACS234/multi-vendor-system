import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getProduct } from '../services/apiServices';

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const [productData, setProductData] = useState({
    totalProducts: 100,
    activeCategories: 5,
    stockAvailabilityRate: 92,
    returnRate: 12,
  });

  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = async () => {
    try {
      const data = await getProduct();
      setProductList(data)
    } catch (error) {
      toast.error("Something Went Error", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="flex space-x-6 p-6">
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-orange-500 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Products</h3>
            <p className="text-3xl font-bold">{productData.totalProducts}</p>
          </div>
          <div className="bg-green-500 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Active Categories</h3>
            <p className="text-3xl font-bold">{productData.activeCategories}</p>
          </div>
          <div className="bg-gray-500 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Stock Availability Rate</h3>
            <p className="text-3xl font-bold">{productData.stockAvailabilityRate}%</p>
          </div>
          <div className="bg-blue-950 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Return Rate</h3>
            <p className="text-3xl font-bold">{productData.returnRate}%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <input
            type="text"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md mb-4 w-full"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-md mb-4 w-full"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Products Overview</h3>
          <table className="min-w-full bg-white table-auto">
            <thead>
              <tr>
                <th className="p-2 border">Product Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Launch Date</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((product) => (
                <tr key={product.id}>
                  <td className="p-2 border">{product.name}</td>
                  <td className="p-2 border">{product.category}</td>
                  <td className="p-2 border">{product.status}</td>
                  <td className="p-2 border">{product.price}</td>
                  <td className="p-2 border">{product.launchDate}</td>
                  <td className="p-2 border">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">View</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-md ml-2">Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
