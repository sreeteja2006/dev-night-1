import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import AuthLayout from "../components/Authlayout";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Login to Your Account"
      infoTitle="Welcome Back!"
      infoText="Continue bidding, selling, and discovering amazing auctions."
    >
      <form className="space-y-4">
        {/* Username */}
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaUser className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Username"
            className="bg-transparent outline-none w-full"
          />
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
            className="cursor-pointer text-gray-400 ml-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 p-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
