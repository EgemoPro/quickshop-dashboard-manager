
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, BarChart2, Facebook, Instagram, TikTok, Mail, MessageSquare, Globe, PauseCircle, PlayCircle, StopCircle } from "lucide-react";
import { addCampaign, updateCampaign, deleteCampaign, updateCampaignStatus } from "@/store/slices/marketingSlice";
import { format } from "date-fns";

interface CampaignsSectionProps {
  darkMode: boolean;
}

const CampaignsSection: React.FC<CampaignsSectionProps> = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { campaigns } = useSelector((state: RootState) => state.marketing);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<string | null>(null);
  
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    platform: "facebook",
    status: "draft",
    budget: 100,
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), "yyyy-MM-dd"),
    target: {
      demographics: ["18-35"],
      interests: ["shopping"],
      locations: ["Paris"],
    },
  });
  
  const resetForm = () => {
    setCampaignForm({
      name: "",
      platform: "facebook",
      status: "draft",
      budget: 100,
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), "yyyy-MM-dd"),
      target: {
        demographics: ["18-35"],
        interests: ["shopping"],
        locations: ["Paris"],
      },
    });
    setEditingCampaign(null);
  };
  
  const handleOpenDialog = (campaignId?: string) => {
    if (campaignId) {
      const campaign = campaigns.find(c => c.id === campaignId);
      if (campaign) {
        setCampaignForm({
          name: campaign.name,
          platform: campaign.platform,
          status: campaign.status,
          budget: campaign.budget,
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          target: {
            demographics: campaign.target.demographics,
            interests: campaign.target.interests,
            locations: campaign.target.locations,
          },
        });
        setEditingCampaign(campaignId);
      }
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetForm();
  };
  
  const handleSubmit = () => {
    if (!campaignForm.name) {
      toast({
        title: "Erreur",
        description: "Le nom de la campagne est requis",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (editingCampaign) {
        dispatch(updateCampaign({
          id: editingCampaign,
          ...campaignForm,
        }));
        toast({
          title: "Succès",
          description: "La campagne a été mise à jour",
        });
      } else {
        dispatch(addCampaign(campaignForm));
        toast({
          title: "Succès",
          description: "La campagne a été créée",
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = (id: string) => {
    dispatch(deleteCampaign(id));
    toast({
      title: "Succès",
      description: "La campagne a été supprimée",
    });
  };
  
  const handleUpdateStatus = (id: string, status: "draft" | "scheduled" | "active" | "completed" | "paused") => {
    dispatch(updateCampaignStatus({ id, status }));
    toast({
      title: "Statut mis à jour",
      description: `La campagne est maintenant ${getStatusLabel(status).toLowerCase()}`,
    });
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'tiktok':
        return <TikTok className="h-4 w-4" />;
      case 'google':
        return <Globe className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };
  
  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'tiktok':
        return 'TikTok';
      case 'google':
        return 'Google';
      case 'email':
        return 'Email';
      case 'sms':
        return 'SMS';
      default:
        return platform;
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Brouillon';
      case 'scheduled':
        return 'Programmée';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Terminée';
      case 'paused':
        return 'En pause';
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string, isDark: boolean) => {
    switch (status) {
      case 'draft':
        return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
      case 'scheduled':
        return isDark ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700';
      case 'active':
        return isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700';
      case 'completed':
        return isDark ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700';
      case 'paused':
        return isDark ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-700';
      default:
        return isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700';
    }
  };
  
  const getROI = (campaign: typeof campaigns[0]) => {
    if (!campaign.performance.cost || campaign.performance.cost === 0) return 0;
    return (campaign.performance.revenue / campaign.performance.cost).toFixed(2);
  };
  
  return (
    <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300 mt-6`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Campagnes Marketing</CardTitle>
            <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Gérez vos campagnes publicitaires sur différentes plateformes
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" /> Nouvelle campagne
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="active">Actives</TabsTrigger>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="completed">Terminées</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-4">
              {campaigns.length > 0 ? campaigns.map((campaign) => (
                <div 
                  key={campaign.id} 
                  className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-teal-900' : 'bg-teal-100'}`}>
                        {getPlatformIcon(campaign.platform)}
                      </div>
                      <div>
                        <h3 className="font-medium">{campaign.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status, darkMode)}`}>
                            {getStatusLabel(campaign.status)}
                          </span>
                          <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {getPlatformLabel(campaign.platform)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {campaign.status !== "active" && campaign.status !== "completed" && (
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(campaign.id, "active")}>
                          <PlayCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      {campaign.status === "active" && (
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(campaign.id, "paused")}>
                          <PauseCircle className="h-4 w-4 text-amber-500" />
                        </Button>
                      )}
                      {campaign.status !== "completed" && (
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(campaign.id, "completed")}>
                          <StopCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(campaign.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(campaign.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="text-xs text-gray-500 mb-1">Budget</p>
                      <p className="font-medium">{campaign.budget}€</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="text-xs text-gray-500 mb-1">Dates</p>
                      <p className="font-medium text-xs">{campaign.startDate} - {campaign.endDate}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="text-xs text-gray-500 mb-1">Cible</p>
                      <p className="font-medium text-xs">{campaign.target.demographics.join(', ')}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <p className="text-xs text-gray-500 mb-1">ROI</p>
                      <p className="font-medium">{getROI(campaign)}x</p>
                    </div>
                  </div>
                  
                  {campaign.status === "active" && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium mb-2">Performance</h4>
                        <Button variant="ghost" size="sm" className="text-xs flex items-center">
                          <BarChart2 className="h-3 w-3 mr-1" /> Voir détails
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Impressions</p>
                          <p className="font-medium">{campaign.performance.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Clics</p>
                          <p className="font-medium">{campaign.performance.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Taux de clic</p>
                          <p className="font-medium">
                            {(campaign.performance.clicks / campaign.performance.impressions * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Conversions</p>
                          <p className="font-medium">{campaign.performance.conversions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Revenu</p>
                          <p className="font-medium">{campaign.performance.revenue.toLocaleString()}€</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )) : (
                <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <BarChart2 className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucune campagne disponible</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="space-y-4">
              {campaigns.filter(campaign => campaign.status === 'active').length > 0 ? (
                campaigns
                  .filter(campaign => campaign.status === 'active')
                  .map((campaign) => (
                    // ... même contenu que les campagnes "all" mais filtré pour "active"
                    <div 
                      key={campaign.id} 
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-teal-900' : 'bg-teal-100'}`}>
                            {getPlatformIcon(campaign.platform)}
                          </div>
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status, darkMode)}`}>
                                {getStatusLabel(campaign.status)}
                              </span>
                              <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {getPlatformLabel(campaign.platform)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(campaign.id, "paused")}>
                            <PauseCircle className="h-4 w-4 text-amber-500" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(campaign.id, "completed")}>
                            <StopCircle className="h-4 w-4 text-red-500" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(campaign.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(campaign.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Budget</p>
                          <p className="font-medium">{campaign.budget}€</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Dates</p>
                          <p className="font-medium text-xs">{campaign.startDate} - {campaign.endDate}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Cible</p>
                          <p className="font-medium text-xs">{campaign.target.demographics.join(', ')}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">ROI</p>
                          <p className="font-medium">{getROI(campaign)}x</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium mb-2">Performance</h4>
                          <Button variant="ghost" size="sm" className="text-xs flex items-center">
                            <BarChart2 className="h-3 w-3 mr-1" /> Voir détails
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          <div>
                            <p className="text-xs text-gray-500">Impressions</p>
                            <p className="font-medium">{campaign.performance.impressions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Clics</p>
                            <p className="font-medium">{campaign.performance.clicks.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Taux de clic</p>
                            <p className="font-medium">
                              {(campaign.performance.clicks / campaign.performance.impressions * 100).toFixed(2)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Conversions</p>
                            <p className="font-medium">{campaign.performance.conversions.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Revenu</p>
                            <p className="font-medium">{campaign.performance.revenue.toLocaleString()}€</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <BarChart2 className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucune campagne active</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="space-y-4">
              {campaigns.filter(campaign => campaign.status === 'scheduled' || campaign.status === 'draft').length > 0 ? (
                campaigns
                  .filter(campaign => campaign.status === 'scheduled' || campaign.status === 'draft')
                  .map((campaign) => (
                    // ... contenu filtré pour "upcoming"
                    <div 
                      key={campaign.id} 
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-teal-900' : 'bg-teal-100'}`}>
                            {getPlatformIcon(campaign.platform)}
                          </div>
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status, darkMode)}`}>
                                {getStatusLabel(campaign.status)}
                              </span>
                              <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {getPlatformLabel(campaign.platform)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleUpdateStatus(campaign.id, "active")}>
                            <PlayCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(campaign.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(campaign.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Budget</p>
                          <p className="font-medium">{campaign.budget}€</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Dates</p>
                          <p className="font-medium text-xs">{campaign.startDate} - {campaign.endDate}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Cible</p>
                          <p className="font-medium text-xs">{campaign.target.demographics.join(', ')}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Plate-forme</p>
                          <p className="font-medium">{getPlatformLabel(campaign.platform)}</p>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <BarChart2 className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucune campagne à venir</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="space-y-4">
              {campaigns.filter(campaign => campaign.status === 'completed').length > 0 ? (
                campaigns
                  .filter(campaign => campaign.status === 'completed')
                  .map((campaign) => (
                    // ... contenu filtré pour "completed"
                    <div 
                      key={campaign.id} 
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors opacity-80`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${darkMode ? 'bg-purple-900' : 'bg-purple-100'}`}>
                            {getPlatformIcon(campaign.platform)}
                          </div>
                          <div>
                            <h3 className="font-medium">{campaign.name}</h3>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(campaign.status, darkMode)}`}>
                                {getStatusLabel(campaign.status)}
                              </span>
                              <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {getPlatformLabel(campaign.platform)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(campaign.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(campaign.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Budget</p>
                          <p className="font-medium">{campaign.budget}€</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Dates</p>
                          <p className="font-medium text-xs">{campaign.startDate} - {campaign.endDate}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">ROI</p>
                          <p className="font-medium">{getROI(campaign)}x</p>
                        </div>
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <p className="text-xs text-gray-500 mb-1">Résultats</p>
                          <p className="font-medium">{campaign.performance.conversions} conversions</p>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <BarChart2 className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucune campagne terminée</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Dialog pour ajouter/éditer une campagne */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} sm:max-w-[550px]`}>
          <DialogHeader>
            <DialogTitle>{editingCampaign ? "Modifier la campagne" : "Créer une nouvelle campagne"}</DialogTitle>
            <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {editingCampaign ? "Modifiez les détails de la campagne" : "Remplissez les détails pour créer une nouvelle campagne"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-name" className="text-right">Nom</Label>
              <Input
                id="campaign-name"
                value={campaignForm.name}
                onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                placeholder="Promo fin d'année"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-platform" className="text-right">Plateforme</Label>
              <Select 
                value={campaignForm.platform} 
                onValueChange={(value) => setCampaignForm({ ...campaignForm, platform: value as any })}
              >
                <SelectTrigger id="campaign-platform" className="col-span-3">
                  <SelectValue placeholder="Choisir une plateforme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-status" className="text-right">Statut</Label>
              <Select 
                value={campaignForm.status} 
                onValueChange={(value) => setCampaignForm({ ...campaignForm, status: value as any })}
              >
                <SelectTrigger id="campaign-status" className="col-span-3">
                  <SelectValue placeholder="Choisir un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="scheduled">Programmée</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">En pause</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-budget" className="text-right">Budget (€)</Label>
              <Input
                id="campaign-budget"
                type="number"
                value={campaignForm.budget}
                onChange={(e) => setCampaignForm({ ...campaignForm, budget: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-start-date" className="text-right">Date début</Label>
              <Input
                id="campaign-start-date"
                type="date"
                value={campaignForm.startDate}
                onChange={(e) => setCampaignForm({ ...campaignForm, startDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-end-date" className="text-right">Date fin</Label>
              <Input
                id="campaign-end-date"
                type="date"
                value={campaignForm.endDate}
                onChange={(e) => setCampaignForm({ ...campaignForm, endDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-demographics" className="text-right">Démographie</Label>
              <Input
                id="campaign-demographics"
                value={campaignForm.target.demographics.join(', ')}
                onChange={(e) => setCampaignForm({ 
                  ...campaignForm, 
                  target: {
                    ...campaignForm.target,
                    demographics: e.target.value.split(',').map(item => item.trim())
                  }
                })}
                placeholder="18-35, 35-55"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-interests" className="text-right">Intérêts</Label>
              <Input
                id="campaign-interests"
                value={campaignForm.target.interests.join(', ')}
                onChange={(e) => setCampaignForm({ 
                  ...campaignForm, 
                  target: {
                    ...campaignForm.target,
                    interests: e.target.value.split(',').map(item => item.trim())
                  }
                })}
                placeholder="shopping, mode, technologie"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campaign-locations" className="text-right">Localisation</Label>
              <Input
                id="campaign-locations"
                value={campaignForm.target.locations.join(', ')}
                onChange={(e) => setCampaignForm({ 
                  ...campaignForm, 
                  target: {
                    ...campaignForm.target,
                    locations: e.target.value.split(',').map(item => item.trim())
                  }
                })}
                placeholder="Paris, Lyon, Marseille"
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              {editingCampaign ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CampaignsSection;
