import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { authAPI } = await import('../services/api');
      await authAPI.login(formData);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-700 p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Welcome Back</h2>

        {error && (
          <div className="text-red-500 bg-red-900/40 p-3 rounded-md text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 p-3 rounded-xl font-semibold text-white text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
