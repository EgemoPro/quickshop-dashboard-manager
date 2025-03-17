import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from "@/components/ui/scroll-area"

interface PerformanceData {
  name: string;
  value: number;
  target: number;
}

const MarketingPerformanceMetrics = () => {
  const { campaigns } = useSelector((state: RootState) => state.marketing);
  const { currencySymbol, currency } = useSelector((state: RootState) => state.settings);

  // Calculate total metrics
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.performance.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.performance.clicks, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.performance.conversions, 0);
  const totalCost = campaigns.reduce((sum, campaign) => sum + campaign.performance.cost, 0);
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.performance.revenue, 0);

  // Calculate overall ROI
  const overallROI = totalCost > 0 ? (totalRevenue - totalCost) / totalCost : 0;

  // Prepare data for the bar chart
  const performanceData: PerformanceData[] = [
    { name: 'Impressions', value: totalImpressions, target: 100000 },
    { name: 'Clicks', value: totalClicks, target: 10000 },
    { name: 'Conversions', value: totalConversions, target: 500 },
    { name: `Revenue (${currencySymbol})`, value: totalRevenue, target: 5000 },
  ];

  // Determine the status based on ROI
  const getROIStatus = (roi: number): 'success' | 'warning' | 'error' => {
    if (roi > 1) {
      return 'success';
    } else if (roi > 0) {
      return 'warning';
    } else {
      return 'error';
    }
  };

  const roiStatus = getROIStatus(overallROI);

  // Helper function to format numbers with commas
  const formatNumber = (num: number, slice: string=","): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, slice);
  };

  const formatCurrency = (num: number): string => {
    return `${formatNumber(num, " ")} ${currencySymbol}`;
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance Globale des Campagnes</CardTitle>
          <CardDescription>Aperçu des performances de toutes les campagnes marketing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Impressions</div>
              <div className="text-2xl font-bold">{formatNumber(totalImpressions)}</div>
              <Progress value={(totalImpressions / performanceData[0].target) * 100} />
              <p className="text-xs text-gray-500">
                {((totalImpressions / performanceData[0].target) * 100).toFixed(1)}% du target
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Clicks</div>
              <div className="text-2xl font-bold">{formatNumber(totalClicks)}</div>
              <Progress value={(totalClicks / performanceData[1].target) * 100} />
              <p className="text-xs text-gray-500">
                {((totalClicks / performanceData[1].target) * 100).toFixed(1)}% du target
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Conversions</div>
              <div className="text-2xl font-bold">{formatNumber(totalConversions)}</div>
              <Progress value={(totalConversions / performanceData[2].target) * 100} />
              <p className="text-xs text-gray-500">
                {((totalConversions / performanceData[2].target) * 100).toFixed(1)}% du target
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Dépenses</div>
              <div className="text-2xl font-bold">{formatCurrency(totalCost)}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Revenus</div>
              <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">ROI</div>
              <div className="text-2xl font-bold">
                <Badge
                  variant={roiStatus === 'success' ? 'success' : roiStatus === 'warning' ? 'warning' : 'destructive'}
                >
                  {(overallROI * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance par Campagne</CardTitle>
          <CardDescription>Analyse détaillée des performances de chaque campagne.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {campaigns.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Aucune campagne disponible.</div>
          ) : (
            <ScrollArea>
              <div className="min-w-[800px]">
                <table className="w-full border-collapse rounded-lg bg-background text-sm shadow-sm">
                  <thead className="[&_th]:px-4 [&_th]:py-2 [&_th]:text-left">
                    <tr>
                      <th className="font-medium">Nom</th>
                      <th className="font-medium">Plateforme</th>
                      <th className="font-medium">Impressions</th>
                      <th className="font-medium">Clicks</th>
                      <th className="font-medium">Conversions</th>
                      <th className="font-medium">Dépenses</th>
                      <th className="font-medium">Revenus</th>
                      <th className="font-medium">ROI</th>
                    </tr>
                  </thead>
                  <tbody className="[&_td]:p-4 [&_tr:not(:last-child)]:border-b">
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td>{campaign.name}</td>
                        <td>{campaign.platform}</td>
                        <td>{formatNumber(campaign.performance.impressions)}</td>
                        <td>{formatNumber(campaign.performance.clicks)}</td>
                        <td>{formatNumber(campaign.performance.conversions)}</td>
                        <td>{formatCurrency(campaign.performance.cost)}</td>
                        <td>{formatCurrency(campaign.performance.revenue)}</td>
                        <td>
                          <Badge variant={getROIStatus(campaign.performance.roi) === 'success' ? 'success' : getROIStatus(campaign.performance.roi) === 'warning' ? 'warning' : 'destructive'}>
                            {(campaign.performance.roi * 100).toFixed(1)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analyse Comparative</CardTitle>
          <CardDescription>Comparaison des métriques clés avec les objectifs.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number | string) => typeof value === 'number' ? value.toFixed(2) : value} />
              <Legend />
              <Bar dataKey="value" name="Valeur Actuelle" fill="#8884d8" />
              <Bar dataKey="target" name="Objectif" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingPerformanceMetrics;
