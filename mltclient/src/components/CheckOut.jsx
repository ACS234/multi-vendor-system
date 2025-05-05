import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("your-publishable-key-here");

const Checkout = () => {
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:8000/api/checkout-session/", { method: "POST" });
    const session = await response.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout</h2>
        <button
          onClick={handleCheckout}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none"
        >
          Checkout with Stripe
        </button>
      </div>
    </div>
  );
};

export default Checkout;
