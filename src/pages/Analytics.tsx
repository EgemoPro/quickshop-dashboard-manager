import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Download, Users, Calendar, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { setPeriod } from "@/store/slices/salesSlice";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
// import { formatCurrency } from "@/lib/format-numbers";
import CustomTooltip from "@/components/CustomTooltip";
import { useCurrency } from "@/hooks/use-currency";

const Analytics = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { salesData, period } = useAppSelector((state) => state.sales);
  const { topSellingProducts, channelPerformance, totalSales } = useAppSelector((state) => state.stats);
  // const {} = useAppSelector(state => state.settings);
  const  {formatCurrency, currencySymbol}= useCurrency()
  
  const [reportType, setReportType] = useState("sales");
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className={cn(isMobile ? "p-2" : "container max-w-6xl mx-auto p-4" , "")}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Analyse & Reporting</h1>
            <p className="text-gray-500">Visualisez et analysez les performances de votre boutique</p>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Télécharger Rapport
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
              <CardDescription className="text-2xl font-bold">{formatCurrency(totalSales, {withSpace:true, withSymbol: true} )} </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-500 flex items-center">
                <span className="mr-1">↑</span> 12.5% par rapport au mois dernier
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Nouveaux Clients</CardTitle>
              <CardDescription className="text-2xl font-bold">76</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-500 flex items-center">
                <span className="mr-1">↑</span> 5.2% par rapport au mois dernier
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion</CardTitle>
              <CardDescription className="text-2xl font-bold">2.7%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-green-500 flex items-center">
                <span className="mr-1">↑</span> 0.8% par rapport au mois dernier
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue={reportType} onValueChange={setReportType}>
            <div className="flex max-md:flex-col-reverse  max-md:gap-2 justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="sales" className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ventes
                </TabsTrigger>
                <TabsTrigger value="products" className="flex items-center">
                  <PieChartIcon className="mr-2 h-4 w-4" />
                  Produits
                </TabsTrigger>
                <TabsTrigger value="customers" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Clients
                </TabsTrigger>
                <TabsTrigger value="channels" className="flex items-center">
                  <LineChartIcon className="mr-2 h-4 w-4" />
                  Canaux
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Select
                  value={period}
                  onValueChange={(value) => dispatch(setPeriod(value as "week" | "month" | "year"))}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Période" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                    <SelectItem value="year">Cette année</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {reportType === "sales" && "Tendance des Ventes"}
                  {reportType === "products" && "Performance des Produits"}
                  {reportType === "customers" && "Comportement des Clients"}
                  {reportType === "channels" && "Performance des Canaux"}
                </CardTitle>
                <CardDescription>
                  {reportType === "sales" && "Évolution des ventes et revenus sur la période"}
                  {reportType === "products" && "Répartition des ventes par produit"}
                  {reportType === "customers" && "Analyse du comportement d'achat des clients"}
                  {reportType === "channels" && "Performance des différents canaux de vente"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[450px] p-6">
                  {reportType === "sales" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        {/* <CartesianGrid strokeDasharray="3 3" /> */}
                        <XAxis dataKey="name" />
                        {!isMobile && 
                          (<>
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          </>)}
                        <Tooltip content={<CustomTooltip darkMode={false}/>} />
                        <Legend />
                        <Bar yAxisId="left" className="rounded-t-md" dataKey="ventes" name="Nombre de ventes" fill="#8884d8" radius={[10, 10, 0, 0]}  />
                        <Bar yAxisId="right" className="rounded-t-md" dataKey="revenus" name={`Revenus (${currencySymbol})`} fill="#82ca9d" radius={[10, 10, 0, 0]}  />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                  
                  {reportType === "products" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                      <div>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={topSellingProducts}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="sales"
                              nameKey="name"
                              label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {topSellingProducts.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip  />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-lg font-semibold mb-4">Top Produits</h3>
                        <div className="space-y-4">
                          {topSellingProducts.map((product, index) => (
                            <div key={product.id} className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Badge 
                                  variant="outline" 
                                  className="mr-2 h-6 w-6 flex items-center justify-center p-0"
                                  style={{ backgroundColor: COLORS[index % COLORS.length], color: 'white' }}
                                >
                                  {index + 1}
                                </Badge>
                                <span>{product.name}</span>
                              </div>
                              <span className="font-medium">{product.sales} vendus</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {reportType === "customers" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'Jan', nouveaux: 40, recurring: 24 },
                        { name: 'Fév', nouveaux: 30, recurring: 28 },
                        { name: 'Mar', nouveaux: 20, recurring: 30 },
                        { name: 'Avr', nouveaux: 27, recurring: 35 },
                        { name: 'Mai', nouveaux: 18, recurring: 39 },
                        { name: 'Juin', nouveaux: 23, recurring: 43 },
                        { name: 'Juil', nouveaux: 34, recurring: 45 },
                        { name: 'Août', nouveaux: 35, recurring: 48 },
                        { name: 'Sep', nouveaux: 30, recurring: 52 },
                        { name: 'Oct', nouveaux: 32, recurring: 55 },
                        { name: 'Nov', nouveaux: 38, recurring: 58 },
                        { name: 'Déc', nouveaux: 45, recurring: 62 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        {!isMobile && (<YAxis />)}
                        <Tooltip content={<CustomTooltip darkMode={false} />} />
                        <Legend />
                        <Area type="monotone" dataKey="nouveaux" name="Nouveaux clients" stroke="#8884d8" fill="#8884d8" />
                        <Area type="monotone" dataKey="recurring" name="Clients fidèles" stroke="#82ca9d" fill="#82ca9d" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  
                  {reportType === "channels" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={channelPerformance.map(item => ({
                        name: item.channel,
                        ventes: item.sales,
                        growth: parseFloat(item.growth.replace('%', ''))
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                        {!isMobile && (<>
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                        </>)}
                        <Tooltip content={<CustomTooltip darkMode={false} />} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="ventes" name="Ventes" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="growth" name="Croissance (%)" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Rapports détaillés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Rapport des ventes</CardTitle>
                <CardDescription>Télécharger au format PDF ou Excel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Rapport des produits</CardTitle>
                <CardDescription>Télécharger au format PDF ou Excel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Rapport des clients</CardTitle>
                <CardDescription>Télécharger au format PDF ou Excel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" /> Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
