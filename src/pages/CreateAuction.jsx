import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CreateAuction = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [startingBid, setStartingBid] = useState('');
  const [auctionStartTime, setAuctionStartTime] = useState(new Date());
  const [auctionEndTime, setAuctionEndTime] = useState(new Date());

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      image,
      startingBid,
      auctionStartTime,
      auctionEndTime,
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-100 min-h-screen py-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">List Your Item</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="text-gray-700 font-bold block mb-2">Title</label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-200"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description" className="text-gray-700 font-bold block mb-2">Description</label>
              <textarea
                id="description"
                rows="4"
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-200"
                placeholder="Describe your item"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image" className="text-gray-700 font-bold block mb-2">Item Image</label>
              <input
                type="file"
                id="image"
                className="w-full"
                onChange={handleImageChange}
              />
              {image && <img src={image} alt="Item Preview" className="mt-4 rounded-md shadow-md" />}
            </div>
            <div>
              <label htmlFor="startingBid" className="text-gray-700 font-bold block mb-2">Starting Bid</label>
              <input
                type="number"
                id="startingBid"
                className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-200"
                placeholder="Enter starting bid"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="auctionStartTime" className="text-gray-700 font-bold block mb-2">Auction Start Time</label>
                <DatePicker
                  selected={auctionStartTime}
                  onChange={(date) => setAuctionStartTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-200"
                />
              </div>
              <div>
                <label htmlFor="auctionEndTime" className="text-gray-700 font-bold block mb-2">Auction End Time</label>
                <DatePicker
                  selected={auctionEndTime}
                  onChange={(date) => setAuctionEndTime(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-200"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full block"
              >
                Create Auction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;