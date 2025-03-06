
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Globe, Rss, Link, PieChart, BarChart, Activity } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export interface SocialMediaProfile {
  platform: string;
  url: string;
  connected: boolean;
  username?: string;
  followers?: number;
  engagement?: number;
  posts?: number;
  lastUpdated?: string;
}

interface SocialMediaConnectionsProps {
  socialProfiles: SocialMediaProfile[];
  onSocialProfilesChange: (profiles: SocialMediaProfile[]) => void;
}

const SocialMediaConnections: React.FC<SocialMediaConnectionsProps> = ({
  socialProfiles,
  onSocialProfilesChange
}) => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<SocialMediaProfile[]>(socialProfiles);
  const [activeTab, setActiveTab] = useState('connect');

  const handleUrlChange = (index: number, value: string) => {
    const newProfiles = [...profiles];
    newProfiles[index].url = value;
    setProfiles(newProfiles);
    onSocialProfilesChange(newProfiles);
  };

  const handleToggleConnection = (index: number) => {
    const newProfiles = [...profiles];
    newProfiles[index].connected = !newProfiles[index].connected;
    
    // Simulate connection/disconnection
    if (newProfiles[index].connected) {
      newProfiles[index].followers = Math.floor(Math.random() * 1000) + 100;
      newProfiles[index].engagement = Math.floor(Math.random() * 10) + 1;
      newProfiles[index].posts = Math.floor(Math.random() * 50) + 5;
      newProfiles[index].lastUpdated = new Date().toISOString().split('T')[0];
      
      toast({
        title: "Compte connecté",
        description: `Votre compte ${newProfiles[index].platform} a été connecté avec succès.`,
      });
    } else {
      toast({
        title: "Compte déconnecté",
        description: `Votre compte ${newProfiles[index].platform} a été déconnecté.`,
        variant: "destructive",
      });
    }
    
    setProfiles(newProfiles);
    onSocialProfilesChange(newProfiles);
  };

  const handleRefreshMetrics = (index: number) => {
    if (!profiles[index].connected) return;
    
    const newProfiles = [...profiles];
    // Simulate retrieving updated metrics
    newProfiles[index].followers = Math.floor(Math.random() * 1000) + 100;
    newProfiles[index].engagement = Math.floor(Math.random() * 10) + 1;
    newProfiles[index].posts = Math.floor(Math.random() * 50) + 5;
    newProfiles[index].lastUpdated = new Date().toISOString().split('T')[0];
    
    setProfiles(newProfiles);
    onSocialProfilesChange(newProfiles);
    
    toast({
      title: "Métriques mises à jour",
      description: `Les statistiques de ${newProfiles[index].platform} ont été actualisées.`,
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'site web':
        return <Globe className="h-5 w-5" />;
      case 'rss':
        return <Rss className="h-5 w-5" />;
      default:
        return <Link className="h-5 w-5" />;
    }
  };

  // Generate sample growth data for charts
  const getGrowthData = (platform: string) => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'];
    return months.map((month, index) => ({
      name: month,
      followers: Math.floor(Math.random() * 500) + 500 + (index * 50),
      engagement: Math.floor(Math.random() * 5) + 3 + (index * 0.5),
    }));
  };

  const connectedProfiles = profiles.filter(profile => profile.connected);

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="connect" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            Connexion
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Analyse Performance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="connect" className="space-y-4">
          <h3 className="text-lg font-medium">Réseaux sociaux</h3>
          <p className="text-sm text-gray-500">
            Connectez vos réseaux sociaux pour améliorer votre visibilité et synchroniser votre contenu.
          </p>
          
          <div className="space-y-4 mt-4">
            {profiles.map((profile, index) => (
              <div key={index} className="flex flex-col space-y-2 p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {getPlatformIcon(profile.platform)}
                    </div>
                    <span className="font-medium">{profile.platform}</span>
                  </div>
                  <Switch 
                    checked={profile.connected} 
                    onCheckedChange={() => handleToggleConnection(index)}
                  />
                </div>
                
                <div className="pt-2">
                  <Label htmlFor={`${profile.platform}-url`}>URL du profil</Label>
                  <div className="flex mt-1">
                    <Input
                      id={`${profile.platform}-url`}
                      placeholder={`https://${profile.platform.toLowerCase()}.com/votreprofil`}
                      value={profile.url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      className="flex-1"
                    />
                    {profile.connected && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2 whitespace-nowrap"
                        onClick={() => window.open(profile.url, '_blank')}
                      >
                        Voir
                      </Button>
                    )}
                  </div>
                </div>
                
                {profile.connected && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 pt-2 border-t">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Abonnés</span>
                      <span className="text-lg font-bold">{profile.followers}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Engagement</span>
                      <span className="text-lg font-bold">{profile.engagement}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Publications</span>
                      <span className="text-lg font-bold">{profile.posts}</span>
                    </div>
                    <div className="col-span-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Dernière mise à jour: {profile.lastUpdated || 'Jamais'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRefreshMetrics(index)}
                      >
                        Actualiser
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <h3 className="text-lg font-medium">Analyse des Performances Social Media</h3>
          <p className="text-sm text-gray-500">
            Visualisez et analysez la performance de vos comptes de médias sociaux.
          </p>
          
          {connectedProfiles.length > 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Abonnés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {connectedProfiles.reduce((sum, profile) => sum + (profile.followers || 0), 0)}
                    </div>
                    <div className="text-xs text-green-500">+12% depuis le mois dernier</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Engagement Moyen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(connectedProfiles.reduce((sum, profile) => sum + (profile.engagement || 0), 0) / connectedProfiles.length).toFixed(1)}%
                    </div>
                    <div className="text-xs text-green-500">+0.8% depuis le mois dernier</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Publications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {connectedProfiles.reduce((sum, profile) => sum + (profile.posts || 0), 0)}
                    </div>
                    <div className="text-xs text-gray-500">Sur tous les réseaux</div>
                  </CardContent>
                </Card>
              </div>
              
              {connectedProfiles.map((profile, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        {getPlatformIcon(profile.platform)}
                      </div>
                      <CardTitle>{profile.platform}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="followers">
                      <TabsList className="mb-4">
                        <TabsTrigger value="followers">Abonnés</TabsTrigger>
                        <TabsTrigger value="engagement">Engagement</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="followers">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={getGrowthData(profile.platform)}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="followers" 
                                stroke="#8884d8" 
                                name="Abonnés" 
                                activeDot={{ r: 8 }} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="engagement">
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={getGrowthData(profile.platform)}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="engagement" 
                                stroke="#82ca9d" 
                                name="Taux d'engagement (%)" 
                                activeDot={{ r: 8 }} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-end">
                <Button>
                  Exporter les données
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Activity className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun réseau social connecté</h3>
              <p className="text-sm text-gray-500 max-w-md">
                Connectez vos comptes de médias sociaux dans l'onglet "Connexion" pour voir les analyses détaillées de vos performances.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setActiveTab('connect')}
              >
                Connecter des comptes
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SocialMediaConnections;
