
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  Package2,
  DollarSign,
  ArrowUpRight,
  BellRing,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Menu,
  Moon,
  Sun,
  Bell,
  UserCircle,
  HelpCircle,
  Settings,
  MessageCircle,
  Tag,
  ChevronDown
} from "lucide-react";
import { faker } from '@faker-js/faker';
import { Line, Bar, Pie } from "recharts";

// Créer des données factices pour les graphiques
const generateSalesData = () => {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  return days.map(day => ({
    name: day,
    ventes: faker.number.int({ min: 500, max: 2500 }),
    revenus: faker.number.int({ min: 1000, max: 5000 }),
  }));
};

const generateProductPerformance = () => {
  const categories = ['Vêtements', 'Électronique', 'Maison', 'Sports', 'Beauté'];
  return categories.map(category => ({
    name: category,
    value: faker.number.int({ min: 10, max: 100 }),
  }));
};

const generateRecentOrders = () => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: `ORD-${faker.string.numeric(6)}`,
    customer: faker.person.fullName(),
    date: faker.date.recent({ days: 5 }).toLocaleDateString(),
    amount: faker.finance.amount({ min: 50, max: 500, dec: 2, symbol: '€' }),
    status: faker.helpers.arrayElement(['Livrée', 'En cours', 'En attente', 'Annulée']),
    products: faker.number.int({ min: 1, max: 5 }),
  }));
};

const generateLowStockProducts = () => {
  return Array.from({ length: 4 }, (_, i) => ({
    id: `PRD-${faker.string.numeric(5)}`,
    name: faker.commerce.productName(),
    stock: faker.number.int({ min: 1, max: 10 }),
    category: faker.commerce.department(),
    price: faker.commerce.price({ min: 10, max: 200, dec: 2, symbol: '€' }),
  }));
};

const generateRecentMessages = () => {
  return Array.from({ length: 3 }, (_, i) => ({
    id: faker.string.uuid(),
    customer: faker.person.fullName(),
    avatar: `https://i.pravatar.cc/40?img=${faker.number.int({ min: 1, max: 70 })}`,
    message: faker.lorem.sentence({ min: 5, max: 15 }),
    time: faker.date.recent({ days: 2 }).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: faker.date.recent({ days: 2 }).toLocaleDateString(),
    isNew: faker.datatype.boolean(),
  }));
};

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [period, setPeriod] = useState("month");
  
  // Donnees
  const salesData = generateSalesData();
  const productPerformance = generateProductPerformance();
  const recentOrders = generateRecentOrders();
  const lowStockProducts = generateLowStockProducts();
  const recentMessages = generateRecentMessages();
  
  // Statistiques
  const stats = {
    totalSales: "12 478€",
    salesGrowth: "+12.5%",
    newCustomers: "76",
    customerGrowth: "+5.2%",
    pendingOrders: "23",
    orderGrowth: "+8.9%",
    avgOrderValue: "124€",
    valueGrowth: "+3.7%"
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-30 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm px-4 sm:px-6 py-3 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <h1 className="text-xl font-bold">QuickShop Dashboard</h1>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="relative">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <UserCircle className="h-7 w-7" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Alex Dupont</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Vendeur Pro</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Bonjour, Alex Dupont 👋</h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Voici les performances de votre boutique</p>
            </div>
            
            <div className="flex mt-4 sm:mt-0 space-x-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Aide
                </Button>
              </div>
              <div className="flex-1 sm:flex-none">
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Stats Cards */}
        <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <motion.div 
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300 h-full`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Ventes Totales</CardTitle>
                  <DollarSign className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{stats.totalSales}</div>
                  <div className="flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{stats.salesGrowth}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs mois précédent</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300 h-full`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Nouveaux Clients</CardTitle>
                  <Users className={`h-5 w-5 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{stats.newCustomers}</div>
                  <div className="flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{stats.customerGrowth}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs mois précédent</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            custom={2}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300 h-full`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Commandes en attente</CardTitle>
                  <ShoppingCart className={`h-5 w-5 ${darkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                  <div className="flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{stats.orderGrowth}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs mois précédent</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            custom={3}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300 h-full`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">Valeur moyenne</CardTitle>
                  <TrendingUp className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-baseline">
                  <div className="text-2xl font-bold">{stats.avgOrderValue}</div>
                  <div className="flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{stats.valueGrowth}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">vs mois précédent</p>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sales Chart */}
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
                        onClick={() => setPeriod("week")}
                      >
                        Semaine
                      </Button>
                      <Button 
                        size="sm" 
                        variant={period === "month" ? "default" : "outline"}
                        onClick={() => setPeriod("month")}
                      >
                        Mois
                      </Button>
                      <Button 
                        size="sm" 
                        variant={period === "year" ? "default" : "outline"}
                        onClick={() => setPeriod("year")}
                      >
                        Année
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    {/* Recharts Line Chart sera inséré ici */}
                    <div className="w-full h-full rounded-lg bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-900/20 dark:to-gray-800 flex items-center justify-center p-4">
                      <div className="text-center">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-500 dark:text-blue-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Graphique d'évolution des ventes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Orders Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Commandes récentes</CardTitle>
                      <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {recentOrders.length} commandes récentes
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                      Voir toutes
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[320px] pr-4">
                    <div className="space-y-4">
                      {recentOrders.map((order, index) => (
                        <div 
                          key={order.id}
                          className={`p-4 rounded-lg border ${
                            darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'
                          } transition-colors duration-200`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium">{order.id}</span>
                                <span className={`mx-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  • {order.date}
                                </span>
                              </div>
                              <div className="mt-1 text-sm">{order.customer}</div>
                              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                                {order.products} produit{order.products > 1 ? 's' : ''}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <Badge 
                                variant={
                                  order.status === "Livrée" ? "default" :
                                  order.status === "En cours" ? "secondary" :
                                  order.status === "En attente" ? "outline" : "destructive"
                                }
                                className="justify-center sm:justify-start"
                              >
                                {order.status}
                              </Badge>
                              <span className="font-medium text-right sm:text-left">{order.amount}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Sidebar Modules */}
          <div className="space-y-6">
            {/* Product Performance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
                <CardHeader>
                  <CardTitle>Performance des catégories</CardTitle>
                  <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                    Répartition des ventes par catégorie
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] w-full">
                    {/* Recharts Pie Chart sera inséré ici */}
                    <div className="w-full h-full rounded-lg bg-gradient-to-b from-purple-100 to-purple-50 dark:from-purple-900/20 dark:to-gray-800 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="h-16 w-16 mx-auto mb-2 rounded-full border-8 border-purple-200 dark:border-purple-800/30 border-t-purple-500 animate-spin" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">Graphique de répartition des catégories</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Low Stock Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Stock faible</CardTitle>
                      <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Produits à réapprovisionner
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                      Tout voir
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockProducts.map((product) => (
                      <div 
                        key={product.id}
                        className={`p-3 rounded-lg border ${
                          darkMode ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'
                        } transition-colors duration-200`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                              {product.category} • {product.price}
                            </p>
                          </div>
                          <Badge variant="destructive" className="mt-1">
                            Stock: {product.stock}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Messages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Messages récents</CardTitle>
                      <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        Communication avec les clients
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                      Voir tous
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMessages.map((message) => (
                      <div 
                        key={message.id}
                        className={`p-3 rounded-lg border ${message.isNew ? 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10' : darkMode ? 'border-gray-700' : 'border-gray-100'} transition-colors duration-200`}
                      >
                        <div className="flex gap-3">
                          <img 
                            src={message.avatar} 
                            alt={message.customer} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-sm truncate">{message.customer}</p>
                              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {message.time}
                              </span>
                            </div>
                            <p className={`text-sm mt-1 truncate ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {message.message}
                            </p>
                            <div className="mt-2 flex justify-between items-center">
                              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {message.date}
                              </span>
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                Répondre
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
