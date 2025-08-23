// src/components/AuthLayout.jsx
import React from "react";
const Login = () => {
  const [formData,setFormData] ={
    password: "",
    email: "",
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e, target.value] })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      navigate("/homepage");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  <>
    <div className="flex items-center bg-gray-700 p-3 rounded-lg">
      <FaEnvelope className="text-gray-400 mr-3" />
      <input type="email" placeholder="Email" className="bg-transparent outline-none w-full" value={formData.email} onChange={handleChange} />
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
    <button type="submit" onChange={handleSubmit} className="w-full bg-indigo-500 hover:bg-indigo-600 p-3 rounded-lg font-semibold">
      Login
      </button>

  </>

}

export default Login;
