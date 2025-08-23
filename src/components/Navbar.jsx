import React from "react";
import { Settings, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate=useNavigate()
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div onClick={()=>{navigate('/')}} className="flex items-center gap-2">
        <div className="bg-emerald-500 p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
        <span className="font-semibold text-lg">Auction System</span>
      </div>

      {/* Right buttons */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm">
          <Settings size={16} /> Settings
        </button>
        <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm">
          <User size={16} /> Profile
        </button>
        <button onClick={()=>{navigate('/login')}} className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );
}
