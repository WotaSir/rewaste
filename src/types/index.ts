export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  ecoScore: number;
  totalWasteDiverted: number;
  co2Saved: number;
  badges: Badge[];
}

export interface WasteItem {
  id: string;
  userId: string;
  imageUrl: string;
  foodType: string;
  quantity: number;
  expiryDate: string;
  classification: 'compost' | 'animal_feed' | 'biogas';
  status: 'available' | 'matched' | 'completed';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  createdAt: Date;
}

export interface Recipient {
  id: string;
  name: string;
  type: 'farmer' | 'composter' | 'animal_shelter' | 'biogas_plant';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  acceptsTypes: string[];
  rating: number;
  pickupAvailable: boolean;
  distance: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Match {
  id: string;
  wasteId: string;
  recipientId: string;
  status: 'pending' | 'accepted' | 'completed';
  scheduledPickup?: Date;
}