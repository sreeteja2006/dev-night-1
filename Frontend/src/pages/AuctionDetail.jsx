import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, User, DollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';
import { auctionAPI, isAuthenticated } from '../services/api';

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [bidding, setBidding] = useState(false);
  const [error, setError] = useState('');
  const [bidError, setBidError] = useState('');

  useEffect(() => {
    fetchAuctionDetails();
    fetchBids();
  }, [id]);

  const fetchAuctionDetails = async () => {
    try {
      const response = await auctionAPI.getAuction(id);
      setAuction(response.auction);
    } catch (err) {
      setError('Failed to load auction details');
    } finally {
      setLoading(false);
    }
  };

  const fetchBids = async () => {
    try {
      const response = await auctionAPI.getAuctionBids(id);
      setBids(response.bids || []);
    } catch (err) {
      console.error('Failed to load bids:', err);
    }
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    setBidding(true);
    setBidError('');

    try {
      const amount = parseFloat(bidAmount);
      if (amount <= auction.current_bid) {
        setBidError('Bid must be higher than current bid');
        return;
      }

      await auctionAPI.placeBid(id, amount);
      setBidAmount('');
      
      // Refresh auction and bids
      await fetchAuctionDetails();
      await fetchBids();
      
      alert('Bid placed successfully!');
    } catch (err) {
      setBidError(err.message);
    } finally {
      setBidding(false);
    }
  };

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
    if (!auction) return false;
    const now = new Date();
    const endTime = new Date(auction.end_time);
    return now < endTime && auction.status === 'active';
  };

  const getTimeRemaining = () => {
    if (!auction) return '';
    const now = new Date();
    const endTime = new Date(auction.end_time);
    const diff = endTime - now;
    
    if (diff <= 0) return 'Auction ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="bg-gray-950 min-h-screen text-white">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading auction details...</div>
        </div>
      </div>
    );
  }

  if (error || !auction) {
    return (
      <div className="bg-gray-950 min-h-screen text-white">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-red-400">{error || 'Auction not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Auction Image and Details */}
          <div>
            {auction.image_url && (
              <img 
                src={auction.image_url} 
                alt={auction.title}
                className="w-full h-96 object-cover rounded-lg mb-6"
              />
            )}
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-4">{auction.title}</h1>
              <p className="text-gray-300 mb-6">{auction.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-green-400 mr-2" size={20} />
                    <span className="text-gray-400">Starting Bid</span>
                  </div>
                  <div className="text-xl font-semibold">${auction.starting_bid}</div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <DollarSign className="text-green-400 mr-2" size={20} />
                    <span className="text-gray-400">Current Bid</span>
                  </div>
                  <div className="text-xl font-semibold text-green-400">${auction.current_bid}</div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="text-blue-400 mr-2" size={20} />
                    <span className="text-gray-400">Time Left</span>
                  </div>
                  <div className="text-lg font-semibold">{getTimeRemaining()}</div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <User className="text-purple-400 mr-2" size={20} />
                    <span className="text-gray-400">Status</span>
                  </div>
                  <div className={`text-lg font-semibold ${isAuctionActive() ? 'text-green-400' : 'text-red-400'}`}>
                    {isAuctionActive() ? 'Active' : 'Ended'}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                <div>Auction ends: {formatDate(auction.end_time)}</div>
                <div>Started: {formatDate(auction.start_time)}</div>
              </div>
            </div>
          </div>
          
          {/* Bidding Section */}
          <div>
            {/* Place Bid */}
            {isAuctionActive() && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Place Your Bid</h2>
                
                <form onSubmit={handlePlaceBid}>
                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">
                      Bid Amount (minimum: ${auction.current_bid + 0.01})
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min={auction.current_bid + 0.01}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter bid amount"
                      required
                    />
                  </div>
                  
                  {bidError && (
                    <div className="text-red-400 text-sm mb-4">{bidError}</div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={bidding}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {bidding ? 'Placing Bid...' : 'Place Bid'}
                  </button>
                </form>
                
                {!isAuthenticated() && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => navigate('/login')}
                      className="text-purple-400 hover:text-purple-300 underline"
                    >
                      Login to place a bid
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Bid History */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Bid History</h2>
              
              {bids.length === 0 ? (
                <div className="text-gray-400 text-center py-4">
                  No bids yet. Be the first to bid!
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {bids.map((bid, index) => (
                    <div key={bid.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                      <div>
                        <div className="font-semibold">${bid.bid_amount}</div>
                        <div className="text-sm text-gray-400">
                          {formatDate(bid.bid_time)}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        Bidder #{bid.bidder_id}
                        {index === 0 && (
                          <span className="ml-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                            Highest
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;