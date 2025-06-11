
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Eye, Shield } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: '1',
      icon: MapPin,
      title: 'Register & Add Your Plots',
      description: 'Create your account and map your agricultural plots using our intuitive interface'
    },
    {
      number: '2',
      icon: Eye,
      title: 'Monitor Real-time Risk Data',
      description: 'Track weather patterns, soil conditions, and satellite imagery in real-time'
    },
    {
      number: '3',
      icon: Shield,
      title: 'receive instant alerts notifications',
      description: 'Receive instant notifications'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple 3-Step Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with RADI in just three easy steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection Lines for Desktop */}
          <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-agri-green to-sky-blue"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="hover-lift bg-white border-2 border-gray-200 hover:border-agri-green transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 w-20 h-20 bg-agri-green rounded-full flex items-center justify-center relative">
                    <step.icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-blue rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{step.number}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Arrow for Mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center mt-4 mb-4">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-agri-green"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
