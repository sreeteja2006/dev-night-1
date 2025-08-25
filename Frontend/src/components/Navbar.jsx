import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { authAPI, isAuthenticated } from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    authAPI.logout();
    navigate('/');
    window.location.reload(); // Refresh to update authentication state
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80"
        onClick={handleHome}
      >
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
        {authenticated ? (
          <>
            <button 
              onClick={() => navigate('/create-auction')}
              className="flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-md text-sm"
            >
              <Settings size={16} /> Create Auction
            </button>
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm">
              <User size={16} /> Profile
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm"
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleLogin}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm"
            >
              <LogIn size={16} /> Login
            </button>
            <button 
              onClick={handleSignup}
              className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm"
            >
              <UserPlus size={16} /> Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
