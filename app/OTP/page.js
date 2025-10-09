'use client';
import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useStore } from "@/components/Store/Poststore";
const OTPInput = () => {
  const userData = useStore((state) => state.userData);
  // useEffect(()=>{console.log("this is userdata",userData)},[userData])
  // console.log("userData:", userData);
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
//   const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("userdata"));
//     if (userData && userData.email) {
//       setEmail(userData.email);
//     } else {
//       setMessage("Email not found. Please register again.");
//     }
//   }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3 && value) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
 
    console.log(userData);
    try {
      const response = await axios.post("http://172.16.29.53:4040/api/verify", 

        {
        email:userData.email, 
        otp: enteredOtp,
        user:{
            "firstName":userData.firstName,
            "lastName": userData.lastName,
            "email": userData.email,
            "password":userData.password,
            "role":userData.role,
        }
      });
      console.log("full response",response.data);
      if (response.data.message === "User verified and registered successfully") {
        router.push("/Login");
      } else {
        setMessage("OTP wrong.");
      }
    } catch (error) {
      console.error("Please try again:", error);
      setMessage("An error occurred.");
    }
  };
 return (
    <div className="flex flex-col items-center mt-40">
      <div className="flex space-x-2 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            maxLength="1"
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Verify OTP
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default OTPInput;
