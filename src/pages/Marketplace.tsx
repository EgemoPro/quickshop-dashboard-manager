import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Twitter, Search, Plus, Store, ShoppingBag, ExternalLink, Settings, Download, Shield, MessageSquare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const openAddDialog = () => {
    setShowAddDialog(true);
  };
  
  const closeAddDialog = () => {
    setShowAddDialog(false);
  };
  
  return (
    <div className="container p-4 md:p-6 mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <CardTitle>Gestion de la Marketplace</CardTitle>
            <div className="flex gap-2">
              <Button variant="default" size="sm" onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une App
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
                <TabsTrigger value="payments">Paiements</TabsTrigger>
                <TabsTrigger value="shipping">Livraison</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex w-full sm:w-auto">
              <Input
                placeholder="Rechercher..."
                className="max-w-sm"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="overview" className="space-y-4">
            <p>Bienvenue dans la vue d'ensemble de la marketplace. Ici, vous pouvez voir un résumé de vos applications, réseaux sociaux connectés, méthodes de paiement et options de livraison.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Applications Installées</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-gray-500">Applications actives sur votre boutique.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Réseaux Sociaux Connectés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-sm text-gray-500">Plateformes sociales liées à votre compte.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Méthodes de Paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Options de paiement disponibles pour vos clients.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="applications" className="space-y-4">
            <p>Gérez les applications installées sur votre marketplace. Vous pouvez installer de nouvelles applications pour étendre les fonctionnalités de votre boutique.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MarketplaceApp name="Avis Clients" description="Collectez et affichez les avis de vos clients." category="Marketing" price="Gratuit" />
              <MarketplaceApp name="Optimisation SEO" description="Améliorez le référencement de votre boutique." category="Marketing" price="9.99€/mois" />
              <MarketplaceApp name="Chat en Direct" description="Communiquez en temps réel avec vos visiteurs." category="Support Client" price="Gratuit" />
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="space-y-4">
            <p>Connectez vos réseaux sociaux pour partager vos produits et interagir avec votre communauté.</p>
            
            <SocialChannel platform="Facebook" isConnected={true} followers={1200} likes={560} />
            <SocialChannel platform="Instagram" isConnected={false} followers={850} likes={320} />
            <SocialChannel platform="Twitter" isConnected={true} followers={600} likes={210} />
          </TabsContent>
          
          <TabsContent value="payments" className="space-y-4">
            <p>Configurez vos méthodes de paiement pour accepter les paiements de vos clients.</p>
            
            <PaymentMethod name="Carte de Crédit" description="Acceptez les paiements par carte de crédit." isEnabled={true} />
            <PaymentMethod name="PayPal" description="Acceptez les paiements via PayPal." isEnabled={false} />
            <PaymentMethod name="Virement Bancaire" description="Acceptez les paiements par virement bancaire." isEnabled={true} />
          </TabsContent>
          
          <TabsContent value="shipping" className="space-y-4">
            <p>Gérez vos options de livraison pour offrir une expérience d'expédition optimale à vos clients.</p>
            
            <ShippingOption name="Livraison Standard" description="Livraison en 3-5 jours ouvrables." price="4.99€" isEnabled={true} />
            <ShippingOption name="Livraison Express" description="Livraison en 1-2 jours ouvrables." price="9.99€" isEnabled={false} />
            <ShippingOption name="Retrait en Magasin" description="Les clients peuvent retirer leurs commandes en magasin." price="Gratuit" isEnabled={true} />
          </TabsContent>
        </CardContent>
      </Card>
      
      {/* Add App Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une application</DialogTitle>
            <DialogDescription>
              Installez une nouvelle application pour étendre les fonctionnalités de votre marketplace.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="app-name" className="text-right font-medium">
                Nom
              </label>
              <Input
                id="app-name"
                className="col-span-3"
                placeholder="Nom de l'application"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="app-category" className="text-right font-medium">
                Catégorie
              </label>
              <Select>
                <SelectTrigger className="col-span-3" id="app-category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Ventes</SelectItem>
                  <SelectItem value="support">Support Client</SelectItem>
                  <SelectItem value="analytics">Analytique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="app-price" className="text-right font-medium">
                Prix
              </label>
              <Input
                id="app-price"
                className="col-span-3"
                placeholder="Prix de l'application"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="app-description" className="text-right font-medium">
                Description
              </label>
              <textarea
                id="app-description"
                className="col-span-3 min-h-[80px] border rounded-md p-2"
                placeholder="Description de l'application"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={closeAddDialog}>
              Annuler
            </Button>
            <Button>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const MarketplaceApp = ({ name, description, category, price }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
      <CardFooter className="justify-between items-center">
        <Badge variant="secondary">{price}</Badge>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Installer
        </Button>
      </CardFooter>
    </Card>
  );
};

const SocialChannel = ({ platform, isConnected, followers, likes }) => {
  const [connected, setConnected] = useState(isConnected);
  
  const handleToggle = () => {
    setConnected(!connected);
    toast(`${platform} ${!connected ? "connecté" : "déconnecté"} avec succès`);
  };
  
  const getIcon = () => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      default:
        return <Store className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          {getIcon()}
        </div>
        <div>
          <p className="font-medium">{platform}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{followers} abonnés</span>
            <span>•</span>
            <span>{likes} likes</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch id={`${platform}-switch`} checked={connected} onCheckedChange={handleToggle} />
        <Button variant="ghost" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Gérer
        </Button>
      </div>
    </div>
  );
};

const PaymentMethod = ({ name, description, isEnabled }) => {
  const [enabled, setEnabled] = useState(isEnabled);
  
  const handleToggle = () => {
    setEnabled(!enabled);
    toast(`${name} ${!enabled ? "activé" : "désactivé"} avec succès`);
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <Switch id={`${name}-switch`} checked={enabled} onCheckedChange={handleToggle} />
    </div>
  );
};

const ShippingOption = ({ name, description, price, isEnabled }) => {
  const [enabled, setEnabled] = useState(isEnabled);
  
  const handleToggle = () => {
    setEnabled(!enabled);
    toast(`${name} ${!enabled ? "activé" : "désactivé"} avec succès`);
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="secondary">{price}</Badge>
        <Switch id={`${name}-switch`} checked={enabled} onCheckedChange={handleToggle} />
      </div>
    </div>
  );
};

export default Marketplace;
