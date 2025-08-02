import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, MapPin, Calendar, Package, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { classifyWaste } from '../utils/mockData';

const AddWaste: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expiryDate: '',
    location: '',
    image: null as File | null
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [classification, setClassification] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const result = classifyWaste(formData.foodType);
      setClassification(result);
      setIsProcessing(false);
      
      // After showing classification, redirect to match page
      setTimeout(() => {
        navigate('/match', { state: { classification: result } });
      }, 2000);
    }, 2000);
  };

  const getClassificationInfo = (type: string) => {
    switch (type) {
      case 'compost':
        return {
          title: 'Perfect for Composting! 🌱',
          description: 'Your waste is ideal for creating nutrient-rich compost',
          color: 'text-green-600'
        };
      case 'animal_feed':
        return {
          title: 'Great for Animal Feed! 🐄',
          description: 'This can be safely used as animal feed',
          color: 'text-blue-600'
        };
      case 'biogas':
        return {
          title: 'Suitable for Biogas! ⚡',
          description: 'Can be processed into renewable energy',
          color: 'text-purple-600'
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-green-900/10">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Add Your Food Waste
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Let our AI help you find the perfect match for your waste
          </p>
        </motion.div>

        <Card className="p-8" glass>
          {!classification ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Image <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    required
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {formData.image ? (
                      <div>
                        <Camera className="h-12 w-12 text-green-600 mx-auto mb-4" />
                        <p className="text-green-600 font-medium">{formData.image.name}</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Food Type */}
              <Input
                label="Food Type"
                value={formData.foodType}
                onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                placeholder="e.g., Vegetable scraps, Bread, Rice"
                required
                icon={Package}
              />

              {/* Quantity */}
              <Input
                label="Quantity (kg)"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g., 2.5"
                required
                icon={Package}
              />

              {/* Expiry Date */}
              <Input
                label="Expiry Date"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                required
                icon={Calendar}
              />

              {/* Location */}
              <Input
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Manhattan, NY"
                required
                icon={MapPin}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing with AI...
                  </div>
                ) : (
                  'Submit for AI Classification'
                )}
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-10 w-10 text-white" />
              </div>
              
              {(() => {
                const info = getClassificationInfo(classification);
                return info ? (
                  <>
                    <h2 className={`text-2xl font-bold mb-4 ${info.color}`}>
                      {info.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {info.description}
                    </p>
                  </>
                ) : null;
              })()}
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Redirecting to find matches...
              </p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AddWaste;