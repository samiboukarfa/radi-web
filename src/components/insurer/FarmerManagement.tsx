import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Trash2, Plus, UserPlus, Download } from 'lucide-react';
import { getDemoInsurerData } from '@/utils/auth';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/components/ui/use-toast"
import { useToast } from "@/components/ui/use-toast"

const FarmerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState('ahmed');
  const [farmerData, setFarmerData] = useState(getDemoInsurerData().farmers.find(f => f.id === selectedFarmer));
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    fullName: farmerData?.personalInfo.fullName || '',
    farmAddress: farmerData?.personalInfo.farmAddress || '',
    contactNumber: farmerData?.personalInfo.contactNumber || '',
    emailAddress: farmerData?.personalInfo.emailAddress || '',
    farmSize: farmerData?.farmDetails.farmSize || '',
    cropsCultivated: farmerData?.farmDetails.cropsCultivated || '',
    irrigationMethods: farmerData?.farmDetails.irrigationMethods || '',
    soilType: farmerData?.farmDetails.soilType || '',
    specialNotes: farmerData?.specialNotes || 'Standard monitoring protocols applied.',
  });
  const { toast } = useToast()
  useEffect(() => {
    const newFarmerData = getDemoInsurerData().farmers.find(f => f.id === selectedFarmer);
    setFarmerData(newFarmerData);
    setEditedData({
      fullName: newFarmerData?.personalInfo.fullName || '',
      farmAddress: newFarmerData?.personalInfo.farmAddress || '',
      contactNumber: newFarmerData?.personalInfo.contactNumber || '',
      emailAddress: newFarmerData?.personalInfo.emailAddress || '',
      farmSize: newFarmerData?.farmDetails.farmSize || '',
      cropsCultivated: newFarmerData?.farmDetails.cropsCultivated || '',
      irrigationMethods: newFarmerData?.farmDetails.irrigationMethods || '',
      soilType: newFarmerData?.farmDetails.soilType || '',
      specialNotes: newFarmerData?.specialNotes || 'Drought-resistant olive varieties showing good adaptation.',
    });
  }, [selectedFarmer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Here you would typically send the editedData to your backend to update the farmer's information
    // For this demo, we'll just display a success message
    toast({
      title: "Success!",
      description: "Farmer details updated successfully.",
    })
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({
      fullName: farmerData?.personalInfo.fullName || '',
      farmAddress: farmerData?.personalInfo.farmAddress || '',
      contactNumber: farmerData?.personalInfo.contactNumber || '',
      emailAddress: farmerData?.personalInfo.emailAddress || '',
      farmSize: farmerData?.farmDetails.farmSize || '',
      cropsCultivated: farmerData?.farmDetails.cropsCultivated || '',
      irrigationMethods: farmerData?.farmDetails.irrigationMethods || '',
      soilType: farmerData?.farmDetails.soilType || '',
      specialNotes: farmerData?.specialNotes || 'Post-storm recovery monitoring in progress.',
    });
  };

  const filteredFarmers = getDemoInsurerData().farmers.filter(farmer =>
    farmer.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.personalInfo.farmAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Farmer Management</CardTitle>
          <CardDescription>
            Manage and monitor farmer profiles, risk assessments, and policy details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Input
              type="search"
              placeholder="Search farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Farmer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Farmer</DialogTitle>
                  <DialogDescription>
                    Create a new farmer profile to start monitoring their farm.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" defaultValue="Sofia Guetta" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Farm Address
                    </Label>
                    <Input id="username" defaultValue="Ain Smara, Constantine" className="col-span-3" />
                  </div>
                </div>
                {/* @ts-expect-error */}
                <Button type="submit">Create New Farmer</Button>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Farm Address</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFarmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell className="font-medium">{farmer.personalInfo.fullName}</TableCell>
                  <TableCell>{farmer.personalInfo.farmAddress}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {farmer.riskScore}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Farmer Details</CardTitle>
          <CardDescription>
            View and edit detailed information about the selected farmer.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={editedData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="farmAddress">Farm Address</Label>
              <Input
                id="farmAddress"
                name="farmAddress"
                value={editedData.farmAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                name="contactNumber"
                value={editedData.contactNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={editedData.emailAddress}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="farmSize">Farm Size (hectares)</Label>
              <Input
                id="farmSize"
                name="farmSize"
                value={editedData.farmSize}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="cropsCultivated">Crops Cultivated</Label>
              <Input
                id="cropsCultivated"
                name="cropsCultivated"
                value={editedData.cropsCultivated}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="irrigationMethods">Irrigation Methods</Label>
              <Input
                id="irrigationMethods"
                name="irrigationMethods"
                value={editedData.irrigationMethods}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="soilType">Soil Type</Label>
              <Input
                id="soilType"
                name="soilType"
                value={editedData.soilType}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialNotes">Special Notes</Label>
            <Input
              id="specialNotes"
              name="specialNotes"
              value={editedData.specialNotes}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="flex justify-between">
            {isEditing ? (
              <div className="space-x-2">
                <Button variant="secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
            )}
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Remove Farmer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerManagement;
