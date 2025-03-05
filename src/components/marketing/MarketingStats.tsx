
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Eye, ShoppingCart, Users, DollarSign, Percent, ChevronUp, ChevronDown } from "lucide-react";

interface MarketingStatsProps {
  darkMode: boolean;
}

const MarketingStats: React.FC<MarketingStatsProps> = ({ darkMode }) => {
  const { campaigns } = useSelector((state: RootState) => state.marketing);
  const stats = useSelector((state: RootState) => state.stats);
  
  // Données pour le graphique de performance des canaux
  const channelData = stats.channelPerformance;
  
  // Données pour le graphique de performance des campagnes
  const campaignPerformanceData = campaigns
    .filter(campaign => campaign.status === "active" || campaign.status === "completed")
    .map(campaign => ({
      name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + "..." : campaign.name,
      impressions: campaign.performance.impressions,
      clicks: campaign.performance.clicks,
      conversions: campaign.performance.conversions,
      revenue: campaign.performance.revenue,
      roi: campaign.performance.roi,
    }));
  
  // Données pour le graphique de répartition du budget
  const budgetDistributionData = [
    { name: "Facebook", value: 35 },
    { name: "Instagram", value: 25 },
    { name: "Google", value: 20 },
    { name: "Email", value: 15 },
    { name: "TikTok", value: 5 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  
  // Formater les nombres
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num;
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-md shadow-md ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-800'}`}>
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name === "ROI" ? `${entry.value}x` : formatNumber(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  return (
    <>
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <CardTitle>Performances Marketing</CardTitle>
          <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            Statistiques et analyses des efforts marketing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Impressions</p>
                  <p className="text-2xl font-bold mt-1">34.7K</p>
                </div>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  <Eye className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <ChevronUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500 font-medium">12.8%</span>
                <span className="text-xs ml-1 text-gray-500">vs dernier mois</span>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Taux de conversion</p>
                  <p className="text-2xl font-bold mt-1">2.7%</p>
                </div>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-700'}`}>
                  <Percent className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <ChevronUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500 font-medium">0.5%</span>
                <span className="text-xs ml-1 text-gray-500">vs dernier mois</span>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Nouveaux clients</p>
                  <p className="text-2xl font-bold mt-1">{stats.newCustomers}</p>
                </div>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <ChevronUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500 font-medium">{stats.customerGrowth}</span>
                <span className="text-xs ml-1 text-gray-500">vs dernier mois</span>
              </div>
            </div>
            
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>ROI Marketing</p>
                  <p className="text-2xl font-bold mt-1">{stats.marketingROI}</p>
                </div>
                <div className={`p-2 rounded-full ${darkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-700'}`}>
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <ChevronUp className="h-4 w-4 text-green-500" />
                <span className="text-xs text-green-500 font-medium">0.2x</span>
                <span className="text-xs ml-1 text-gray-500">vs dernier mois</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-base font-medium mb-4">Performance par canal</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={channelData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis 
                      dataKey="channel" 
                      tick={{ fill: darkMode ? "#9CA3AF" : "#4B5563" }}
                      tickLine={{ stroke: darkMode ? "#4B5563" : "#9CA3AF" }}
                    />
                    <YAxis 
                      tick={{ fill: darkMode ? "#9CA3AF" : "#4B5563" }}
                      tickLine={{ stroke: darkMode ? "#4B5563" : "#9CA3AF" }}
                      tickFormatter={formatNumber}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="sales" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-4">Répartition du budget</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value, percent }) => `${name}: ${value}% (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium mb-4">Performance des campagnes</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={campaignPerformanceData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: darkMode ? "#9CA3AF" : "#4B5563" }}
                    tickLine={{ stroke: darkMode ? "#4B5563" : "#9CA3AF" }}
                  />
                  <YAxis 
                    tick={{ fill: darkMode ? "#9CA3AF" : "#4B5563" }}
                    tickLine={{ stroke: darkMode ? "#4B5563" : "#9CA3AF" }}
                    tickFormatter={formatNumber}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="impressions" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="clicks" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="conversions" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default MarketingStats;
