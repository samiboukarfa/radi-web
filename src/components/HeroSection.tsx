import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserSession, getDashboardRoute } from '@/utils/auth';
const HeroSection = () => {
  const navigate = useNavigate();
  const user = getUserSession();
  const isLoggedIn = isAuthenticated();
  const handleFarmerClick = () => {
    navigate('/register');
  };
  const handleInsurerClick = () => {
    navigate('/register');
  };
  const handleDashboardClick = () => {
    if (user) {
      const dashboardRoute = getDashboardRoute(user.userType);
      navigate(dashboardRoute);
    }
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center" style={{
    backgroundImage: `linear-gradient(rgba(45, 80, 22, 0.7), rgba(45, 80, 22, 0.7)), url('/landing.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  }}>
      <div className="container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            RADI
          </h1>
          <h2 className="text-2xl md:text-3xl mb-4 font-semibold">
            Risk Assessment Driven by Innovation
          </h2>
          
          {/* Bilingual Slogans */}
          <div className="mb-6 space-y-3">
            <p className="text-xl md:text-2xl italic">decode the climate, defend your farm</p>
          </div>

          {/* Description Text */}
          <div className="mb-8">
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
              From the farm to the financial institution — RADI gives each user personalized tools to monitor, predict, and respond to climate threats.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
            {isLoggedIn && user ? <Button size="lg" className="bg-sky-blue hover:bg-sky-blue-dark text-white text-lg px-8 py-4 h-auto" onClick={handleDashboardClick}>
                Go to Dashboard
              </Button> : <>
                <Button size="lg" className="bg-sky-blue hover:bg-sky-blue-dark text-white text-lg px-8 py-4 h-auto" onClick={handleFarmerClick}>
                  Get Started as Farmer
                </Button>
                <Button size="lg" variant="outline" onClick={handleInsurerClick} className="border-white hover:text-agri-green text-lg px-8 py-4 h-auto bg-[agri-green-DEFAULT] bg-cyan-500 hover:bg-cyan-400 text-slate-50">
                  Join as Company
                </Button>
              </>}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sky-blue mb-2">500+</div>
              <div className="text-lg">Farmers Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sky-blue mb-2">15+</div>
              <div className="text-lg">Insurance subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-sky-blue mb-2">99%</div>
              <div className="text-lg">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;