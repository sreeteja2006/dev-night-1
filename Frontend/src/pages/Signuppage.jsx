// src/pages/Signup.jsx
import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    mobilenum: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { authAPI } = await import('../services/api');
      const signupData = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        address: formData.address,
        mobile_num: formData.mobilenum,
      };
      await authAPI.signup(signupData);
      alert('Account created successfully! Please login.');
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-700 p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Create Account</h2>

        {error && (
          <div className="text-red-500 bg-red-900/40 p-3 rounded-md text-center font-medium">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex items-center bg-gray-800 p-3 rounded-xl shadow-md focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-200">
            <FaUser className="text-gray-400 mr-3 text-lg" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400 text-sm"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-800 p-3 rounded-xl shadow-md focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-200">
            <FaLock className="text-gray-400 mr-3 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400 text-sm"
              required
            />
            <span
              className="ml-2 cursor-pointer text-gray-400 hover:text-indigo-400 transition-all duration-200 select-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Email */}
          <div className="flex items-center bg-gray-800 p-3 rounded-xl shadow-md focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-200">
            <FaEnvelope className="text-gray-400 mr-3 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400 text-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div className="flex items-center bg-gray-800 p-3 rounded-xl shadow-md focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-200">
            <FaMapMarkerAlt className="text-gray-400 mr-3 text-lg" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Mobile */}
          <div className="flex items-center bg-gray-800 p-3 rounded-xl shadow-md focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-200">
            <FaPhone className="text-gray-400 mr-3 text-lg" />
            <input
              type="tel"
              name="mobilenum"
              placeholder="Mobile Number"
              value={formData.mobilenum}
              onChange={handleChange}
              className="bg-transparent outline-none w-full text-gray-100 placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 p-3 rounded-xl font-semibold text-white text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            onChange={handleSubmit}
          >
            Sign Up
          </button>

          {/* Already have account */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
