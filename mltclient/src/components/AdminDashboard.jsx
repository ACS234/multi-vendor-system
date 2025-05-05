
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/api/admin/dashboard/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    })
    .then((response) => setData(response.data))
    .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-blue-800">Total Vendors</h3>
            <p className="text-xl text-blue-600">{data.total_vendors}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-green-800">Total Sales</h3>
            <p className="text-xl text-green-600">${data.total_sales}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-red-800">Total Orders</h3>
            <p className="text-xl text-red-600">{data.total_orders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
