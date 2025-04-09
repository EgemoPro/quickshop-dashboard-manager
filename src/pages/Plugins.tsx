import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ExternalLink, ZapIcon, Download, ShoppingBag, TruckIcon, CreditCard, BarChart3, Globe, Shield, Plug } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";
import { Skeleton } from "@/components/ui/skeleton";

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

const getCategoryLabel = (category: string) => {
  const categories: Record<string, { label: string; color: string }> = {
    payment: { label: "Paiement", color: "bg-green-100 text-green-800" },
    shipping: { label: "Livraison", color: "bg-blue-100 text-blue-800" },
    marketing: { label: "Marketing", color: "bg-purple-100 text-purple-800" },
    analytics: { label: "Analytique", color: "bg-yellow-100 text-yellow-800" },
    security: { label: "Sécurité", color: "bg-red-100 text-red-800" },
    other: { label: "Autre", color: "bg-gray-100 text-gray-800" }
  };
  
  return categories[category] || categories.other;
};

const Plugins: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

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
                      (activeTab === plugin.category);
    
    return matchesSearch && matchesTab;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center">
              <Plug className="mr-2 h-6 w-6 text-purple-600" />
              Plugins
            </h1>
            <p className="text-muted-foreground">
              Étendez les fonctionnalités de votre boutique avec des plugins
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Download className="mr-2 h-4 w-4" /> Découvrir plus de plugins
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden bg-card shadow-sm">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b bg-muted/30">
              <TabsList className="mb-4 md:mb-0 bg-background/90 backdrop-blur-sm">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="installed">Installés</TabsTrigger>
                <TabsTrigger value="payment">Paiement</TabsTrigger>
                <TabsTrigger value="shipping">Livraison</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="analytics">Analytique</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
                <TabsTrigger value="other">Autre</TabsTrigger>
              </TabsList>
              <div className="relative w-full md:w-64 mb-4 md:mb-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des plugins..."
                  className="pl-10 bg-background/80 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="all" className="p-0 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {isLoading ? (
                  Array(6).fill(0).map((_, index) => (
                    <PluginCardSkeleton key={index} />
                  ))
                ) : filteredPlugins.length > 0 ? (
                  filteredPlugins.map((plugin) => (
                    <PluginCard key={plugin.id} plugin={plugin} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">Aucun plugin trouvé</p>
                    <p className="text-muted-foreground max-w-md">
                      Essayez de modifier vos critères de recherche ou explorez notre marketplace pour découvrir plus de plugins.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {["installed", "payment", "shipping", "marketing", "analytics", "security", "other"].map((category) => (
              <TabsContent key={category} value={category} className="p-0 m-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {isLoading ? (
                    Array(3).fill(0).map((_, index) => (
                      <PluginCardSkeleton key={index} />
                    ))
                  ) : filteredPlugins.length > 0 ? (
                    filteredPlugins.map((plugin) => (
                      <PluginCard key={plugin.id} plugin={plugin} />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-lg font-medium mb-2">Aucun plugin dans cette catégorie</p>
                      <p className="text-muted-foreground max-w-md">
                        Explorez notre marketplace pour découvrir plus de plugins dans cette catégorie.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

interface PluginCardProps {
  plugin: Plugin;
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin }) => {
  const categoryInfo = getCategoryLabel(plugin.category);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-transparent hover:border-purple-200 group">
      <CardHeader className="pb-2 bg-gradient-to-r from-background to-muted/30">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-md ${plugin.installed ? 'bg-purple-100' : 'bg-gray-100'} transition-colors group-hover:scale-105`}>
              <plugin.icon className={`h-5 w-5 ${plugin.installed ? 'text-purple-700' : 'text-gray-700'}`} />
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-purple-700 transition-colors">{plugin.name}</CardTitle>
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
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
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
            className={`w-full ${plugin.installed ? '' : 'bg-purple-600 hover:bg-purple-700'}`}
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

const PluginCardSkeleton: React.FC = () => {
  return (
    <Card className="overflow-hidden animate-pulse">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <Skeleton className="h-9 w-9 rounded-md" />
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-8 ml-2 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Plugins;
