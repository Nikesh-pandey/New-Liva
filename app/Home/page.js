'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/components/Store/Poststore';
import Card from '../Card/page';
const Home = () => {
  const [formData, setFormData] = useState(null);
  const Router = useRouter(); 
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));  
    }
  }, []);

  if (!formData) {
    return <div>No product data available</div>;  // Render message if no form data found
  }

  return (
    <>
    
    <Card/>

    <div className="max-w-sm mx-auto  rounded overflow-hidden shadow-lg bg-white p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-950">Product Preview</h1>

      {formData?.image && (
        <div className="mb-4">
          <img
            src={formData.image}
            alt="Product"
            className="w-full h-48 object-cover rounded"
          />
        </div>
      )}

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">{formData?.name || 'Product Name'}</h2>
        <p className="mt-2 text-gray-950">{formData?.description || 'Product Description'}</p>
        <div className="mt-4">
          <span className="text-sm font-medium text-gray-950">Type: </span>
          <span className="text-sm text-gray-950">{formData?.type || 'N/A'}</span>
        </div>
      </div>
    </div>
    </>

  );
};

export default Home;
