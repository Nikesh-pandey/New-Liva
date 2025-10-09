'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductForm() {
  const [formData, setFormDataState] = useState({
    name: '',
    description: '',
    type: '',
    image: null,
  });

  const Router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormDataState({ ...formData, image: files[0] });
    } else {
      setFormDataState({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToStore = {
      ...formData,
      image: formData.image ? URL.createObjectURL(formData.image) : null,
    };
    localStorage.setItem("formData", JSON.stringify(dataToStore));  // Save form data to localStorage
    Router.push('/Home');  // Redirect to the Home page
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-950">Add New Product</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-950 mb-1">Product Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded px-3 py-2 h-28 text-gray-950"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-950 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded px-3 py-2 text-gray-950"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-950 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded px-3 py-2 text-gray-950"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-950 mb-1">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded px-3 py-2 text-gray-950"
        >
          <option value="">Select Type</option>
          <option value="Beauty">Beauty</option>
          <option value="Electronic">Electronic</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
