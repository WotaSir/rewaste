import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, Recycle, TrendingUp, MapPin, Calendar, Award, Globe } from 'lucide-react';
import Card from '../components/ui/Card';
import { mockLeaderboard } from '../utils/mockData';

const Admin: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');

  const communityStats = [
    {
      icon: Users,
      title: 'Active Users',
      value: '12,847',
      change: '+23%',
      color: 'text-blue-600'
    },
    {
      icon: Recycle,
      title: 'Waste Diverted',
      value: '2,340kg',
      change: '+18%',
      color: 'text-green-600'
    },
    {
      icon: Globe,
      title: 'CO₂ Saved',
      value: '1,247kg',
      change: '+15%',
      color: 'text-purple-600'
    },
    {
      icon: Award,
      title: 'Matches Made',
      value: '892',
      change: '+31%',
      color: 'text-orange-600'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      user: 'Sarah Johnson',
      action: 'Connected with Green Valley Farm',
      amount: '5.2kg vegetable scraps',
      time: '2 hours ago',
      location: 'Brooklyn, NY'
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'Added bread waste for animal feed',
      amount: '3.1kg bread products',
      time: '4 hours ago',
      location: 'Manhattan, NY'
    },
    {
      id: 3,
      user: 'Emma Davis',
      action: 'Completed pickup with City Composters',
      amount: '8.7kg organic waste',
      time: '6 hours ago',
      location: 'Queens, NY'
    },
    {
      id: 4,
      user: 'Restaurant ABC',
      action: 'Bulk upload - 45 items',
      amount: '156kg mixed food waste',
      time: '8 hours ago',
      location: 'Lower East Side, NY'
    }
  ];

  const regionalData = [
    { region: 'New York', users: 3420, waste: 892, growth: 28 },
    { region: 'California', users: 2890, waste: 756, growth: 22 },
    { region: 'Texas', users: 2156, waste: 623, growth: 19 },
    { region: 'Florida', users: 1934, waste: 541, growth: 31 },
    { region: 'Illinois', users: 1678, waste: 445, growth: 16 }
  ];

  const wasteCategories = [
    { category: 'Compost', amount: 1456, percentage: 62 },
    { category: 'Animal Feed', amount: 578, percentage: 25 },
    { category: 'Biogas', amount: 306, percentage: 13 }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor community impact and platform performance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {communityStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {stat.change} from last month
                    </p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Waste Categories */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Waste Categories
              </h2>
              <BarChart className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-4">
              {wasteCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.category}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {category.amount}kg ({category.percentage}%)
                    </span>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Regional Performance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Regional Performance
              </h2>
              <MapPin className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {region.region}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {region.users.toLocaleString()} users • {region.waste}kg diverted
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium">+{region.growth}%</p>
                    <p className="text-xs text-gray-500">growth</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <Calendar className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {activity.amount}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.location} • {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Contributors */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Top Contributors
              </h2>
              <TrendingUp className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-4">
              {mockLeaderboard.slice(0, 5).map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-white' :
                      index === 1 ? 'bg-gray-400 text-white' :
                      index === 2 ? 'bg-orange-500 text-white' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.displayName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user.totalWasteDiverted}kg diverted
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{user.ecoScore}</p>
                    <p className="text-xs text-gray-500">eco points</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Environmental Impact Summary */}
        <Card className="p-8 mt-8" glass>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Community Environmental Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-bold text-green-600 mb-2">4,921</p>
                <p className="text-gray-600 dark:text-gray-300">Trees Worth of CO₂ Saved</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600 mb-2">18,736</p>
                <p className="text-gray-600 dark:text-gray-300">Meals Worth Rescued</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600 mb-2">28,691</p>
                <p className="text-gray-600 dark:text-gray-300">Car Miles Offset</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600 mb-2">156</p>
                <p className="text-gray-600 dark:text-gray-300">Active Recipients</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Admin;