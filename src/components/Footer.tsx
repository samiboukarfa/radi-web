import React from 'react';
import { Separator } from '@/components/ui/separator';
const Footer = () => {
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-agri-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-2xl font-bold">RADI</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transforming agricultural insurance through AI-powered climate risk assessment for Algeria.
            </p>
            <div className="space-y-2 text-sm">
              <p>📍 Algiers Technology Park, Algeria</p>
              <p>📞 +213 (0) 555 123 456</p>
              <p>✉️ contact@radi-app.dz</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Risk Assessment</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Weather Monitoring</a>
              
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics Dashboard</a>
            </nav>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal & Support</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Support Center</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-300 text-sm">
            © 2025 RADI App - Agricultural Innovation for Algeria. All rights reserved.
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-agri-green transition-colors">
              <span className="text-sm">f</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-blue transition-colors">
              <span className="text-sm">t</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-agri-green transition-colors">
              <span className="text-sm">in</span>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-sky-blue transition-colors">
              <span className="text-sm">@</span>
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;