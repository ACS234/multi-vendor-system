import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/orders/", {
      headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
    })
    .then((response) => setOrders(response.data))
    .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Order #{order.id}</h3>
                <p className="text-gray-600">Status: {order.status}</p>
              </div>
              <span className="text-gray-700 font-medium">${order.total_price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
