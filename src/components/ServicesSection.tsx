
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Satellite, Cloud, Gauge, Eye, BarChart3, FileText } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Satellite,
      title: 'Satellite Imagery Analysis',
      description: 'NDVI and EVI tracking from Sentinel-2 and MODIS data',
      color: 'text-sky-blue'
    },
    {
      icon: Cloud,
      title: 'Smart Weather Forecasting',
      description: 'Real-time alerts for drought and extreme weather events',
      color: 'text-sky-blue'
    },
    {
      icon: Gauge,
      title: 'Climate Risk Scoring',
      description: 'AI-driven risk classification: Low, Medium, High',
      color: 'text-agri-green'
    },
    {
      icon: Eye,
      title: 'IoT Sensor Integration',
      description: 'Soil moisture and temperature monitoring',
      color: 'text-agri-green'
    },
    {
      icon: BarChart3,
      title: 'Interactive Dashboards',
      description: 'Customized interfaces for farmers and insurers',
      color: 'text-sky-blue'
    },
    {
      icon: FileText,
      title: 'Exportable Reports',
      description: 'PDF/Excel reports for Post-Disaster and risk analysis',
      color: 'text-agri-green'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Core Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive agricultural risk assessment tools powered by cutting-edge technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover-lift bg-white border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
