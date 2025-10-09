// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';
// import axios from "axios";
// import { useStore } from "@/components/Store/Poststore";
// const Register = () => {
//   const [input, setInput] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const changeinptfield = (key, value) => {
//     setInput((prevInput) => ({ ...prevInput, [key]: value }));
//   };
//     const setUserData = useStore((state) => state.setUserData);

// useEffect(()=>{console.log("This is data from register",setUserData),[setUserData]})
//   const Router = useRouter();

//   const Handleform = async (e) => {
//     e.preventDefault();


//     try {

//       const response = await axios.post("http://10.13.172.117:8080/api/signup",input);
//       console.log("Response:", response.data); 
//       setUserData(input); 
//       Router.push("/OTP"); 

//     } catch (error) {
//       console.error("Error during registration:", error);
//     }

//   };

//   return (
//     <div className="bg-gray-100 flex justify-center items-center min-h-screen mt-20">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">REGISTER</h2>

//         <form action="#" method="POST" onSubmit={Handleform}>
//           <div className="mb-4">
//             <label htmlFor="firstname" className="block text-gray-950 font-medium mb-2">
//               First Name
//             </label>
//             <input
//               name="firstName"
//               value={input.firstName}
//               onChange={(e) => changeinptfield("firstName", e.target.value)}
//               id="fname"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
//               placeholder="Enter your first name"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="lastName" className="block text-gray-950 font-medium mb-2">
//               Last Name
//             </label>
//             <input
//               name="lastName"
//               value={input.lastName}
//               onChange={(e) => changeinptfield("lastName", e.target.value)}
//               id="lname"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
//               placeholder="Enter your last name"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
//               Email
//             </label>
//             <input
//               name="email"
//               value={input.email}
//               onChange={(e) => changeinptfield("email", e.target.value)}
//               type="email"
//               id="email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
//               Password
//             </label>
//             <input
//               name="password"
//               value={input.password}
//               onChange={(e) => changeinptfield("password", e.target.value)}
//               type="password"
//               id="password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               Sign Up
//             </button>
//           </div>

//           <div className="text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link href="/Login" className="text-blue-500 hover:text-blue-700">
//               Login here
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
