
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TargetUsersSection = () => {
  const userTypes = [
    {
      title: 'Farmers',
      description: 'Protect your crops with data-driven insights',
      details: 'Access real-time weather data, soil monitoring, and risk assessments to make informed decisions about your agricultural operations.',
      bgColor: 'bg-agri-green-light',
      textColor: 'text-agri-green',
      buttonColor: 'bg-agri-green hover:bg-agri-green-dark',
      image: '/1.jpg'
    },
    {
      title: 'Insurance Companies',
      description: 'Reduce claims with accurate risk assessment',
      details: 'Leverage AI-powered analytics to better understand agricultural risks and offer competitive, data-driven insurance products.',
      bgColor: 'bg-sky-blue-light',
      textColor: 'text-sky-blue',
      buttonColor: 'bg-sky-blue hover:bg-sky-blue-dark',
      image: '/2.jpg'
    },
    {
      title: 'Public Institutions',
      description: 'Support agricultural development with reliable data',
      details: 'Government agencies, Banks, agricultural committees and NGOs can use our platform to monitor agricultural trends and support policy-making decisions.',
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-700',
      buttonColor: 'bg-gray-700 hover:bg-gray-800',
      image: '/3.jpg'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Who We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            RADI is designed to meet the unique needs of different stakeholders in the agricultural ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <Card 
              key={index} 
              className="hover-lift bg-white border-0 shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${userType.image})` }}
              >
                <div className="h-full bg-black bg-opacity-40 flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white">{userType.title}</h3>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className={`text-xl ${userType.textColor}`}>
                  {userType.description}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {userType.details}
                </CardDescription>
                
                <Button 
                  className={`w-full text-white ${userType.buttonColor}`}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsersSection;
