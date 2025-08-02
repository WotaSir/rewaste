import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import FloatingLeaves from './components/animations/FloatingLeaves';
import Home from './pages/Home';
import AddWaste from './pages/AddWaste';
import Match from './pages/Match';
import Impact from './pages/Impact';
import About from './pages/About';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 relative">
            <FloatingLeaves />
            <Navigation />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-waste" element={<AddWaste />} />
                <Route path="/match" element={<Match />} />
                <Route path="/impact" element={<Impact />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;