
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Package2,
  ShoppingCart,
  TrendingUp,
  Users,
  Settings,
  ChevronRight,
  Bell,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  CircleDollarSign,
} from "lucide-react";

// Données factices pour le graphique
const data = [
  { name: "Lun", ventes: 400, clients: 240 },
  { name: "Mar", ventes: 300, clients: 180 },
  { name: "Mer", ventes: 500, clients: 320 },
  { name: "Jeu", ventes: 280, clients: 200 },
  { name: "Ven", ventes: 590, clients: 380 },
  { name: "Sam", ventes: 800, clients: 490 },
  { name: "Dim", ventes: 400, clients: 220 },
];

// Données factices pour les commandes récentes
const recentOrders = [
  { 
    id: "#1234", 
    client: "Jean Dupont", 
    montant: "89,99 €", 
    statut: "En cours",
    date: "Aujourd'hui, 14:22" 
  },
  { 
    id: "#1235", 
    client: "Marie Martin", 
    montant: "129,99 €", 
    statut: "Expédié",
    date: "Hier, 16:45" 
  },
  { 
    id: "#1236", 
    client: "Pierre Durand", 
    montant: "59,99 €", 
    statut: "En attente",
    date: "19 juin, 09:30" 
  },
  { 
    id: "#1237", 
    client: "Sophie Laurent", 
    montant: "149,99 €", 
    statut: "Livré",
    date: "18 juin, 11:15" 
  },
];

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("apercu");
  const [selectedChart, setSelectedChart] = useState("ventes");

  const StatCard = ({ icon: Icon, title, value, trend, color, description }: any) => (
    <Card className="p-5 flex flex-col space-y-2 h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
          {trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-400 mt-auto">{description}</p>
    </Card>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-100 text-blue-700";
      case "Expédié":
        return "bg-purple-100 text-purple-700";
      case "En attente":
        return "bg-yellow-100 text-yellow-700";
      case "Livré":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6"
      >
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-500 mt-1 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Aujourd'hui: {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </Button>
              <Button variant="outline" size="icon" onClick={() => window.location.href = '/settings'}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard 
            icon={CircleDollarSign} 
            title="Ventes du jour" 
            value="1 234 €" 
            trend={12} 
            color="bg-blue-500"
            description="16% de plus que la semaine dernière" 
          />
          <StatCard 
            icon={Users} 
            title="Nouveaux clients" 
            value="48" 
            trend={8} 
            color="bg-purple-500"
            description="12 de plus qu'hier" 
          />
          <StatCard 
            icon={Package2} 
            title="Commandes" 
            value="156" 
            trend={-3} 
            color="bg-amber-500"
            description="7% de moins que prévu" 
          />
          <StatCard 
            icon={TrendingUp} 
            title="Revenu mensuel" 
            value="12 456 €" 
            trend={15} 
            color="bg-green-500" 
            description="En hausse de 4 523 € ce mois-ci"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2 p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-semibold">Statistiques</h2>
              <div className="flex bg-gray-100 rounded-lg">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`px-3 rounded-lg ${selectedChart === 'ventes' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setSelectedChart('ventes')}
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Ventes
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`px-3 rounded-lg ${selectedChart === 'clients' ? 'bg-white shadow-sm' : ''}`}
                  onClick={() => setSelectedChart('clients')}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Clients
                </Button>
              </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                {selectedChart === 'ventes' ? (
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid #eaeaea'
                      }}
                      formatter={(value) => [`${value} €`, 'Ventes']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ventes" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorVentes)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                ) : (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid #eaeaea'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clients" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Commandes récentes</h2>
              <Button variant="ghost" size="sm" className="text-xs text-blue-600">
                Voir tout
              </Button>
            </div>
            <ScrollArea className="h-[320px]">
              <div className="space-y-4">
                {recentOrders.map((order, i) => (
                  <div key={order.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{order.id}</p>
                          <Badge variant="outline" className={getStatusColor(order.statut)}>
                            {order.statut}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{order.client}</p>
                        <p className="text-xs text-gray-400">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{order.montant}</p>
                      </div>
                    </div>
                    {i < recentOrders.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        <Card className="p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold">Accès rapide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                title: "Ajouter un produit", 
                icon: Package2, 
                href: "/products",
                description: "Gérer votre catalogue de produits"
              },
              { 
                title: "Gérer les commandes", 
                icon: ShoppingCart, 
                href: "/orders",
                description: "Suivre et traiter les commandes clients" 
              },
              { 
                title: "Voir les statistiques", 
                icon: TrendingUp, 
                href: "/",
                description: "Analyser les performances de votre boutique"
              },
            ].map((item) => (
              <Card 
                key={item.title}
                className="p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
                onClick={() => window.location.href = item.href}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <item.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
