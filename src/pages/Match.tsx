import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Map, List, Filter, Truck, Star, Phone, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockRecipients } from '../utils/mockData';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Match: React.FC = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [filters, setFilters] = useState({
    category: 'all',
    radius: 10,
    pickupOnly: false
  });
  
  const classification = location.state?.classification || 'compost';
  const [recipients, setRecipients] = useState(mockRecipients);

  useEffect(() => {
    // Filter recipients based on classification
    const filtered = mockRecipients.filter(recipient => 
      recipient.acceptsTypes.includes(classification)
    );
    setRecipients(filtered);
  }, [classification]);

  const filteredRecipients = recipients.filter(recipient => {
    if (filters.category !== 'all' && recipient.type !== filters.category) return false;
    if (recipient.distance > filters.radius) return false;
    if (filters.pickupOnly && !recipient.pickupAvailable) return false;
    return true;
  });

  const getRecipientTypeColor = (type: string) => {
    switch (type) {
      case 'farmer': return 'text-green-600 bg-green-100';
      case 'composter': return 'text-blue-600 bg-blue-100';
      case 'animal_shelter': return 'text-purple-600 bg-purple-100';
      case 'biogas_plant': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleConnect = (recipientId: string) => {
    alert(`Connection request sent to recipient ${recipientId}!`);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Find Perfect Matches
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect with local recipients for your {classification} waste
          </p>
        </motion.div>

        {/* Filters and View Toggle */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="all">All Types</option>
                  <option value="farmer">Farmers</option>
                  <option value="composter">Composters</option>
                  <option value="animal_shelter">Animal Shelters</option>
                  <option value="biogas_plant">Biogas Plants</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Radius (km)
                </label>
                <select
                  value={filters.radius}
                  onChange={(e) => setFilters({ ...filters, radius: parseInt(e.target.value) })}
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={25}>25 km</option>
                  <option value={50}>50 km</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pickup-only"
                  checked={filters.pickupOnly}
                  onChange={(e) => setFilters({ ...filters, pickupOnly: e.target.checked })}
                  className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label htmlFor="pickup-only" className="text-sm text-gray-700 dark:text-gray-300">
                  Pickup available only
                </label>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'map' ? 'primary' : 'outline'}
                onClick={() => setViewMode('map')}
                icon={Map}
              >
                Map View
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                onClick={() => setViewMode('list')}
                icon={List}
              >
                List View
              </Button>
            </div>
          </div>
        </Card>

        {/* Content */}
        {viewMode === 'map' ? (
          <Card className="p-0 overflow-hidden h-96 md:h-[500px]">
            <MapContainer
              center={[28.6139, 77.2090]}
              zoom={11}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredRecipients.map((recipient) => (
                <Marker
                  key={recipient.id}
                  position={[recipient.location.lat, recipient.location.lng]}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-gray-900">{recipient.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{recipient.location.address}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(recipient.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-1 text-sm text-gray-600">{recipient.rating}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleConnect(recipient.id)}
                        className="mt-2"
                      >
                        Connect
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipients.map((recipient, index) => (
              <motion.div
                key={recipient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {recipient.name}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRecipientTypeColor(recipient.type)}`}>
                        {recipient.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(recipient.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                        {recipient.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    📍 {recipient.location.address} • {recipient.distance} km away
                  </p>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Accepts:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipient.acceptsTypes.map((type) => (
                        <span
                          key={type}
                          className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {type.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {recipient.pickupAvailable && (
                    <div className="flex items-center text-green-600 dark:text-green-400 mb-4">
                      <Truck className="h-4 w-4 mr-1" />
                      <span className="text-sm">Pickup available</span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleConnect(recipient.id)}
                      className="flex-1"
                    >
                      Connect
                    </Button>
                    <Button variant="outline" size="sm" icon={MessageCircle}>
                      Message
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {filteredRecipients.length === 0 && (
          <Card className="p-8 text-center">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No matches found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your filters to find more recipients in your area.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Match;