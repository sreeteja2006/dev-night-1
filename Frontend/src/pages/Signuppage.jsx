// src/pages/Signup.jsx
import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Login from "./Loginpage";
import useNavigate from "../components/Navbar"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e, target.value] })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          address : formData.address,
          mobile: formData.mobile,
          username: formData.username
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      navigate("/homepage");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <Login
      title="Create an Account"
      infoTitle="Join the Auction Community"
      infoText="Discover exclusive deals, bid on unique items, and sell effortlessly."
    >
      <form className="space-y-4">
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaUser className="text-gray-400 mr-3" />
          <input type="text" placeholder="Username" className="bg-transparent outline-none w-full" value={formData.username} onChange={handleChange} />
        </div>
        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaLock className="text-gray-400 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-transparent outline-none w-full"
          />
          <span
            className="cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaEnvelope className="text-gray-400 mr-3" />
          <input type="email" placeholder="Email" className="bg-transparent outline-none w-full" value={formData.email} onChange={handleChange} />
        </div>

        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaMapMarkerAlt className="text-gray-400 mr-3" />
          <input type="text" placeholder="Address" value={formData.address} onChange={handleChange} className="bg-transparent outline-none w-full" />
        </div>

        <div className="flex items-center bg-gray-700 p-3 rounded-lg">
          <FaPhone className="text-gray-400 mr-3" />
          <input type="tel" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="bg-transparent outline-none w-full" />
        </div>

        <button type="submit" onChange={handleSubmit} className="w-full bg-indigo-500 hover:bg-indigo-600 p-3 rounded-lg font-semibold">
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">Log in</a>
        </p>
      </form>
    </Login>
  );
};

export default Signup;
