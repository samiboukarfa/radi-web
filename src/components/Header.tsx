
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { getUserSession, clearUserSession, isAuthenticated } from '@/utils/auth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('EN');
  const [user, setUser] = useState(getUserSession());
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserSession());
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'EN' ? 'AR' : prev === 'AR' ? 'FR' : 'EN');
  };

  const handleLogout = () => {
    clearUserSession();
    setUser(null);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-agri-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-2xl font-bold text-agri-green">RADI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-agri-green transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-agri-green transition-colors">About</a>
            <a href="#services" className="text-gray-700 hover:text-agri-green transition-colors">Services</a>
            <a href="#contact" className="text-gray-700 hover:text-agri-green transition-colors">Contact</a>
          </nav>

          {/* Language Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              {language}
            </button>
            
            {isAuthenticated() && user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <Button onClick={handleLogout} variant="outline" className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-agri-green hover:bg-agri-green-dark text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 my-1 transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-agri-green transition-colors">Home</a>
              <a href="#about" className="text-gray-700 hover:text-agri-green transition-colors">About</a>
              <a href="#services" className="text-gray-700 hover:text-agri-green transition-colors">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-agri-green transition-colors">Contact</a>
              <div className="flex items-center space-x-4 pt-4">
                <button 
                  onClick={toggleLanguage}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium"
                >
                  {language}
                </button>
                
                {isAuthenticated() && user ? (
                  <>
                    <span className="text-sm text-gray-600">{user.name}</span>
                    <Button onClick={handleLogout} size="sm" variant="outline" className="border-agri-green text-agri-green">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button variant="outline" size="sm" className="border-agri-green text-agri-green">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm" className="bg-agri-green text-white">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
