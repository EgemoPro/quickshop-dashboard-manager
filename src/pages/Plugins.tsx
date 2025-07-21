
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ExternalLink, ZapIcon, Download, ShoppingBag, TruckIcon, CreditCard, BarChart3, Globe, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

interface Plugin {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: "payment" | "shipping" | "marketing" | "analytics" | "security" | "other";
  installed: boolean;
  rating: number;
  downloads: number;
  author: string;
}

const Plugins: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const plugins: Plugin[] = [
    {
      id: "1",
      name: "Stripe Connect",
      description: "Acceptez les paiements par carte bancaire facilement sur votre boutique.",
      icon: CreditCard,
      category: "payment",
      installed: true,
      rating: 4.8,
      downloads: 15000,
      author: "Stripe Inc."
    },
    {
      id: "2",
      name: "DHL Express",
      description: "Intégration complète avec DHL pour la livraison internationale.",
      icon: TruckIcon,
      category: "shipping",
      installed: false,
      rating: 4.6,
      downloads: 9800,
      author: "DHL Group"
    },
    {
      id: "3",
      name: "Email Marketing Pro",
      description: "Créez et gérez des campagnes email automatisées pour booster vos ventes.",
      icon: ZapIcon,
      category: "marketing",
      installed: true,
      rating: 4.5,
      downloads: 12300,
      author: "MarketingTools"
    },
    {
      id: "4",
      name: "Advanced Analytics",
      description: "Visualisez et analysez les performances de votre boutique avec des graphiques détaillés.",
      icon: BarChart3,
      category: "analytics",
      installed: false,
      rating: 4.7,
      downloads: 8500,
      author: "DataViz Inc."
    },
    {
      id: "5",
      name: "Multi-Currency",
      description: "Permettez à vos clients d'acheter dans leur monnaie locale.",
      icon: Globe,
      category: "other",
      installed: false,
      rating: 4.4,
      downloads: 7200,
      author: "Global Commerce"
    },
    {
      id: "6",
      name: "Fraud Protection",
      description: "Protégez votre boutique contre les paiements frauduleux.",
      icon: Shield,
      category: "security",
      installed: true,
      rating: 4.9,
      downloads: 11000,
      author: "SecureShop"
    },
    {
      id: "7",
      name: "Dropshipping Connect",
      description: "Connectez votre boutique avec des fournisseurs dropshipping.",
      icon: ShoppingBag,
      category: "other",
      installed: false,
      rating: 4.3,
      downloads: 8900,
      author: "DropShip Solutions"
    },
  ];

  const filteredPlugins = plugins.filter(plugin => {
    const matchesSearch = plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          plugin.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || 
                      (activeTab === "installed" && plugin.installed) ||
                      plugin.category === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const getCategoryLabel = (category: string) => {
    const categories = {
      payment: { label: "Paiement", color: "bg-green-100 text-green-800" },
      shipping: { label: "Livraison", color: "bg-blue-100 text-blue-800" },
      marketing: { label: "Marketing", color: "bg-purple-100 text-purple-800" },
      analytics: { label: "Analytique", color: "bg-yellow-100 text-yellow-800" },
      security: { label: "Sécurité", color: "bg-red-100 text-red-800" },
      other: { label: "Autre", color: "bg-gray-100 text-gray-800" }
    };
    
    return categories[category as keyof typeof categories] || categories.other;
  };

  return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Plugins</h1>
            <p className="text-muted-foreground">
              Étendez les fonctionnalités de votre boutique avec des plugins
            </p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Découvrir plus de plugins
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden bg-card">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row md:items-center justify-between px-4 pt-4">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="installed">Installés</TabsTrigger>
              </TabsList>
              <div className="relative w-full md:w-64 mb-4 md:mb-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des plugins..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all" className="p-0 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredPlugins.length > 0 ? (
                  filteredPlugins.map((plugin) => (
                    <PluginCard key={plugin.id} plugin={plugin} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun plugin trouvé</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="installed" className="p-0 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {filteredPlugins.length > 0 ? (
                  filteredPlugins.map((plugin) => (
                    <PluginCard key={plugin.id} plugin={plugin} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">Aucun plugin installé</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  );
};

interface PluginCardProps {
  plugin: Plugin;
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
  const categoryInfo = getCategoryLabel(plugin.category);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-md ${plugin.installed ? 'bg-blue-100' : 'bg-gray-100'}`}>
              <plugin.icon className={`h-5 w-5 ${plugin.installed ? 'text-blue-700' : 'text-gray-700'}`} />
            </div>
            <div>
              <CardTitle className="text-lg">{plugin.name}</CardTitle>
              <CardDescription className="text-xs mt-1">
                Par {plugin.author}
              </CardDescription>
            </div>
          </div>
          <Badge className={`${categoryInfo.color} font-normal`}>
            {categoryInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {plugin.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(plugin.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 fill-current"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({plugin.rating.toFixed(1)})</span>
          </div>
          <span className="text-xs text-gray-500">
            <Download className="h-3 w-3 inline mr-1" />
            {plugin.downloads.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button 
            variant={plugin.installed ? "outline" : "default"} 
            size="sm" 
            className="w-full"
          >
            {plugin.installed ? "Configurer" : "Installer"}
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

function getCategoryLabel(category: string) {
  const categories: Record<string, { label: string; color: string }> = {
    payment: { label: "Paiement", color: "bg-green-100 text-green-800" },
    shipping: { label: "Livraison", color: "bg-blue-100 text-blue-800" },
    marketing: { label: "Marketing", color: "bg-purple-100 text-purple-800" },
    analytics: { label: "Analytique", color: "bg-yellow-100 text-yellow-800" },
    security: { label: "Sécurité", color: "bg-red-100 text-red-800" },
    other: { label: "Autre", color: "bg-gray-100 text-gray-800" }
  };
  
  return categories[category] || categories.other;
}

export default Plugins;
