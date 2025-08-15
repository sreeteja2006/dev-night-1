// src/pages/Signup.jsx
import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

import AuthLayout from "../components/Authlayout";

// import Login from "./Loginpage";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Create an Account"
      infoTitle="Join the Auction Community"
      infoText="Discover exclusive deals, bid on unique items, and sell effortlessly."
    >
      <form className="space-y-4">
        {/* Username */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaUser className="text-gray-400 mr-3" />
          <input type="text" placeholder="Username" className="bg-transparent outline-none w-full" />
        </div>

        {/* Password */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-transparent outline-none w-full"
          />
          <span
            className="cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Email */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input type="email" placeholder="Email" className="bg-transparent outline-none w-full" />
        </div>

        {/* Address */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaMapMarkerAlt className="text-gray-400 mr-3" />
          <input type="text" placeholder="Address" className="bg-transparent outline-none w-full" />
        </div>

        {/* Mobile */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaPhone className="text-gray-400 mr-3" />
          <input type="tel" placeholder="Mobile Number" className="bg-transparent outline-none w-full" />
        </div>

        <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 p-3 rounded-lg font-semibold">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">Log in</a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
