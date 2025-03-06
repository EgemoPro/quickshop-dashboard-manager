
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Activity, BarChart as BarChartIcon, ArrowUpRight, ArrowDownRight, Target, PieChart as PieChartIcon, Download } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const MarketingPerformanceMetrics = () => {
  const [timePeriod, setTimePeriod] = useState('month');
  const [focusMetric, setFocusMetric] = useState('roi');
  
  const { campaigns } = useSelector((state: RootState) => state.marketing);
  const { channelPerformance } = useSelector((state: RootState) => state.stats);
  const { storeStrategy } = useSelector((state: RootState) => state.strategy);
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Sample data for charts (would be replaced with real data in production)
  const campaignEffectivenessData = campaigns.map(campaign => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + '...' : campaign.name,
    effectivenessScore: (campaign.performance.clicks / (campaign.performance.impressions || 1)) * 100 + 
                        (campaign.performance.conversions / (campaign.performance.clicks || 1)) * 100
  })).sort((a, b) => b.effectivenessScore - a.effectivenessScore);
  
  const channelRoiData = channelPerformance.map(channel => ({
    name: channel.channel,
    roi: (parseFloat(channel.growth.replace('%', '')) / 10) + 2
  }));
  
  const conversionFunnelData = storeStrategy.performanceIndicators?.conversionFunnels?.[0]?.stages.map(stage => ({
    name: stage.name,
    value: stage.conversionRate
  })) || [];
  
  const markerShareData = [
    { name: 'Votre boutique', value: 25 },
    { name: 'Concurrent A', value: 35 },
    { name: 'Concurrent B', value: 20 },
    { name: 'Concurrent C', value: 15 },
    { name: 'Autres', value: 5 }
  ];
  
  const customerAcquisitionData = [
    { name: 'Jan', organic: 120, paid: 80 },
    { name: 'Fév', organic: 140, paid: 100 },
    { name: 'Mar', organic: 160, paid: 120 },
    { name: 'Avr', organic: 180, paid: 140 },
    { name: 'Mai', organic: 200, paid: 160 },
    { name: 'Juin', organic: 220, paid: 180 }
  ];
  
  const marketingMixData = [
    { subject: 'Social Media', A: 120, B: 110, fullMark: 150 },
    { subject: 'SEO', A: 98, B: 130, fullMark: 150 },
    { subject: 'Email', A: 86, B: 130, fullMark: 150 },
    { subject: 'PPC', A: 99, B: 100, fullMark: 150 },
    { subject: 'Content', A: 85, B: 90, fullMark: 150 },
    { subject: 'Affiliates', A: 65, B: 85, fullMark: 150 }
  ];
  
  // Dynamically calculate growth indicators
  const avgRoi = campaigns.length > 0 
    ? (campaigns.reduce((sum, c) => sum + c.performance.roi, 0) / campaigns.length)
    : 0;
  
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.performance.impressions, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.performance.clicks, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.performance.conversions, 0);
  
  const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
  
  // Sample growth data (would be real comparison in production)
  const roiGrowth = 15.4; // percentage
  const ctrGrowth = 2.8;
  const conversionGrowth = -1.2;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Analyse Avancée des Performances</CardTitle>
            <CardDescription>Métriques détaillées pour optimiser votre stratégie marketing</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">ROI Moyen</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{avgRoi.toFixed(2)}x</div>
                <div className={`flex items-center text-sm ${roiGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {roiGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {Math.abs(roiGrowth)}%
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Comparé à la période précédente</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Clics (CTR)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{ctr.toFixed(2)}%</div>
                <div className={`flex items-center text-sm ${ctrGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {ctrGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {Math.abs(ctrGrowth)}%
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Comparé à la période précédente</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Conversion</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-end justify-between">
                <div className="text-2xl font-bold">{conversionRate.toFixed(2)}%</div>
                <div className={`flex items-center text-sm ${conversionGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {conversionGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                  {Math.abs(conversionGrowth)}%
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Comparé à la période précédente</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue={focusMetric} onValueChange={setFocusMetric}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
            <TabsTrigger value="roi" className="flex items-center gap-1">
              <BarChartIcon className="h-4 w-4" />
              ROI par Canal
            </TabsTrigger>
            <TabsTrigger value="effectiveness" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              Efficacité
            </TabsTrigger>
            <TabsTrigger value="funnel" className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              Entonnoir de Conversion
            </TabsTrigger>
            <TabsTrigger value="marketMix" className="flex items-center gap-1">
              <PieChartIcon className="h-4 w-4" />
              Mix Marketing
            </TabsTrigger>
          </TabsList>
          
          <div className="border rounded-md p-4">
            <TabsContent value="roi" className="mt-0">
              <h3 className="text-lg font-medium mb-4">ROI par Canal Marketing</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelRoiData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}x`, 'ROI']} />
                    <Legend />
                    <Bar dataKey="roi" name="ROI" fill="#8884d8">
                      {channelRoiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Ce graphique montre le retour sur investissement pour chaque canal marketing. 
                Des valeurs plus élevées indiquent un meilleur rendement des dépenses marketing.
              </div>
            </TabsContent>
            
            <TabsContent value="effectiveness" className="mt-0">
              <h3 className="text-lg font-medium mb-4">Efficacité des Campagnes</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={campaignEffectivenessData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip formatter={(value) => [`${value.toFixed(2)}`, 'Score d\'efficacité']} />
                    <Legend />
                    <Bar dataKey="effectivenessScore" name="Score d'efficacité" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Ce graphique classe vos campagnes marketing selon un score d'efficacité 
                basé sur les taux de clics, conversions et autres métriques d'engagement.
              </div>
            </TabsContent>
            
            <TabsContent value="funnel" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Entonnoir de Conversion</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={conversionFunnelData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {conversionFunnelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Taux de conversion']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Acquisition Clients</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={customerAcquisitionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="organic" stackId="a" name="Organique" fill="#8884d8" />
                        <Bar dataKey="paid" stackId="a" name="Payant" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Ces graphiques montrent le parcours client depuis l'acquisition jusqu'à la conversion,
                et comment les clients sont répartis entre acquisition organique et payante.
              </div>
            </TabsContent>
            
            <TabsContent value="marketMix" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Mix Marketing</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={marketingMixData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Tooltip />
                        <Radar name="Votre boutique" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Radar name="Concurrents (moyenne)" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Part de Marché</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={markerShareData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {markerShareData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Part de marché']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Ces analyses vous permettent de comparer votre stratégie marketing par rapport à celle 
                de vos concurrents et visualiser votre position sur le marché.
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Données basées sur l'historique des performances des {timePeriod === 'week' ? '7 derniers jours' : 
                                                               timePeriod === 'month' ? '30 derniers jours' :
                                                               timePeriod === 'quarter' ? '90 derniers jours' : '12 derniers mois'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Exporter en PDF</Button>
            <Button variant="outline">Exporter en Excel</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingPerformanceMetrics;
