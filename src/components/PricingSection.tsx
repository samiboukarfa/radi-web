
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LandPlot, Layers, Sensor, Shield, CheckCircle, Clock, Phone, Mail, Smartphone } from 'lucide-react';

const PricingSection = () => {
  const [showFAQ, setShowFAQ] = useState(false);

  const pricingTiers = [
    {
      name: 'Basic Plan',
      price: '2,500',
      badge: 'Most Popular for Small Farms',
      badgeColor: 'bg-green-100 text-green-800',
      cardColor: 'border-green-200 hover:border-green-300',
      buttonColor: 'bg-agri-green hover:bg-agri-green-dark',
      features: [
        'Up to 3 plots',
        'Max Area: 50 hectares',
        'Basic weather alerts',
        'Risk score calculation',
        'Mobile app access',
        'Email support'
      ],
      cta: 'Start Basic Plan'
    },
    {
      name: 'Standard Plan',
      price: '4,000',
      badge: 'Best Value',
      badgeColor: 'bg-blue-100 text-blue-800',
      cardColor: 'border-sky-blue hover:border-sky-blue-dark ring-2 ring-sky-blue ring-opacity-20',
      buttonColor: 'bg-sky-blue hover:bg-sky-blue-dark',
      popular: true,
      features: [
        'Up to 20 plots',
        'Max Area: 200 hectares',
        'All Basic features',
        'Weekly risk reports',
        'Interactive visual dashboards',
        'Urgent alerts via App/SMS/Email',
        'Priority email support'
      ],
      cta: 'Choose Standard'
    },
    {
      name: 'Professional Plan',
      price: '9,000',
      badge: 'For Growing Operations',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      cardColor: 'border-emerald-200 hover:border-emerald-300',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700',
      features: [
        'Up to 100 plots',
        'Max Area: 500 hectares',
        'All Standard features',
        'Detailed crop & soil insights',
        'Yield prediction analytics',
        '3-year historical data comparison',
        'Phone & email support'
      ],
      cta: 'Go Professional'
    },
    {
      name: 'Premium Plan',
      price: '25,000',
      badge: 'Enterprise Solution',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      cardColor: 'border-yellow-300 hover:border-yellow-400',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700',
      features: [
        'Up to 1,000 plots',
        'Max Area: 2,500 hectares',
        'All Professional features',
        'Post-disaster damage reports',
        'Yield & financial loss analysis',
        '24/7 satellite monitoring',
        'Dedicated account manager',
        'Priority customer support'
      ],
      cta: 'Contact Sales'
    }
  ];

  const faqs = [
    {
      question: 'Can I upgrade my plan anytime?',
      answer: 'Yes, you can upgrade your plan at any time. The change will take effect immediately and you will only pay the prorated difference.'
    },
    {
      question: 'What happens during the free trial?',
      answer: 'During your 7-day free trial, you have full access to all features of your chosen plan. No credit card is required to start.'
    },
    {
      question: 'Do you offer annual discounts?',
      answer: 'Yes, we offer a 15% discount for annual subscriptions. Contact our sales team for more information.'
    },
    {
      question: 'Is technical support included?',
      answer: 'All plans include technical support. Higher-tier plans receive priority support and dedicated account management.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your RADI Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible pricing for farmers of all sizes - from small plots to large agricultural operations
          </p>
        </div>

        {/* Free Trial Banner */}
        <div className="bg-gradient-to-r from-agri-green to-sky-blue text-white rounded-lg p-6 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-2">7-Day Free Trial Available for All New Users</h3>
          <p className="text-lg opacity-90">No Credit Card Required</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index}
              className={`relative hover-lift transition-all duration-300 ${tier.cardColor} ${tier.popular ? 'scale-105' : ''}`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={tier.badgeColor}>
                    {tier.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {tier.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-lg text-gray-600"> DA/month</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full text-white ${tier.buttonColor} mt-6`}
                  size="lg"
                >
                  {tier.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* IoT Add-on */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-sky-blue rounded-full p-3">
                <Sensor className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">IoT Sensor Integration</h3>
            <p className="text-gray-600 mb-4">
              Add real-time soil and environmental monitoring to any plan
            </p>
            <div className="text-3xl font-bold text-sky-blue mb-4">+300 DA/month</div>
            <p className="text-sm text-gray-500">Compatible with all plans</p>
          </div>
        </div>

        {/* Trust Elements */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-gray-700">
            <Shield className="h-5 w-5 text-green-500" />
            <span>No Setup Fees</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="h-5 w-5 text-green-500" />
            <span>Cancel Anytime</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Secure Payment</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="text-center mb-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-agri-green hover:bg-agri-green-dark text-white">
              Start Your Free Trial
            </Button>
            <Button size="lg" variant="outline" className="border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-white">
              Contact Sales for Custom Plans
            </Button>
            <Button size="lg" variant="ghost" className="text-gray-600 hover:text-gray-800">
              Try Demo First
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <Button 
              variant="outline" 
              onClick={() => setShowFAQ(!showFAQ)}
              className="text-sky-blue border-sky-blue hover:bg-sky-blue hover:text-white"
            >
              {showFAQ ? 'Hide' : 'Show'} FAQ
            </Button>
          </div>
          
          {showFAQ && (
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
