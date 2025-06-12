
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Basic Plan',
      price: '24,000',
      period: 'semester',
      description: 'Perfect for small farmers who want low-cost, simple protection against climate risk',
      features: [
        'Up to 2 plots',
        'Max Area: 5 hectares',
        'Essential weather alerts',
        'Basic risk score calculation'
      ],
      color: 'agri-green',
      bgColor: 'bg-agri-green-light',
      textColor: 'text-agri-green',
      buttonColor: 'bg-agri-green hover:bg-agri-green-dark',
      popular: false
    },
    {
      name: 'Pro Plan',
      price: '72,000',
      period: 'semester',
      description: 'Ideal for cooperatives, large farms, or businesses needing insights and regular monitoring',
      features: [
        'Up to 15 plots',
        'Max Area: 100 hectares',
        'All Basic features',
        'Weekly risk reports',
        'Interactive dashboards',
        'Urgent alerts (App / SMS / Email)',
        'Detailed field reports (crop/soil/health)',
        'Yield prediction',
        'Historical comparison (3 years)'
      ],
      color: 'sky-blue',
      bgColor: 'bg-sky-blue-light',
      textColor: 'text-sky-blue',
      buttonColor: 'bg-sky-blue hover:bg-sky-blue-dark',
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Free Trial Banner */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-agri-green to-sky-blue text-white px-8 py-3 rounded-full text-lg font-bold mb-6">
            <Star className="inline-block w-5 h-5 mr-2" />
            ONE MONTH FREE TRIAL
            <Star className="inline-block w-5 h-5 ml-2" />
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with a free month and choose the plan that best fits your farming needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`hover-lift bg-white border-2 transition-all duration-300 hover:shadow-xl relative ${
                plan.popular ? 'border-sky-blue scale-105' : 'border-gray-200 hover:border-agri-green'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-sky-blue text-white px-6 py-2 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className={`text-2xl font-bold ${plan.textColor}`}>
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <div className="text-4xl font-bold text-gray-900">
                    {plan.price} <span className="text-lg text-gray-600">DA</span>
                  </div>
                  <div className="text-gray-600">per {plan.period}</div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {plan.description}
                </CardDescription>
                
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className={`w-5 h-5 rounded-full ${plan.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className={`w-3 h-3 ${plan.textColor}`} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full text-white ${plan.buttonColor} text-lg py-6`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* IoT Add-on Section */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gray-50 border-2 border-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Optional Add-On
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="text-2xl font-bold text-gray-900">
                  IoT Subscription
                </div>
                <div className="text-xl font-semibold text-sky-blue">
                  4,000 DA / semester
                </div>
              </div>
              <CardDescription className="text-gray-600">
                Enhanced monitoring with IoT sensors for real-time soil and environmental data
              </CardDescription>
              <div className="text-sm text-gray-500">
                Available for any plan
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
