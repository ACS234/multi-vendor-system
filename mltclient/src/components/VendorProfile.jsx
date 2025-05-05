import React, { useState,useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useCurrentUser } from '../hooks/useUser';
import { getProduct } from '../services/apiServices';
import { ToastContainer,toast } from 'react-toastify';

const VendorProfile = () => {
  const {user}=useCurrentUser()
  const [products,setProducts]=useState([])
  const fetchProducts = async () => {
      try {
        const data = await getProduct();
        setProducts(data)
      } catch (error) {
        toast.error("Something Went Error", error)
      }
    }
    useEffect(() => {
      fetchProducts()
    }, [])

  const orders = [
    { id: 101, buyer: 'Alice', total: 200, status: 'Pending' },
    { id: 102, buyer: 'Bob', total: 300, status: 'Shipped' },
  ];

  const chartData = {
    labels: products.map(p => p.name),
    datasets: [{
      label: 'Sales',
      data: [50, 80],
      backgroundColor: ['#4caf50', '#2196f3'],
    }],
  };

  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen text-gray-800">
      <ToastContainer/>
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Vendor Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Name:</strong> {user.username}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Business:</strong> {user.role}</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            Edit Profile
          </button>
        </div>
      </section>
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product List</h2>
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300">
          Add Product
        </button>
        <div className="space-y-4">
          {products.map(prod => (
            <div
              key={prod.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Name:</strong> {prod.name}</li>
                <li><strong>Stock:</strong> {prod.stock}</li>
                <li><strong>Price:</strong> ${prod.price}</li>
              </ul>
              <div className="mt-4 space-x-2">
                <button className="px-4 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">Edit</button>
                <button className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Orders Section */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Orders</h2>
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Order ID:</strong> {order.id}</li>
                <li><strong>Buyer:</strong> {order.buyer}</li>
                <li><strong>Total:</strong> ${order.total}</li>
                <li><strong>Status:</strong> {order.status}</li>
              </ul>
              <button className="mt-4 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Order Details Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Order ID:</strong> 101</li>
            <li><strong>Buyer:</strong> Alice</li>
            <li><strong>Items:</strong> Product A × 2</li>
            <li><strong>Shipping Address:</strong> 123 Main St, Springfield</li>
          </ul>
          <div className="mt-4">
            <label className="block mb-2 font-semibold">Change Status:</label>
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Pending</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Analytics</h2>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <Bar data={chartData} />
        </div>
      </section>
    </div>
  );
};

export default VendorProfile;
