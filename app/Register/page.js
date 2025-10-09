"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useStore } from "@/components/Store/Poststore";

const Register = () => {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUserData = useStore((state) => state.setUserData);

// useEffect(() => {
//   if (typeof window !== "undefined") {
//     const token = searchParams.get("token");
//     console.log("Token from URL:", token);

//     if (token) {
//       console.log("Setting cookie with token:", token);
//       Cookies.set("auth_token", token, {
//         path: "/",
//         expires: 1,         
//         sameSite: "Lax",
//       }); 
//       console.log("Cookie set, now verifying...");

//       const testCookie = Cookies.get("auth_token");
//       console.log("Cookie after set:", testCookie);

//       window.history.replaceState({}, document.title, window.location.pathname);

//       setTimeout(() => {
//         router.push("/Card");
//       }, 500);
//     } else {
//       console.log("No token found in URL.");
//     }
//   }
// }, [searchParams, router]);
   useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      Cookies.set("token", token, {
        path: "/",
        sameSite: "Lax",
        secure: false, // Use true only with HTTPS
      });
      console.log(" Token cookie set:", token);
    } else {
      console.log(" No token in URL");
    }
  }, []);

  useEffect(() => {
    const tokenFromCookie = Cookies.get("auth_token");
    console.log("Token from cookie:", tokenFromCookie);
  }, []);

  const changeinptfield = (key, value) => {
    setInput((prevInput) => ({ ...prevInput, [key]: value }));
  };

  const googleClick = () => {
    if (typeof window !== "undefined") {
      window.location.href =
        "http://172.16.29.53.nip.io:4040/oauth2/authorization/google";
    }
  };

  const Handleform = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://172.16.29.53:4040/api/signup",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(input);
      router.push("/OTP");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen mt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          REGISTER
        </h2>
        <form onSubmit={Handleform}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-950 font-medium mb-2">
              First Name
            </label>
            <input
              value={input.firstName}
              onChange={(e) => changeinptfield("firstName", e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-gray-950 font-medium mb-2">
              Last Name
            </label>
            <input
              value={input.lastName}
              onChange={(e) => changeinptfield("lastName", e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={input.email}
              onChange={(e) => changeinptfield("email", e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={input.password}
              onChange={(e) => changeinptfield("password", e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">Role</label>
            <input
              list="roles"
              value={input.role}
              onChange={(e) => changeinptfield("role", e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Select or enter your role"
              required
            />
            <datalist id="roles">
              <option value="USER" />
              <option value="ADMIN" />
            </datalist>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            >
              Sign Up
            </button>
          </div>

          {/* Login Redirect */}
          <div className="text-center text-sm text-gray-600 mb-3">
            Already have an account?{" "}
            <Link href="/Login" className="text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </div>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={googleClick}
            className="flex items-center gap-3 border border-gray-300 rounded px-12 py-2 shadow-sm hover:bg-gray-100 w-full"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;












































































// "use client";
// import React, { useState } from "react";
// import { useRouter } from 'next/navigation';
// import axios from "axios";

// const Register = () => {
//   const [input, setInput] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const router = useRouter();

//   const changeInputField = (key, value) => {
//     setInput(prev => ({ ...prev, [key]: value }));
//   };

//   const handleForm = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://192.168.1.69:8080/api/signup", input, {
//         headers: { "Content-Type": "application/json" },
//       });
      
//       if (response.data.success) {
//         router.push("/OTP");
//       } else {
//         console.error("Registration failed:", response.data.message);
//         alert("Registration failed: " + response.data.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Something went wrong. Check console.");
//     }
//   };

//   return (
//     <div className="bg-gray-100 flex justify-center items-center min-h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">REGISTER</h2>
//         <form onSubmit={handleForm}>

//           <div className="mb-4">
//             <label htmlFor="firstName" className="block font-medium mb-2">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={input.firstName}
//               onChange={(e) => changeInputField("firstName", e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="lastName" className="block font-medium mb-2">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={input.lastName}
//               onChange={(e) => changeInputField("lastName", e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block font-medium mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={input.email}
//               onChange={(e) => changeInputField("email", e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block font-medium mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={input.password}
//               onChange={(e) => changeInputField("password", e.target.value)}
//               className="w-full px-4 py-2 border rounded-md"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
