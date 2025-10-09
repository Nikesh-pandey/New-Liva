// 'use client'

// import React from 'react';
// import Link from 'next/link';
// import {useStore}  from '@/components/Store/Poststore';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import Newsection from '../Newsection/Newsection';
// const Navbar = () => {
//   const { Cart } = useStore();
//   const Router=useRouter();
//   const handleclick=()=>{
//     Router.push("/Register");   
// }
//   return (
//     <>
//     <nav className="bg-blue-950 p-4 text-white fixed top-0 left-0 right-0">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center space-x-8">
//           <Link  href="/Newsection" className="text-xl font-semibold">Li-Va</Link>
//           <div className="space-x-4">
//           <Link href="/Home" className="hover:text-gray-300">Home</Link>
//               <Link href="/Aboutus" className="hover:text-gray-300">About Us</Link> 
//               <Link href="/Contactus" className="hover:text-gray-300">Contact</Link> 
//           </div>
//         </div>

//         <div className="flex items-center space-x-6">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="px-4 py-2 rounded-md text-blue-100 w-48"
//             />
//           <Link href= "/Icon">
//           <div className="relative">

//             <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
//              {Cart.length}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="w-6 h-6 text-white"
//                 >
//                 <path d="M6 2L3 6v14h18V6l-3-4H6zM6 2h12l1 1H5L6 2zm3 16h8V8H9v10z"></path>
//               </svg>
//               {/* {cart.length > 0 && (
//                 <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1" > </span>
//                 )} */}
//             </button>
//           </div>
//           </Link>
//           {/* Circular Image */}
//           <div className="w-10 h-10 rounded-full overflow-hidden">
//             <img
//               src="https://randomuser.me/api/portraits/men/10.jpg" // Replace with your image URL
//               alt="User"
//               className="w-full h-full object-cover"
//               />
//           </div>
//           <div className="mb-6">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded-md bg-gray-800 p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       onClick={handleclick}
//       >
// Sign Up            </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//               </>
//   );
// };

// export default Navbar;



'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/components/Store/Poststore'; // your store import
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Navbar = () => {
  const cartdata = useStore((state) => state.cartdata); // Use cartdata from store
  const Router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleclick = () => {
    Router.push("/Register");
  };

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://172.16.29.53:4040/api/product/search?productName=${query}`);
        setResults(response.data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    };

    const debounce = setTimeout(fetchResults, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <>
      <nav className="bg-blue-950 p-4 text-white fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/Newsection" className="text-xl font-semibold">Li-Va</Link>
            <div className="space-x-4">
              <Link href="/Home" className="hover:text-gray-300">Home</Link>
              <Link href="/Aboutus" className="hover:text-gray-300">About Us</Link>
              <Link href="/Contactus" className="hover:text-gray-300">Contact</Link>
            </div>
          </div>

          <div className="flex items-center space-x-6 relative">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded-md text-white- w-48"
            />

            <Link href="/Icon">
              <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 relative">
                {cartdata?.length || 0} {/* use cartdata.length safely */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-white"
                >
                  <path d="M6 2L3 6v14h18V6l-3-4H6zM6 2h12l1 1H5L6 2zm3 16h8V8H9v10z"></path>
                </svg>
              </button>
            </Link>

            {/* <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                // src="https://randomuser.me/api/portraits/men/10.jpg"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div> */}

            <div className="mb-6">
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md p-2 rounded-full hover:bg-gray-700"
                onClick={handleclick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative ml-60 mt-28 z-50">
        {query.trim() && (
          <div className="absolute top-full left-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[400px] overflow-y-auto p-4 bg-white rounded-lg shadow-xl">
            {results.length > 0 ? (
              results.slice().reverse().map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                    <p className="text-sm text-blue-500 font-medium">Type: {item.type}</p>
                    <p className="text-sm text-gray-700">Available: {item.quantity}</p>
                    <p className="text-lg font-semibold text-green-600">Rs. {item.productPrice}</p>
                    <button
                      onClick={() => {
                        Router.push(`/ProductDetail/${item.id}`);
                      }}
                      className="mt-3 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No results found.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
