import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Target, Users, Globe, Heart, Lightbulb, Shield, Award } from 'lucide-react';
import Card from '../components/ui/Card';

const About: React.FC = () => {
  const mission = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To create a world where food waste becomes a valuable resource, not environmental burden.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Connecting communities worldwide to reduce the 1.3 billion tons of food wasted annually.'
    },
    {
      icon: Heart,
      title: 'Social Good',
      description: 'Building sustainable communities through local resource sharing and environmental stewardship.'
    }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: 'AI-Powered Classification',
      description: 'Advanced machine learning algorithms classify waste for optimal resource matching.'
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Connect with local farmers, composters, and shelters in your neighborhood.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Verified recipients and secure communication ensure safe exchanges.'
    },
    {
      icon: Award,
      title: 'Gamified Experience',
      description: 'Earn badges, track impact, and compete with friends to maximize your contribution.'
    }
  ];

  const team = [
    {
      name: 'FAKE CEO',
      role: 'CEO & Co-founder',
      bio: 'Environmental scientist with 10+ years in sustainability tech.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'CTO',
      role: 'CTO & Co-founder',
      bio: 'Former Google engineer specializing in AI and machine learning.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'WOOA',
      role: 'Head of Partnerships',
      bio: 'Community organizer with extensive experience in local business networks.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const faqs = [
    {
      question: 'How does the AI classification work?',
      answer: 'Our AI analyzes images and descriptions of food waste to determine the best use case - whether for composting, animal feed, or biogas production. It considers factors like food type, freshness, and local recipient needs.'
    },
    {
      question: 'Is ReWaste free to use?',
      answer: 'Yes! ReWaste is completely free for individuals. We believe in making sustainability accessible to everyone. We generate revenue through partnerships with commercial waste producers.'
    },
    {
      question: 'How do you ensure food safety?',
      answer: 'All recipients are verified partners who follow proper food safety protocols. We provide guidelines for what types of waste are acceptable and have quality control measures in place.'
    },
    {
      question: 'What happens to my data?',
      answer: 'We take privacy seriously. Your personal data is encrypted and never shared with third parties. Location data is anonymized and used only for matching purposes.'
    },
    {
      question: 'Can businesses use ReWaste?',
      answer: 'Absolutely! We have special programs for restaurants, grocery stores, and other commercial food waste producers. Contact us for enterprise solutions.'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-green-900/10 py-16 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About ReWaste
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              We're on a mission to transform the way the world thinks about food waste. 
              Through AI-powered matching and community connections, we're building a 
              sustainable future where nothing goes to waste.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Vision for Change
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Food waste is one of the world's biggest environmental challenges. 
              We're creating the technology and community to solve it.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mission.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 text-center h-full" glass>
                  <item.icon className="h-12 w-12 text-green-600 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How We Make It Happen
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology meets community spirit to create meaningful environmental impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <feature.icon className="h-10 w-10 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate innovators dedicated to creating a more sustainable world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.bio}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to know about ReWaste
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-16 rounded-2xl">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join the Movement?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Start making a difference today. Every piece of waste diverted counts!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;