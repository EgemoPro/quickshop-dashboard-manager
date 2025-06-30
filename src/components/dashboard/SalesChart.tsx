
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPeriod } from "@/store/slices/salesSlice";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { useCurrency } from "@/hooks/use-currency";
import { useIsMobile } from "@/hooks/use-mobile";

interface SalesChartProps {
  darkMode: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({ darkMode }) => {
  const dispatch = useAppDispatch();
  const { salesData, period } = useAppSelector(state => state.sales);
  const { currencySymbol } = useCurrency();
  const isMobile = useIsMobile()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-md shadow-md ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
          <p className="font-medium text-sm">{`${label}`}</p>
          <p className="text-sm text-blue-500">{`Ventes: ${payload[0].value}`}</p>
          <p className="text-sm text-purple-500">{`Revenus: ${payload[1].value} ${currencySymbol}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
            <div>
              <CardTitle>Évolution des ventes</CardTitle>
              <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Vue d'ensemble des performances de vente
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant={period === "week" ? "default" : "outline"}
                onClick={() => dispatch(setPeriod("week"))}
              >
                Semaine
              </Button>
              <Button 
                size="sm" 
                variant={period === "month" ? "default" : "outline"}
                onClick={() => dispatch(setPeriod("month"))}
              >
                Mois
              </Button>
              <Button 
                size="sm" 
                variant={period === "year" ? "default" : "outline"}
                onClick={() => dispatch(setPeriod("year"))}
              >
                Année
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            {period === "week" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: darkMode ? '#bbb' : '#666' }}
                    axisLine={{ stroke: darkMode ? '#555' : '#ddd' }}
                  />
                  {!isMobile && (<YAxis 
                    tick={{ fill: darkMode ? '#bbb' : '#666' }}
                    axisLine={{ stroke: darkMode ? '#555' : '#ddd' }}
                    
                  />)}
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ bottom: 0 }} />
                  <Bar 
                    dataKey="ventes" 
                    name="Ventes" 
                    fill={darkMode ? "#60a5fa" : "#4f86f6"} 
                    radius={[10, 10, 0, 0]} 
                    
                  />
                  <Bar 
                    dataKey="revenus" 
                    name={`Revenus (${currencySymbol})`} 
                    fill={darkMode ? "#c084fc" : "#8b5cf6"} 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={darkMode ? "#60a5fa" : "#3b82f6"} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={darkMode ? "#60a5fa" : "#3b82f6"} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRevenus" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={darkMode ? "#c083fc" : "#8b5cf6"} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={darkMode ? "#c084fc" : "#8b5cf6"} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#444' : '#eee'} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: darkMode ? '#bbb' : '#666' }}
                    axisLine={{ stroke: darkMode ? '#555' : '#ddd' }}
                  />
                  <YAxis 
                    tick={{ fill: darkMode ? '#bbb' : '#666' }}
                    axisLine={{ stroke: darkMode ? '#555' : '#ddd' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ bottom: 0 }} />
                  <Area 
                    type="monotone" 
                    dataKey="ventes" 
                    name="Ventes" 
                    stroke={darkMode ? "#60a5fa" : "#3b82f6"} 
                    fillOpacity={1} 
                    fill="url(#colorVentes)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenus" 
                    name={`Revenus (${currencySymbol})`} 
                    stroke={darkMode ? "#c084fc" : "#8b5cf6"} 
                    fillOpacity={1} 
                    fill="url(#colorRevenus)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SalesChart;
