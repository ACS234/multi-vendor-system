import React, { useState } from "react";

const ProductCart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const addToCart = (product) => {
    setCart([...cart, product]);
    setTotalPrice(totalPrice + product.price);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shopping Cart</h2>
        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            cart.map((product, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                <span className="text-gray-700 font-medium">${product.price}</span>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-semibold text-gray-800">Total: ${totalPrice}</span>
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCart;
