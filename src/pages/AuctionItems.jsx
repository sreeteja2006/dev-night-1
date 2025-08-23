
const AuctionItems = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Auctions</h2>
      <div className="grid gap-6">
        {auctions.map((auction, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-4 rounded-lg shadow-md max-w-sm"
          >
            <h3 className="text-lg font-semibold mb-2">{auction.title}</h3>
            <p className="text-gray-300 mb-3">{auction.description}</p>
            <p>
              <span className="font-semibold">Starting Bid:</span> ${auction.startingBid}
            </p>
            <p>
              <span className="font-semibold">Current Highest Bid:</span> ${auction.currentBid}
            </p>
            <p>
              <span className="font-semibold">Auction Ends:</span>{" "}
              {new Date(auction.endDate).toString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionItems