'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import constant from '@/constant';
import Cookies from 'js-cookie'; 
import { jwtDecode } from "jwt-decode";
import { useStore } from '@/components/Store/Poststore';
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
const{setToken,setDecode}=useStore();
  const changeinptfield = (key, value) => {
    setInput(prev => ({ ...prev, [key]: value }));
  };

  const router = useRouter();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://172.16.29.53:4040/api/login", input);
      const data = response.data;
console.log("Response:", data);
      const token = data.token; 
      const decoded = jwtDecode(token);
      console.log("Token:", token);
      console.log("Decoded JWT:", decoded); 

      setToken(decoded);
      setDecode(token);
      if (decoded.roles[0].authority !== "ADMIN") {
        router.push("/Card");
      }
       else {
        router.push("/Admin");
      }
      Cookies.set("token", token, { path: "/", expires: 7 }); 

      localStorage.setItem("userdata", JSON.stringify(data));

    } catch (error) {
      console.error("Login failed:", error);
      alert(constant.WRONG_INPUT || "Invalid email or password");
    }

}
const goToRegister = (e) => {
  e.preventDefault(); // prevents default button behavior
  router.push('/Register');
};
  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>

        <form onSubmit={HandleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email</label>
            <input
              name="email"
              value={input.email}
              onChange={(e) => changeinptfield("email", e.target.value)}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
            <input
              name="password"
              value={input.password}
              onChange={(e) => changeinptfield("password", e.target.value)}
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-950"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <button onClick={goToRegister} className="text-blue-500 hover:text-blue-700">
            Register
    </button>          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
