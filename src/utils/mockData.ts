import { WasteItem, Recipient, User } from '../types';

export const mockWasteItems: WasteItem[] = [
  {
    id: '1',
    userId: 'user1',
    imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodType: 'Vegetable scraps',
    quantity: 2.5,
    expiryDate: '2025-01-05',
    classification: 'compost',
    status: 'available',
    location: { lat: 40.7128, lng: -74.0060, address: 'Manhattan, NY' },
    createdAt: new Date()
  },
  {
    id: '2',
    userId: 'user2',
    imageUrl: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=400',
    foodType: 'Bread and grains',
    quantity: 1.8,
    expiryDate: '2025-01-03',
    classification: 'animal_feed',
    status: 'available',
    location: { lat: 40.7589, lng: -73.9851, address: 'Brooklyn, NY' },
    createdAt: new Date()
  }
];

export const mockRecipients: Recipient[] = [
  {
    id: '1',
    name: 'Green Valley Farm',
    type: 'farmer',
    location: { lat: 40.7282, lng: -74.0776, address: 'Jersey City, NJ' },
    acceptsTypes: ['compost', 'animal_feed'],
    rating: 4.8,
    pickupAvailable: true,
    distance: 2.3
  },
  {
    id: '2',
    name: 'City Composting Hub',
    type: 'composter',
    location: { lat: 40.7505, lng: -73.9934, address: 'Queens, NY' },
    acceptsTypes: ['compost'],
    rating: 4.6,
    pickupAvailable: false,
    distance: 1.8
  },
  {
    id: '3',
    name: 'Happy Paws Shelter',
    type: 'animal_shelter',
    location: { lat: 40.7829, lng: -73.9654, address: 'Bronx, NY' },
    acceptsTypes: ['animal_feed'],
    rating: 4.9,
    pickupAvailable: true,
    distance: 3.1
  }
];

export const mockLeaderboard: User[] = [
  {
    id: '1',
    email: 'sarah@example.com',
    displayName: 'Sarah Green',
    ecoScore: 2450,
    totalWasteDiverted: 89.3,
    co2Saved: 47.2,
    badges: []
  },
  {
    id: '2',
    email: 'mike@example.com',
    displayName: 'Mike Ocean',
    ecoScore: 2180,
    totalWasteDiverted: 76.8,
    co2Saved: 41.5,
    badges: []
  },
  {
    id: '3',
    email: 'emma@example.com',
    displayName: 'Emma Earth',
    ecoScore: 1950,
    totalWasteDiverted: 65.4,
    co2Saved: 35.9,
    badges: []
  }
];

export const classifyWaste = (foodType: string): 'compost' | 'animal_feed' | 'biogas' => {
  const lowerType = foodType.toLowerCase();
  
  if (lowerType.includes('vegetable') || lowerType.includes('fruit') || lowerType.includes('scraps')) {
    return 'compost';
  } else if (lowerType.includes('bread') || lowerType.includes('grain') || lowerType.includes('rice')) {
    return 'animal_feed';
  } else {
    return 'biogas';
  }
};