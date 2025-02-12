
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
} from "recharts";
import {
  Package2,
  ShoppingCart,
  TrendingUp,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";

// Données factices pour le graphique
const data = [
  { name: "Lun", ventes: 400 },
  { name: "Mar", ventes: 300 },
  { name: "Mer", ventes: 500 },
  { name: "Jeu", ventes: 280 },
  { name: "Ven", ventes: 590 },
  { name: "Sam", ventes: 800 },
  { name: "Dim", ventes: 400 },
];

// Données factices pour les commandes récentes
const recentOrders = [
  { id: "#1234", client: "Jean Dupont", montant: "89,99 €", statut: "En cours" },
  { id: "#1235", client: "Marie Martin", montant: "129,99 €", statut: "Expédié" },
  { id: "#1236", client: "Pierre Durand", montant: "59,99 €", statut: "En attente" },
];

const Index = () => {
  const [selectedTab, setSelectedTab] = useState("apercu");

  const StatCard = ({ icon: Icon, title, value, trend }: any) => (
    <Card className="p-4 flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-gray-500" />
        <span className={`text-sm ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
          {trend > 0 ? "+" : ""}{trend}%
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-semibold">{value}</p>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Boutique</h1>
              <p className="text-gray-600 mt-1">Bienvenue sur votre tableau de bord</p>
            </div>
            <Button variant="outline" size="icon" onClick={() => window.location.href = '/settings'}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={ShoppingCart} title="Ventes du jour" value="1,234 €" trend={12} />
          <StatCard icon={Users} title="Nouveaux clients" value="48" trend={8} />
          <StatCard icon={Package2} title="Commandes" value="156" trend={-3} />
          <StatCard icon={TrendingUp} title="Revenu mensuel" value="12,456 €" trend={15} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-lg font-semibold mb-4">Statistiques des ventes</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="ventes"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Commandes récentes</h2>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {recentOrders.map((order, i) => (
                  <div key={order.id}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.montant}</p>
                        <Badge variant="secondary">{order.statut}</Badge>
                      </div>
                    </div>
                    {i < recentOrders.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        <Card className="mt-8 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Accès rapide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Ajouter un produit", icon: Package2, href: "/products" },
              { title: "Gérer les commandes", icon: ShoppingCart, href: "/orders" },
              { title: "Voir les statistiques", icon: TrendingUp, href: "/" },
            ].map((item) => (
              <Button
                key={item.title}
                variant="outline"
                className="h-auto py-4 px-6 justify-between hover:bg-gray-50"
                onClick={() => window.location.href = item.href}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
