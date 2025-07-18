
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatDistanceToNow } from '@/utils/formatDate';
import { ArrowUpRight, ArrowDownRight, TrendingUp, ShoppingBag, Users, CreditCard } from 'lucide-react';

// Sample data for the chart
const performanceData = [
  { name: '1 Jan', revenue: 1200, visitors: 800, orders: 120 },
  { name: '8 Jan', revenue: 1800, visitors: 1200, orders: 140 },
  { name: '15 Jan', revenue: 1400, visitors: 1000, orders: 130 },
  { name: '22 Jan', revenue: 2200, visitors: 1500, orders: 170 },
  { name: '29 Jan', revenue: 2600, visitors: 1700, orders: 190 },
  { name: '5 Feb', revenue: 2900, visitors: 1900, orders: 210 },
  { name: '12 Feb', revenue: 3100, visitors: 2100, orders: 220 },
];

const MarketingOverview = () => {
  const { campaigns, promoCodes } = useSelector((state: RootState) => state.marketing);
  const { currencySymbol } = useSelector((state: RootState) => state.settings);
  
  // Calculate active campaigns
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const activePromoCodes = promoCodes.filter(p => p.active).length;
  
  // Recent performance indicators
  const revenueChange = 18.2; // percentage
  const visitorChange = 12.5;
  const conversionChange = -3.8;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aperçu Marketing</CardTitle>
        <CardDescription>Vue d'ensemble de vos performances marketing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border p-4 flex flex-col">
              <p className="text-sm text-gray-500 mb-1 flex items-center">
                <ShoppingBag className="h-4 w-4 mr-1" />
                Revenus (30j)
              </p>
              <div className="flex items-center">
                <span className="text-2xl font-bold">29,482 {currencySymbol}</span>
                <span className={`ml-2 flex items-center text-sm ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(revenueChange)}%
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-4 flex flex-col">
              <p className="text-sm text-gray-500 mb-1 flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Visiteurs (30j)
              </p>
              <div className="flex items-center">
                <span className="text-2xl font-bold">15,724</span>
                <span className={`ml-2 flex items-center text-sm ${visitorChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {visitorChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(visitorChange)}%
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-4 flex flex-col">
              <p className="text-sm text-gray-500 mb-1 flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                Taux de conversion
              </p>
              <div className="flex items-center">
                <span className="text-2xl font-bold">3.2%</span>
                <span className={`ml-2 flex items-center text-sm ${conversionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {conversionChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(conversionChange)}%
                </span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={performanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} name={`Revenus (${currencySymbol})`} />
                <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#82ca9d" name="Commandes" />
                <Line yAxisId="right" type="monotone" dataKey="visitors" stroke="#ffc658" name="Visiteurs" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                Campagnes Actives
              </h3>
              <p className="text-3xl font-bold">{activeCampaigns}</p>
              <p className="text-sm text-gray-500 mt-1">
                {campaigns.length > 0 
                  ? `La dernière campagne a été créée ${formatDistanceToNow(new Date(campaigns[campaigns.length - 1].startDate))}.`
                  : 'Aucune campagne n\'est active pour le moment.'}
              </p>
            </div>
            
            <div className="bg-white rounded-lg border p-4">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2 text-green-500" />
                Codes Promo Actifs
              </h3>
              <p className="text-3xl font-bold">{activePromoCodes}</p>
              <p className="text-sm text-gray-500 mt-1">
                {promoCodes.length > 0 
                  ? `Le code le plus utilisé a été utilisé ${Math.max(...promoCodes.map(p => p.usedCount))} fois.`
                  : 'Aucun code promo n\'est actif pour le moment.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingOverview;
