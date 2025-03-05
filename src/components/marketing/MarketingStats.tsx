
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { ChartCandlestick, Mail, Gift, BarChart3 } from 'lucide-react';

const MarketingStats = () => {
  const { campaigns, promoCodes, emailTemplates } = useSelector((state: RootState) => state.marketing);
  
  // Calculate stats
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const activePromoCodes = promoCodes.filter(p => p.active).length;
  const emailsCount = emailTemplates.length;
  
  // Calculate platform distribution
  const platformData = campaigns.reduce((acc: { name: string; value: number }[], campaign) => {
    const existingPlatform = acc.find(item => item.name === campaign.platform);
    if (existingPlatform) {
      existingPlatform.value += 1;
    } else {
      acc.push({ name: campaign.platform, value: 1 });
    }
    return acc;
  }, []);
  
  // Calculate promo code type distribution
  const promoCodeData = promoCodes.reduce((acc: { name: string; value: number }[], code) => {
    const existingType = acc.find(item => item.name === code.discountType);
    if (existingType) {
      existingType.value += 1;
    } else {
      acc.push({ name: code.discountType, value: 1 });
    }
    return acc;
  }, []);
  
  // Calculate campaign performance
  const performanceData = campaigns.map(campaign => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + '...' : campaign.name,
    impressions: campaign.performance.impressions,
    clicks: campaign.performance.clicks,
    conversions: campaign.performance.conversions
  }));
  
  // Calculate ROI for campaigns
  const roiData = campaigns.map(campaign => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + '...' : campaign.name,
    roi: campaign.performance.roi
  }));

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Format large numbers with k suffix
  const formatYAxis = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toString() + 'k';
    }
    return num.toString();
  };

  // Format percentage values
  const formatPercent = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Performances Marketing</CardTitle>
            <CardDescription>Analyse de vos activités marketing</CardDescription>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <ChartCandlestick className="h-3.5 w-3.5 mr-1" />
              {activeCampaigns} campagnes actives
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Gift className="h-3.5 w-3.5 mr-1" />
              {activePromoCodes} codes promo actifs
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5 mr-1" />
              {emailsCount} modèles d'email
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="roi">ROI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis tickFormatter={formatYAxis} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impressions" name="Impressions" fill="#8884d8" />
                  <Bar dataKey="clicks" name="Clics" fill="#82ca9d" />
                  <Bar dataKey="conversions" name="Conversions" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Impressions Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.performance.impressions, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Clics Totaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.performance.clicks, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Conversions Totales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.performance.conversions, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Distribution des Plateformes</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} campagnes`, 'Quantité']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Types de Codes Promo</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={promoCodeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => {
                          const label = 
                            name === 'percentage' ? 'Pourcentage' : 
                            name === 'fixed' ? 'Montant fixe' : 
                            'Livraison gratuite';
                          return `${label} (${(percent * 100).toFixed(0)}%)`;
                        }}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {promoCodeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => {
                          return [`${value} codes`, name === 'percentage' ? 'Pourcentage' : 
                                              name === 'fixed' ? 'Montant fixe' : 
                                              'Livraison gratuite'];
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="roi" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={roiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                  <YAxis tickFormatter={(value) => `${value}x`} />
                  <Tooltip formatter={(value) => [`${value}x`, 'ROI']} />
                  <Bar dataKey="roi" name="ROI" fill="#FF8042">
                    {roiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.roi > 5 ? '#00C49F' : entry.roi > 2 ? '#FFBB28' : '#FF8042'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Coût Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.performance.cost, 0).toLocaleString()}€
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.reduce((sum, c) => sum + c.performance.revenue, 0).toLocaleString()}€
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm font-medium">ROI Moyen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {campaigns.length > 0 
                      ? (campaigns.reduce((sum, c) => sum + c.performance.roi, 0) / campaigns.length).toFixed(2) + 'x'
                      : '0x'
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketingStats;
