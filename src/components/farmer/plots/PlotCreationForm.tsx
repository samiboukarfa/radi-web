
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlotFormData {
  name: string;
  crop: string;
  plantingDate: string;
  expectedHarvest: string;
  notes: string;
}

interface PlotCreationFormProps {
  area: number;
  onSave: (data: PlotFormData) => void;
  onCancel: () => void;
}

const cropOptions = [
  'Wheat', 'Barley', 'Oats', 'Corn', 'Tomatoes', 'Potatoes', 'Olives'
];

const PlotCreationForm: React.FC<PlotCreationFormProps> = ({ area, onSave, onCancel }) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PlotFormData>();

  const onSubmit = (data: PlotFormData) => {
    onSave(data);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create New Plot</CardTitle>
        <p className="text-sm text-gray-600">Area: {area.toFixed(2)} hectares</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Plot Name *</Label>
            <Input
              id="name"
              {...register('name', { required: 'Plot name is required' })}
              placeholder="Enter plot name"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="crop">Crop Type *</Label>
            <Select onValueChange={(value) => setValue('crop', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent>
                {cropOptions.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.crop && (
              <p className="text-sm text-red-600 mt-1">{errors.crop.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="plantingDate">Planting Date</Label>
            <Input
              id="plantingDate"
              type="date"
              {...register('plantingDate')}
            />
          </div>

          <div>
            <Label htmlFor="expectedHarvest">Expected Harvest Date</Label>
            <Input
              id="expectedHarvest"
              type="date"
              {...register('expectedHarvest')}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              placeholder="Optional notes about this plot"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button type="submit" className="flex-1">
              Save Plot
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PlotCreationForm;
