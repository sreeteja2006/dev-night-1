import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ShoppingCart, Search, Plus, Clock, Mail, Lock } from "lucide-react";
import { auctionAPI } from "../services/api";

export default function HomePage() {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const response = await auctionAPI.getAllAuctions();
      setAuctions(response.auctions || []);
    } catch (err) {
      setError('Failed to load auctions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAuction = () => {
    navigate('/create-auction');
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      {/* Navbar */}
      <Navbar />


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

        <div className="mt-6 flex justify-center gap-4">
          <button 
            onClick={() => document.getElementById('auctions-section').scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
          >
            <Search size={18} /> Browse Auctions
          </button>
          <button 
            onClick={handleCreateAuction}
            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md"
          >
            <Plus size={18} /> Start Selling
          </button>
        </div>
      </section>

      <section id="auctions-section" className="py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Current Auctions
        </h2>
        
        {loading && (
          <div className="text-center">
            <div className="text-gray-400">Loading auctions...</div>
          </div>
        )}
        
        {error && (
          <div className="text-center text-red-400 mb-4">{error}</div>
        )}
        
        {!loading && auctions.length === 0 && (
          <div className="text-center text-gray-400">
            No auctions available. Be the first to create one!
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      </section>

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

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="flex justify-center mb-3 text-purple-400">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

// Auction Card Component
function AuctionCard({ auction }) {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
    
  year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAuctionActive = () => {
    const now = new Date();
    const endTime = new Date(auction.end_time);
    return now < endTime && auction.status === 'active';
  };

  const handleViewAuction = () => {
    navigate(`/auction/${auction.id}`);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {auction.image_url && (
        <img 
          src={auction.image_url} 
          alt={auction.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{auction.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{auction.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Current Bid:</span>
            <span className="text-green-400 font-semibold">${auction.current_bid}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className={`font-semibold ${isAuctionActive() ? 'text-green-400' : 'text-red-400'}`}>
              {isAuctionActive() ? 'Active' : 'Ended'}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Ends: {formatDate(auction.end_time)}
          </div>
        </div>
        
        <button 
          onClick={handleViewAuction}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          View Details & Bid
        </button>
      </div>
    </div>
  );
}