import React from "react";
import Navbar from "../components/Navbar";
import { ShoppingCart, Search, Plus, Clock, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate=useNavigate()
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-800 p-3 rounded-full">
            <ShoppingCart size={30} />
          </div>
        </div>
        <h1 className="text-4xl font-bold">
          Discover Incredible Auctions
        </h1>
        <div className="mt-2 text-gray-300">
          Join the buzz and explore our vast collection of unique items available for bidding.
          Get the best deals and start your winning journey today!
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md">
            <Search size={18} /> Browse Auctions
          </button>
          <button onClick={()=>{navigate('/create-auction')}} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md">
            <Plus size={18} /> Start Selling
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900 py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Why Choose Our Auction Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Clock size={28} />}
            title="Real-Time Bidding"
            desc="Experience the thrill of live auctions with instant updates."
          />
          <FeatureCard
            icon={<Mail size={28} />}
            title="Email Notifications"
            desc="Stay updated with email alerts for bid activity."
          />
          <FeatureCard
            icon={<Lock size={28} />}
            title="Secure Transactions"
            desc="Bid with confidence through our secure payment system."
          />
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-3 text-purple-400">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}
