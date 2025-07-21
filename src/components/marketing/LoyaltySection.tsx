
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Users, Star, CreditCard, BarChart3, Settings } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';

interface ProgramSetting {
  id: string;
  name: string;
  description: string;
  value: string | number | boolean;
  type: 'text' | 'number' | 'toggle';
}

interface Affiliate {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'pending' | 'inactive';
  earnings: number;
  sales: number;
  joinDate: string;
}

const programSettings: ProgramSetting[] = [
  {
    id: 'points_per_sous',
    name: 'Points par Montant',
    description: 'Nombre de points attribués pour chaque sous dépensé',
    value: 10,
    type: 'number'
  },
  {
    id: 'points_per_review',
    name: 'Points par Avis',
    description: 'Nombre de points attribués pour chaque avis publié',
    value: 50,
    type: 'number'
  },
  {
    id: 'points_per_referral',
    name: 'Points par Parrainage',
    description: 'Nombre de points attribués pour chaque client parrainé',
    value: 100,
    type: 'number'
  },
  {
    id: 'redemption_ratio',
    name: 'Ratio d\'échange',
    description: 'Valeur en sous de 100 points',
    value: 5,
    type: 'number'
  },
  {
    id: 'welcome_bonus',
    name: 'Bonus de bienvenue',
    description: 'Points offerts à l\'inscription',
    value: 200,
    type: 'number'
  },
  {
    id: 'program_enabled',
    name: 'Programme Actif',
    description: 'Activer ou désactiver le programme de fidélité',
    value: true,
    type: 'toggle'
  },
  {
    id: 'expiration_days',
    name: 'Jours avant expiration',
    description: 'Nombre de jours avant que les points n\'expirent (0 = jamais)',
    value: 365,
    type: 'number'
  }
];

const affiliates: Affiliate[] = [
  {
    id: 'aff-001',
    name: 'Marie Laurent',
    email: 'marie@example.com',
    status: 'active',
    earnings: 350.75,
    sales: 15,
    joinDate: '2023-05-10'
  },
  {
    id: 'aff-002',
    name: 'Thomas Petit',
    email: 'thomas@example.com',
    status: 'active',
    earnings: 275.20,
    sales: 12,
    joinDate: '2023-07-22'
  },
  {
    id: 'aff-003',
    name: 'Sophie Martin',
    email: 'sophie@example.com',
    status: 'pending',
    earnings: 0,
    sales: 0,
    joinDate: '2023-10-05'
  }
];

const LoyaltySection = () => {
  const [settings, setSettings] = useState<ProgramSetting[]>(programSettings);
  const [affiliatesList, setAffiliatesList] = useState<Affiliate[]>(affiliates);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const {currencySymbol} = useAppSelector(state => state.settings)

  const updateSetting = (id: string, value: string | number | boolean) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, value } : setting
    ));
  };

  const handleSaveSettings = () => {
    // Here you would normally save to the backend
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const updateAffiliateStatus = (id: string, status: 'active' | 'pending' | 'inactive') => {
    setAffiliatesList(affiliatesList.map(affiliate => 
      affiliate.id === id ? { ...affiliate, status } : affiliate
    ));
  };

  return (
    <Card className="">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Programme de Fidélité & Affiliation</CardTitle>
            <CardDescription>Gérez vos programmes d'engagement client</CardDescription>
          </div>
          {showSaveMessage && (
            <Badge variant="default" className="bg-green-500">
              Modifications enregistrées
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="loyalty">
          <TabsList className="mb-4">
            <TabsTrigger value="loyalty" className="flex items-center gap-1">
              <Gift className="h-4 w-4" />
              Programme de Fidélité
            </TabsTrigger>
            <TabsTrigger value="affiliates" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Programme d'Affiliation
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="loyalty">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Configuration des Points</h3>
                <Button onClick={handleSaveSettings}>Enregistrer les modifications</Button>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {settings.map(setting => (
                  <Card key={setting.id} className="overflow-hidden">
                    <CardHeader className="p-4 bg-gray-50">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{setting.name}</CardTitle>
                        {setting.type === 'toggle' && (
                          <Switch 
                            checked={setting.value as boolean} 
                            onCheckedChange={(checked) => updateSetting(setting.id, checked)}
                          />
                        )}
                      </div>
                      <CardDescription>{setting.description}</CardDescription>
                    </CardHeader>
                    {setting.type !== 'toggle' && (
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <Input 
                            type={setting.type === 'number' ? 'number' : 'text'}
                            value={setting.value as string | number}
                            onChange={(e) => updateSetting(
                              setting.id, 
                              setting.type === 'number' ? Number(e.target.value) : e.target.value
                            )}
                            min={0}
                            step={setting.type === 'number' ? 1 : undefined}
                            className="max-w-[200px]"
                          />
                          {setting.id === 'redemption_ratio' && (
                            <span className="ml-2"> {currencySymbol} pour 100 points</span>
                          )}
                          {setting.id === 'points_per_sous' && (
                            <span className="ml-2">points par  {currencySymbol}</span>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
              
              <div className="p-4 border rounded-md bg-blue-50 text-blue-800 mt-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Star className="h-4 w-4" /> Aperçu de la valeur des points
                </h4>
                <p className="mt-2 text-sm">
                  Avec les paramètres actuels, 100 points ont une valeur de 
                  <span className="font-bold mx-1">
                    {settings.find(s => s.id === 'redemption_ratio')?.value as number} {currencySymbol}
                  </span>
                </p>
                <p className="mt-1 text-sm">
                  Un client doit dépenser 
                  <span className="font-bold mx-1">
                    {100 / (settings.find(s => s.id === 'points_per_sous')?.value as number)} {currencySymbol}
                  </span>
                  pour obtenir 100 points (soit une réduction de 
                  <span className="font-bold mx-1">
                    {((settings.find(s => s.id === 'redemption_ratio')?.value as number) / (100 / (settings.find(s => s.id === 'points_per_sous')?.value as number)) * 100).toFixed(1)}%
                  </span>
                  )
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="affiliates">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Partenaires d'Affiliation</h3>
                <Button>Ajouter un Affilié</Button>
              </div>
              
              <div className="grid gap-4">
                {affiliatesList.map(affiliate => (
                  <Card key={affiliate.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{affiliate.name}</h3>
                          <Badge 
                            variant={
                              affiliate.status === 'active' ? 'default' : 
                              affiliate.status === 'pending' ? 'outline' : 
                              'secondary'
                            }
                          >
                            {affiliate.status === 'active' ? 'Actif' : 
                             affiliate.status === 'pending' ? 'En attente' : 
                             'Inactif'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{affiliate.email}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="border rounded p-2 bg-gray-50">
                            <p className="text-xs text-gray-500">Gains</p>
                            <p className="font-medium">{affiliate.earnings.toFixed(2)} {currencySymbol}</p>
                          </div>
                          <div className="border rounded p-2 bg-gray-50">
                            <p className="text-xs text-gray-500">Ventes</p>
                            <p className="font-medium">{affiliate.sales}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Statistiques
                        </Button>
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Paiement
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Paramètres
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="p-4 border rounded-md bg-green-50 text-green-800 mt-6">
                <h4 className="flex items-center gap-2 text-sm font-semibold">
                  <Star className="h-4 w-4" /> Informations sur le programme d'affiliation
                </h4>
                <p className="mt-2 text-sm">
                  Les affiliés gagnent une commission de 10% sur toutes les ventes qu'ils génèrent.
                </p>
                <p className="mt-1 text-sm">
                  Les paiements sont effectués lorsque le solde atteint 50€ minimum.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoyaltySection;
