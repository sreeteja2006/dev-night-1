const API_BASE_URL = 'http://localhost:8080';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  
  return response.json();
};

// Auth API
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    
    return response.json();
  },
  
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Auction API
export const auctionAPI = {
  createAuction: async (auctionData) => {
    return makeAuthenticatedRequest('/auctions', {
      method: 'POST',
      body: JSON.stringify(auctionData),
    });
  },
  
  getAllAuctions: async () => {
    const response = await fetch(`${API_BASE_URL}/auctions`);
    if (!response.ok) {
      throw new Error('Failed to fetch auctions');
    }
    return response.json();
  },
  
  getAuction: async (id) => {
    const response = await fetch(`${API_BASE_URL}/auctions/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch auction');
    }
    return response.json();
  },
  
  placeBid: async (auctionId, bidAmount) => {
    return makeAuthenticatedRequest(`/auctions/${auctionId}/bids`, {
      method: 'POST',
      body: JSON.stringify({
        auction_id: auctionId,
        bid_amount: bidAmount,
      }),
    });
  },
  
  getAuctionBids: async (auctionId) => {
    const response = await fetch(`${API_BASE_URL}/auctions/${auctionId}/bids`);
    if (!response.ok) {
      throw new Error('Failed to fetch bids');
    }
    return response.json();
  },
};

// Utility function to check if user is authenticated
export const isAuthenticated = () => {
  return !!getAuthToken();
};