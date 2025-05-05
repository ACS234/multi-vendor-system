import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetail } from '../services/apiServices';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  // const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    const getDetail = async (id) => {
      try {
        const data = await getProductDetail(id);
        console.log(data)
        setProduct(data);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };
    if (id) getDetail(id);
  }, [id]);

  const handleCart = () => {
    navigate('/cart')
  }

  const handlePayment = () => {
    navigate('/payment')
  }


  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-lg shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 rounded-md object-cover"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.description||'N/A'}</p>
          <p className="text-xl font-semibold text-green-600">₹{product.price}</p>
          <p className={`font-medium ₹{product.availability === 'In Stock' ? 'text-green-500' : 'text-red-500'}`}>
            {product.availability}
          </p>

          <div className="flex gap-4 mt-4">
            <button onClick={() => handleCart()} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
            <button onClick={() => { handlePayment() }} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-4">Related Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {relatedProducts.map((rp) => (
          <div key={rp.id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <img
              src={rp.image}
              alt={rp.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-semibold">{rp.name}</h4>
            <p className="text-green-600 font-medium">₹{rp.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              View Product
            </button>
          </div>
        ))}
      </div>
    </div> */}
    </div>
  );
};

export default ProductDetail;
