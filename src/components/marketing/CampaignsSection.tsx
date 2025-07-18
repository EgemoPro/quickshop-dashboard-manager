
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Facebook, Instagram, Mail, MessageSquare, PlusCircle, Calendar as CalendarIcon, Check, Edit2, Trash2 } from 'lucide-react';
import { addCampaign, deleteCampaign, updateCampaignStatus, updateCampaign } from '@/store/slices/marketingSlice';
import { getDateForInput } from '@/utils/formatDate';
import { Campaign } from '@/store/slices/marketingSlice';

// Icons mapping for platforms
const PlatformIcon = ({ platform }: { platform: Campaign['platform'] }) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className="h-4 w-4" />;
    case 'instagram':
      return <Instagram className="h-4 w-4" />;
    case 'tiktok':
      return <MessageSquare className="h-4 w-4" />; // Using MessageSquare as TikTok replacement
    case 'google':
      return <Check className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'sms':
      return <MessageSquare className="h-4 w-4" />;
    default:
      return null;
  }
};

const CampaignsSection = () => {
  const dispatch = useDispatch();
  const { campaigns } = useSelector((state: RootState) => state.marketing);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<Campaign['platform']>('facebook');
  const [status, setStatus] = useState<Campaign['status']>('draft');
  const [budget, setBudget] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [demographics, setDemographics] = useState('');
  const [interests, setInterests] = useState('');
  const [locations, setLocations] = useState('');

  const resetForm = () => {
    setName('');
    setPlatform('facebook');
    setStatus('draft');
    setBudget(0);
    setStartDate(undefined);
    setEndDate(undefined);
    setDemographics('');
    setInterests('');
    setLocations('');
    setEditingCampaign(null);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setName(campaign.name);
    setPlatform(campaign.platform);
    setStatus(campaign.status);
    setBudget(campaign.budget);
    setStartDate(new Date(campaign.startDate));
    setEndDate(new Date(campaign.endDate));
    setDemographics(campaign.target.demographics.join(', '));
    setInterests(campaign.target.interests.join(', '));
    setLocations(campaign.target.locations.join(', '));
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette campagne ?')) {
      dispatch(deleteCampaign(id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaignData = {
      name,
      platform,
      status,
      budget,
      startDate: startDate ? getDateForInput(startDate) : '',
      endDate: endDate ? getDateForInput(endDate) : '',
      target: {
        demographics: demographics.split(',').map(item => item.trim()),
        interests: interests.split(',').map(item => item.trim()),
        locations: locations.split(',').map(item => item.trim()),
      },
    };

    if (editingCampaign) {
      dispatch(updateCampaign({
        id: editingCampaign.id,
        ...campaignData
      }));
    } else {
      dispatch(addCampaign(campaignData));
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleStatusChange = (id: string, newStatus: Campaign['status']) => {
    dispatch(updateCampaignStatus({ id, status: newStatus }));
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Campagnes Marketing</CardTitle>
            <CardDescription>Gérez vos campagnes publicitaires sur différentes plateformes</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Nouvelle Campagne
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingCampaign ? 'Modifier la Campagne' : 'Nouvelle Campagne'}</DialogTitle>
                <DialogDescription>
                  {editingCampaign 
                    ? 'Modifiez les détails de votre campagne marketing.' 
                    : 'Créez une nouvelle campagne marketing pour promouvoir vos produits.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Nom</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="platform" className="text-right">Plateforme</Label>
                    <select
                      id="platform"
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as Campaign['platform'])}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="google">Google</option>
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">Statut</Label>
                    <select
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as Campaign['status'])}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="draft">Brouillon</option>
                      <option value="scheduled">Programmée</option>
                      <option value="active">Active</option>
                      <option value="paused">En pause</option>
                      <option value="completed">Terminée</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">Budget (€)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="col-span-3"
                      min="0"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Date de début</Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? startDate.toLocaleDateString('fr-FR') : <span>Choisir une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Date de fin</Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? endDate.toLocaleDateString('fr-FR') : <span>Choisir une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="demographics" className="text-right">Démographie</Label>
                    <Input
                      id="demographics"
                      value={demographics}
                      onChange={(e) => setDemographics(e.target.value)}
                      className="col-span-3"
                      placeholder="18-35, 35-55, etc."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="interests" className="text-right">Intérêts</Label>
                    <Input
                      id="interests"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                      className="col-span-3"
                      placeholder="shopping, technologie, etc."
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="locations" className="text-right">Lieux</Label>
                    <Input
                      id="locations"
                      value={locations}
                      onChange={(e) => setLocations(e.target.value)}
                      className="col-span-3"
                      placeholder="Paris, Lyon, etc."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingCampaign ? 'Mettre à jour' : 'Créer'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {campaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune campagne n'a été créée. Cliquez sur "Nouvelle Campagne" pour commencer.
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <PlatformIcon platform={campaign.platform} />
                      {campaign.platform.charAt(0).toUpperCase() + campaign.platform.slice(1)}
                    </Badge>
                    <Badge
                      variant={
                        campaign.status === 'active' ? 'default' :
                        campaign.status === 'paused' ? 'secondary' :
                        campaign.status === 'scheduled' ? 'outline' : 
                        campaign.status === 'completed' ? 'destructive' : 'outline'
                      }
                    >
                      {campaign.status === 'active' ? 'Active' :
                       campaign.status === 'paused' ? 'En pause' :
                       campaign.status === 'scheduled' ? 'Programmée' :
                       campaign.status === 'completed' ? 'Terminée' : 'Brouillon'}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{campaign.name}</h3>
                  <div className="text-sm text-gray-500">
                    <div className="mt-1">
                      <span className="font-medium">Budget:</span> {campaign.budget}€
                    </div>
                    <div className="mt-1">
                      <span className="font-medium">Période:</span> {new Date(campaign.startDate).toLocaleDateString('fr-FR')} - {new Date(campaign.endDate).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(campaign)}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(campaign.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                  {campaign.status !== 'active' && campaign.status !== 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleStatusChange(campaign.id, 'active')}
                    >
                      Activer
                    </Button>
                  )}
                  {campaign.status === 'active' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleStatusChange(campaign.id, 'paused')}
                    >
                      Mettre en pause
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignsSection;
