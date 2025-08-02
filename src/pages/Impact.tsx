import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Leaf, Zap, Users, Award, TrendingUp, Target, Recycle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/ui/Card';
import { mockLeaderboard } from '../utils/mockData';

const Impact: React.FC = () => {
  const { currentUser } = useAuth();

  const impactStats = [
    {
      icon: Recycle,
      title: 'Waste Diverted',
      value: currentUser?.totalWasteDiverted || 0,
      unit: 'kg',
      color: 'text-green-600'
    },
    {
      icon: Leaf,
      title: 'CO₂ Saved',
      value: currentUser?.co2Saved || 0,
      unit: 'kg',
      color: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Connections Made',
      value: 12,
      unit: '',
      color: 'text-purple-600'
    },
    {
      icon: Zap,
      title: 'Eco Score',
      value: currentUser?.ecoScore || 0,
      unit: 'pts',
      color: 'text-orange-600'
    }
  ];

  const achievements = [
    {
      id: 1,
      name: 'First Steps',
      description: 'Shared your first waste item',
      icon: '🌱',
      progress: 100,
      unlocked: true
    },
    {
      id: 2,
      name: 'Eco Helper',
      description: 'Diverted 10kg from landfill',
      icon: '🌿',
      progress: 100,
      unlocked: true
    },
    {
      id: 3,
      name: 'Green Champion',
      description: 'Made 25 successful connections',
      icon: '🏆',
      progress: 48,
      unlocked: false
    },
    {
      id: 4,
      name: 'Sustainability Star',
      description: 'Saved 100kg of CO₂ emissions',
      icon: '⭐',
      progress: 24,
      unlocked: false
    },
    {
      id: 5,
      name: 'Community Leader',
      description: 'Reach top 10 in local leaderboard',
      icon: '👑',
      progress: 0,
      unlocked: false
    },
    {
      id: 6,
      name: 'Waste Warrior',
      description: 'Divert 500kg of waste',
      icon: '⚔️',
      progress: 9,
      unlocked: false
    }
  ];

  const monthlyData = [
    { month: 'Jan', waste: 8.2, co2: 4.3 },
    { month: 'Feb', waste: 12.5, co2: 6.7 },
    { month: 'Mar', waste: 9.8, co2: 5.2 },
    { month: 'Apr', waste: 15.2, co2: 8.1 },
    { month: 'May', waste: 18.6, co2: 9.8 },
    { month: 'Jun', waste: 22.1, co2: 11.7 }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-green-900/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Your Impact Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Track your environmental contribution and celebrate milestones
          </p>
        </motion.div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center" glass>
                <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                  <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{stat.title}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Progress Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Monthly Progress
              </h2>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                    {data.month}
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.waste / 25) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-900 dark:text-white w-16 text-right">
                    {data.waste}kg
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Leaderboard */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Community Leaderboard
              </h2>
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="space-y-4">
              {mockLeaderboard.slice(0, 5).map((user, index) => (
                <div key={user.id} className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500 text-white' :
                    index === 1 ? 'bg-gray-400 text-white' :
                    index === 2 ? 'bg-orange-500 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user.totalWasteDiverted}kg diverted
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{user.ecoScore}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Achievements & Badges
            </h2>
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  {achievement.unlocked && (
                    <div className="text-green-600 font-semibold text-sm">UNLOCKED</div>
                  )}
                </div>
                <h3 className={`font-semibold mb-1 ${
                  achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.name}
                </h3>
                <p className={`text-sm mb-3 ${
                  achievement.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {achievement.description}
                </p>
                {!achievement.unlocked && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Environmental Impact */}
        <Card className="p-6 mt-8" glass>
          <div className="text-center">
            <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Environmental Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {(currentUser?.totalWasteDiverted || 0) * 2.1}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Equivalent trees saved
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round((currentUser?.totalWasteDiverted || 0) * 0.8)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Meals worth of food rescued
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round((currentUser?.co2Saved || 0) * 2.3)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Car miles offset
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Impact;