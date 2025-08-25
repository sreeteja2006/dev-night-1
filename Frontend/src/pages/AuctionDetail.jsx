import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { auctionAPI, isAuthenticated } from '../services/api';

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [auctionRes, bidsRes] = await Promise.all([
          auctionAPI.getAuction(id),
          auctionAPI.getAuctionBids(id)
        ]);
        setAuction(auctionRes.auction);
        setBids(bidsRes.bids || []);
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    if (!isAuthenticated()) return navigate('/login');

    try {
      await auctionAPI.placeBid(id, parseFloat(bidAmount));
      setBidAmount('');
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const isActive = auction && new Date() < new Date(auction.end_time);

  if (loading || !auction) {
    return (
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <div className="p-8 text-center">
          {loading ? 'Loading...' : 'Auction not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Image & Info */}
          <div>
            {auction.image_url && (
              <img
                src={auction.image_url}
                alt={auction.title}
                className="w-full max-h-80 object-contain rounded mb-4 bg-gray-800"
              />
            )}
            <h1 className="text-2xl font-bold mb-2">{auction.title}</h1>
            <p className="text-gray-300 mb-4">{auction.description}</p>

            <div className="bg-gray-800 p-4 rounded">
              <div className="flex justify-between mb-2">
                <span>Starting: ${auction.starting_bid}</span>
                <span className="text-green-400">Current: ${auction.current_bid}</span>
              </div>
              <div className="text-sm text-gray-400">
                Status: {isActive ? 'Active' : 'Ended'}
              </div>
            </div>
          </div>

          {/* Bidding */}
          <div>
            {isActive && (
              <div className="bg-gray-800 p-4 rounded mb-4">
                <h2 className="text-lg font-bold mb-3">Place Bid</h2>
                {!isAuthenticated() ? (
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                  >
                    Login to Bid
                  </button>
                ) : (
                  <form onSubmit={handleBid}>
                    <input
                      type="number"
                      step="0.01"
                      min={auction.current_bid + 0.01}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="w-full bg-gray-700 text-white p-2 rounded mb-2"
                      placeholder="Enter bid amount"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-green-600 text-white py-2 rounded"
                    >
                      Place Bid
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Bids */}
            <div className="bg-gray-800 p-4 rounded">
              <h2 className="text-lg font-bold mb-3">Bids ({bids.length})</h2>
              {bids.length === 0 ? (
                <p className="text-gray-400">No bids yet</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {bids.map((bid, i) => (
                    <div key={bid.id} className="flex justify-between bg-gray-700 p-2 rounded">
                      <span>${bid.bid_amount}</span>
                      <span className="text-sm text-gray-400">
                        {i === 0 && '👑 '} Bidder #{bid.bidder_id}
                      </span>
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