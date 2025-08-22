// src/components/AuthLayout.jsx
import React from "react";

const Login = ({ children, title, infoTitle, infoText }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-indigo-400 mb-6">{title}</h2>
          {children}
        </div>


        {/* Right - Info */}
        <div className="w-full md:w-1/2 bg-indigo-500 flex flex-col items-center justify-center p-8 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold mb-2">{infoTitle}</h2>
          <p className="text-white/80">{infoText}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
