
import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { MapPin, Save, X } from 'lucide-react';

interface PlotFormData {
  name: string;
  crop: string;
  area: number;
  soilType: string;
  irrigationMethod: string;
  plantingDate: string;
  expectedHarvest: string;
  latitude: number;
  longitude: number;
  notes?: string;
}

interface AddPlotFormProps {
  onCancel: () => void;
  onSubmit: (data: PlotFormData) => void;
}

const AddPlotForm: React.FC<AddPlotFormProps> = ({ onCancel, onSubmit }) => {
  const form = useForm<PlotFormData>({
    defaultValues: {
      name: '',
      crop: '',
      area: 0,
      soilType: '',
      irrigationMethod: '',
      plantingDate: '',
      expectedHarvest: '',
      latitude: 36.8756, // Default to Skikda region
      longitude: 6.9147,
      notes: ''
    }
  });

  const handleSubmit = (data: PlotFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Add New Plot</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Plot name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plot Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., North Field A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="crop"
                rules={{ required: "Crop type is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crop Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="barley">Barley</SelectItem>
                          <SelectItem value="oats">Oats</SelectItem>
                          <SelectItem value="corn">Corn</SelectItem>
                          <SelectItem value="tomatoes">Tomatoes</SelectItem>
                          <SelectItem value="olives">Olives</SelectItem>
                          <SelectItem value="citrus">Citrus</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                rules={{ 
                  required: "Area is required",
                  min: { value: 0.1, message: "Area must be at least 0.1 hectares" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (hectares)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="e.g., 2.5" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="soilType"
                rules={{ required: "Soil type is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Soil Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                          <SelectItem value="loam">Loam</SelectItem>
                          <SelectItem value="silt">Silt</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="irrigationMethod"
                rules={{ required: "Irrigation method is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Irrigation Method</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select irrigation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="drip">Drip Irrigation</SelectItem>
                          <SelectItem value="sprinkler">Sprinkler</SelectItem>
                          <SelectItem value="flood">Flood Irrigation</SelectItem>
                          <SelectItem value="rainfed">Rain-fed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plantingDate"
                rules={{ required: "Planting date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Planting Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectedHarvest"
                rules={{ required: "Expected harvest date is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Harvest</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="latitude"
                rules={{ 
                  required: "Latitude is required",
                  min: { value: 36.5, message: "Latitude should be in Skikda region (36.5-37.5)" },
                  max: { value: 37.5, message: "Latitude should be in Skikda region (36.5-37.5)" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.000001"
                        placeholder="36.8756" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longitude"
                rules={{ 
                  required: "Longitude is required",
                  min: { value: 6.5, message: "Longitude should be in Skikda region (6.5-7.5)" },
                  max: { value: 7.5, message: "Longitude should be in Skikda region (6.5-7.5)" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.000001"
                        placeholder="6.9147" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional information about this plot..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Plot
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddPlotForm;
