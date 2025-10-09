// 'use client'
// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import Link from 'next/link';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <Link href="/">
//           <span className="text-xl font-bold text-blue-600 cursor-pointer">MyLogo</span>
//         </Link>

//         <div className="hidden md:flex gap-6">
//           <Link href="/home">
//             <span className="text-gray-700 hover:text-blue-500">Home</span>
//           </Link>
//           <Link href="/products">
//             <span className="text-gray-700 hover:text-blue-500">Products</span>
//           </Link>
//           <Link href="/about">
//             <span className="text-gray-700 hover:text-blue-500">About</span>
//           </Link>
//           <Link href="/contact">
//             <span className="text-gray-700 hover:text-blue-500">Contact</span>
//           </Link>
//         </div>

//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden mt-2 space-y-2 px-4">
//           <Link href="/home"><span className="block text-gray-700 hover:text-blue-500">Home</span></Link>
//           <Link href="/products"><span className="block text-gray-700 hover:text-blue-500">Products</span></Link>
//           <Link href="/about"><span className="block text-gray-700 hover:text-blue-500">About</span></Link>
//           <Link href="/contact"><span className="block text-gray-700 hover:text-blue-500">Contact</span></Link>
//         </div>
//       )}
//     </nav>
//   );
// }
