'use client'
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const OTPInput = () => {
      const router=useRouter();
  
  const [otp, setOtp] = useState(["", "", "", ""]);

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
    router.push("/Card");

  };
  return (
    <div className="flex space-x-2 mt-40">
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
  );
};

export default OTPInput;
