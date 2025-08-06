import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, RotateCcw, Activity, Satellite, User, Clock } from 'lucide-react';
import { RiskParameters } from '@/utils/riskScore';
import { toast } from '@/hooks/use-toast';

interface RiskParametersEditorProps {
  parameters: RiskParameters;
  onParametersChange: (parameters: RiskParameters) => void;
  onSave: (parameters: RiskParameters) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface ParameterInfo {
  key: keyof RiskParameters;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  description: string;
  dataSource: 'sensor' | 'satellite' | 'manual';
  lastUpdated?: string;
}

const parameterConfig: ParameterInfo[] = [
  {
    key: 'NDVI',
    label: 'NDVI (Vegetation Index)',
    unit: '',
    min: -1,
    max: 1,
    step: 0.01,
    description: 'Normalized Difference Vegetation Index',
    dataSource: 'satellite',
    lastUpdated: '2 hours ago'
  },
  {
    key: 'EVI',
    label: 'EVI (Enhanced Vegetation Index)',
    unit: '',
    min: -1,
    max: 1,
    step: 0.01,
    description: 'Enhanced Vegetation Index',
    dataSource: 'satellite',
    lastUpdated: '2 hours ago'
  },
  {
    key: 'NDMI',
    label: 'NDMI (Moisture Index)',
    unit: '',
    min: -1,
    max: 1,
    step: 0.01,
    description: 'Normalized Difference Moisture Index',
    dataSource: 'satellite',
    lastUpdated: '2 hours ago'
  },
  {
    key: 'LST',
    label: 'Land Surface Temperature',
    unit: '°C',
    min: 0,
    max: 60,
    step: 0.1,
    description: 'Average land surface temperature',
    dataSource: 'satellite',
    lastUpdated: '2 hours ago'
  },
  {
    key: 'LSTAnomaly',
    label: 'LST Anomaly',
    unit: '°C',
    min: -20,
    max: 20,
    step: 0.1,
    description: 'Temperature deviation from normal',
    dataSource: 'satellite',
    lastUpdated: '2 hours ago'
  },
  {
    key: 'totalRainfall',
    label: 'Total Rainfall',
    unit: 'mm',
    min: 0,
    max: 200,
    step: 0.1,
    description: 'Cumulative rainfall over period',
    dataSource: 'sensor',
    lastUpdated: '1 hour ago'
  },
  {
    key: 'rainfallAnomaly',
    label: 'Rainfall Anomaly',
    unit: 'mm',
    min: -100,
    max: 100,
    step: 0.1,
    description: 'Rainfall deviation from normal',
    dataSource: 'sensor',
    lastUpdated: '1 hour ago'
  },
  {
    key: 'liftedIndex',
    label: 'Lifted Index',
    unit: '',
    min: -10,
    max: 10,
    step: 0.1,
    description: 'Atmospheric stability indicator',
    dataSource: 'manual',
    lastUpdated: '6 hours ago'
  },
  {
    key: 'CAPE',
    label: 'CAPE',
    unit: 'J/kg',
    min: 0,
    max: 6000,
    step: 10,
    description: 'Convective Available Potential Energy',
    dataSource: 'manual',
    lastUpdated: '6 hours ago'
  },
  {
    key: 'windShear',
    label: 'Wind Shear',
    unit: 'm/s',
    min: 0,
    max: 50,
    step: 0.1,
    description: 'Vertical wind speed difference',
    dataSource: 'manual',
    lastUpdated: '6 hours ago'
  },
  {
    key: 'ETa',
    label: 'Actual Evapotranspiration',
    unit: 'mm/day',
    min: 0,
    max: 20,
    step: 0.1,
    description: 'Actual water loss rate',
    dataSource: 'sensor',
    lastUpdated: '3 hours ago'
  },
  {
    key: 'weatherAlerts',
    label: 'Weather Alerts',
    unit: 'count',
    min: 0,
    max: 5,
    step: 1,
    description: 'Number of active weather alerts',
    dataSource: 'manual',
    lastUpdated: '30 minutes ago'
  }
];

const RiskParametersEditor: React.FC<RiskParametersEditorProps> = ({
  parameters,
  onParametersChange,
  onSave,
  isOpen,
  onClose
}) => {
  const [editedParameters, setEditedParameters] = useState<RiskParameters>(parameters);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync with incoming parameters when they change
  useEffect(() => {
    console.log('Parameters changed in editor:', parameters);
    setEditedParameters(parameters);
    setHasChanges(false);
  }, [parameters]);

  const handleParameterChange = (key: keyof RiskParameters, value: string) => {
    console.log('Parameter change:', key, '=', value);
    const numValue = parseFloat(value) || 0;
    const newParameters = { ...editedParameters, [key]: numValue };
    setEditedParameters(newParameters);
    setHasChanges(true);
    
    // Immediately update the calculator for real-time preview
    console.log('Calling onParametersChange with:', newParameters);
    onParametersChange(newParameters);
  };

  const handleSave = () => {
    onSave(editedParameters);
    setHasChanges(false);
    toast({
      title: "Parameters Updated",
      description: "Risk parameters have been saved and risk scores recalculated.",
    });
  };

  const handleReset = () => {
    setEditedParameters(parameters);
    setHasChanges(false);
    onParametersChange(parameters);
    toast({
      title: "Parameters Reset",
      description: "All changes have been reverted to original values.",
    });
  };

  const getDataSourceIcon = (source: string) => {
    switch (source) {
      case 'sensor':
        return <Activity className="h-3 w-3" />;
      case 'satellite':
        return <Satellite className="h-3 w-3" />;
      case 'manual':
        return <User className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getDataSourceColor = (source: string) => {
    switch (source) {
      case 'sensor':
        return 'bg-green-100 text-green-800';
      case 'satellite':
        return 'bg-blue-100 text-blue-800';
      case 'manual':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Risk Parameters Editor</CardTitle>
              <CardDescription>
                Modify risk assessment parameters and see real-time impact on risk scores
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              {hasChanges && (
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={!hasChanges}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {parameterConfig.map((config) => (
              <div key={config.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor={config.key} className="text-sm font-medium">
                    {config.label}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDataSourceColor(config.dataSource)}`}
                    >
                      {getDataSourceIcon(config.dataSource)}
                      <span className="ml-1 capitalize">{config.dataSource}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input
                    id={config.key}
                    type="number"
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={editedParameters[config.key]}
                    onChange={(e) => handleParameterChange(config.key, e.target.value)}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground w-12">
                    {config.unit}
                  </span>
                </div>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>{config.description}</p>
                  {config.lastUpdated && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>Last updated: {config.lastUpdated}</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded px-2 py-1 text-xs">
                  Range: {config.min} - {config.max} {config.unit}
                </div>
              </div>
            ))}
          </div>
          
          {hasChanges && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                ⚡ Real-time calculation active
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Risk scores are being recalculated as you modify parameters. 
                Click "Save Changes" to persist your modifications.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskParametersEditor;