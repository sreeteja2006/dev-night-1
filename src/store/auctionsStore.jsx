
import React, { useState } from 'react';

export function useAuction(){
  const [auctions, setAuctions] = useState([]);

  const addAuction = (auction) => {
    setAuctions((prevAuctions) => [...prevAuctions, auction]);
    console.log('New auction added:', auction); // For debugging
    console.log('Current auctions:', auctions); // For debugging
  };

  const getAuctions = () => {
    return auctions;
  };

  return { addAuction, getAuctions };
}

