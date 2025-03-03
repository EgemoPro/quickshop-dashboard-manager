
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Facebook, Instagram, TikTok, PlusCircle, Settings, Link, Zap, ArrowRight, Globe, Mail, MessageCircle, ShoppingBag, Settings2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { updateIntegration } from "@/store/slices/settingsSlice";
import { useToast } from "@/components/ui/use-toast";

const Marketplace = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { integrations } = useAppSelector((state) => state.settings);
  
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [currentIntegration, setCurrentIntegration] = useState<{
    type: "crm" | "erp" | "marketingTools";
    provider: string;
  } | null>(null);
  const [apiKey, setApiKey] = useState("");
  
  const handleConnectIntegration = (type: "crm" | "erp" | "marketingTools", provider: string) => {
    setCurrentIntegration({ type, provider });
    setApiKey("");
    setApiKeyDialogOpen(true);
  };
  
  const handleSaveApiKey = () => {
    if (!currentIntegration) return;
    
    dispatch(updateIntegration({
      type: currentIntegration.type,
      data: {
        enabled: true,
        provider: currentIntegration.provider,
        apiKey: apiKey,
      }
    }));
    
    setApiKeyDialogOpen(false);
    toast({
      title: "Intégration activée",
      description: `Connexion établie avec ${currentIntegration.provider}.`,
    });
  };
  
  const handleDisconnectIntegration = (type: "crm" | "erp" | "marketingTools") => {
    dispatch(updateIntegration({
      type: type,
      data: {
        enabled: false,
        provider: "",
        apiKey: "",
      }
    }));
    
    toast({
      title: "Intégration désactivée",
      description: "La connexion a été supprimée.",
    });
  };
  
  // Apps catalog
  const appCategories = [
    {
      id: "crm",
      title: "CRM & Gestion Clients",
      apps: [
        { id: "salesforce", name: "Salesforce", icon: "https://placehold.co/100x100/6CA5F2/FFFFFF?text=SF" },
        { id: "hubspot", name: "HubSpot", icon: "https://placehold.co/100x100/FF7A59/FFFFFF?text=HS" },
        { id: "zoho", name: "Zoho CRM", icon: "https://placehold.co/100x100/E42527/FFFFFF?text=Z" },
      ]
    },
    {
      id: "erp",
      title: "ERP & Comptabilité",
      apps: [
        { id: "sap", name: "SAP Business One", icon: "https://placehold.co/100x100/0FAAFF/FFFFFF?text=SAP" },
        { id: "sage", name: "Sage", icon: "https://placehold.co/100x100/00CD88/FFFFFF?text=SAGE" },
        { id: "odoo", name: "Odoo", icon: "https://placehold.co/100x100/714B67/FFFFFF?text=ODOO" },
      ]
    },
    {
      id: "marketing",
      title: "Marketing & Communication",
      apps: [
        { id: "mailchimp", name: "Mailchimp", icon: "https://placehold.co/100x100/FFE01B/FFFFFF?text=MC" },
        { id: "sendinblue", name: "Sendinblue", icon: "https://placehold.co/100x100/0092FF/FFFFFF?text=SB" },
        { id: "google", name: "Google Analytics", icon: "https://placehold.co/100x100/F7AB00/FFFFFF?text=GA" },
      ]
    }
  ];
  
  const socialPlatforms = [
    { id: "facebook", name: "Facebook", color: "#1877F2", icon: Facebook },
    { id: "instagram", name: "Instagram", color: "#E4405F", icon: Instagram },
    { id: "tiktok", name: "TikTok", color: "#000000", icon: TikTok },
  ];
  
  return (
    <div className="container max-w-6xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Marketplace & Intégrations</h1>
            <p className="text-gray-500">Connectez votre boutique à des applications et plateformes tierces</p>
          </div>
        </div>
        
        <Tabs defaultValue="integrations">
          <TabsList className="mb-6">
            <TabsTrigger value="integrations">
              <Link className="h-4 w-4 mr-2" />
              Intégrations
            </TabsTrigger>
            <TabsTrigger value="socialplatforms">
              <Globe className="h-4 w-4 mr-2" />
              Plateformes Sociales
            </TabsTrigger>
            <TabsTrigger value="marketplace">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Marketplace
            </TabsTrigger>
          </TabsList>
          
          {/* INTEGRATIONS TAB */}
          <TabsContent value="integrations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>CRM</CardTitle>
                      <CardDescription>Gestion de la relation client</CardDescription>
                    </div>
                    <Badge variant={integrations.crm.enabled ? "default" : "secondary"}>
                      {integrations.crm.enabled ? "Connecté" : "Non connecté"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {integrations.crm.enabled ? (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-full p-2 mr-3">
                          <Settings2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{integrations.crm.provider}</p>
                          <p className="text-sm text-gray-500">Synchronisation des clients activée</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Settings2 className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-4">Aucun CRM connecté</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {appCategories[0].apps.map((app) => (
                          <Button 
                            key={app.id} 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleConnectIntegration("crm", app.name)}
                          >
                            {app.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {integrations.crm.enabled ? (
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDisconnectIntegration("crm")}
                    >
                      Déconnecter
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnectIntegration("crm", appCategories[0].apps[0].name)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Connecter
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>ERP</CardTitle>
                      <CardDescription>Gestion des ressources d'entreprise</CardDescription>
                    </div>
                    <Badge variant={integrations.erp.enabled ? "default" : "secondary"}>
                      {integrations.erp.enabled ? "Connecté" : "Non connecté"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {integrations.erp.enabled ? (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <Settings2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{integrations.erp.provider}</p>
                          <p className="text-sm text-gray-500">Synchronisation des produits et stocks activée</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Settings2 className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-4">Aucun ERP connecté</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {appCategories[1].apps.map((app) => (
                          <Button 
                            key={app.id} 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleConnectIntegration("erp", app.name)}
                          >
                            {app.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {integrations.erp.enabled ? (
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDisconnectIntegration("erp")}
                    >
                      Déconnecter
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnectIntegration("erp", appCategories[1].apps[0].name)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Connecter
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Marketing</CardTitle>
                      <CardDescription>Outils d'automatisation marketing</CardDescription>
                    </div>
                    <Badge variant={integrations.marketingTools.enabled ? "default" : "secondary"}>
                      {integrations.marketingTools.enabled ? "Connecté" : "Non connecté"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {integrations.marketingTools.enabled ? (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="bg-purple-100 rounded-full p-2 mr-3">
                          <Mail className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{integrations.marketingTools.provider}</p>
                          <p className="text-sm text-gray-500">Synchronisation des emails et campagnes activée</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Mail className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-4">Aucun outil marketing connecté</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {appCategories[2].apps.map((app) => (
                          <Button 
                            key={app.id} 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleConnectIntegration("marketingTools", app.name)}
                          >
                            {app.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  {integrations.marketingTools.enabled ? (
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDisconnectIntegration("marketingTools")}
                    >
                      Déconnecter
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnectIntegration("marketingTools", appCategories[2].apps[0].name)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Connecter
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Toutes les intégrations</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {appCategories.flatMap(category => 
                  category.apps.map(app => (
                    <Card key={app.id} className="flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <img src={app.icon} alt={app.name} className="w-16 h-16 mb-3 rounded" />
                      <p className="font-medium text-center">{app.name}</p>
                      <Button variant="ghost" size="sm" className="mt-2">
                        Installer
                      </Button>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
          
          {/* SOCIAL PLATFORMS TAB */}
          <TabsContent value="socialplatforms">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialPlatforms.map((platform) => (
                <Card key={platform.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-full mr-3"
                          style={{ backgroundColor: `${platform.color}20` }}
                        >
                          <platform.icon
                            style={{ color: platform.color }}
                            className="h-6 w-6"
                          />
                        </div>
                        <CardTitle>{platform.name}</CardTitle>
                      </div>
                      <Switch />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Connectez-vous à {platform.name} pour afficher vos produits et gérer vos ventes depuis la plateforme.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Synchronisation des produits</span>
                        <Badge variant="outline">Non configuré</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Catalogue connecté</span>
                        <Badge variant="outline">Non connecté</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      Se connecter à {platform.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Synchronisation automatique du catalogue</CardTitle>
                  <CardDescription>
                    Configurez les options de synchronisation automatique de vos produits entre les différentes plateformes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <Label htmlFor="auto-sync">Synchronisation automatique</Label>
                      </div>
                      <Switch id="auto-sync" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="sync-freq">Fréquence de synchronisation</Label>
                      </div>
                      <select className="p-2 border rounded-md">
                        <option>Quotidienne</option>
                        <option>Hebdomadaire</option>
                        <option>Mensuelle</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ArrowRight className="h-4 w-4 text-gray-500" />
                        <Label htmlFor="sync-direction">Direction de synchronisation</Label>
                      </div>
                      <select className="p-2 border rounded-md">
                        <option>Bidirectionnelle</option>
                        <option>De la boutique vers les plateformes</option>
                        <option>Des plateformes vers la boutique</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Enregistrer les paramètres</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* MARKETPLACE TAB */}
          <TabsContent value="marketplace">
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gérer votre boutique sur les marketplaces</CardTitle>
                  <CardDescription>
                    Vendez vos produits sur des marketplaces populaires pour atteindre plus de clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <img 
                        src="https://placehold.co/200x100/e2e8f0/1e293b?text=Amazon" 
                        alt="Amazon" 
                        className="mx-auto mb-4 h-12 object-contain"
                      />
                      <p className="font-medium">Amazon</p>
                      <Badge variant="outline" className="mt-2">Non connecté</Badge>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        Connecter
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 text-center">
                      <img 
                        src="https://placehold.co/200x100/e2e8f0/1e293b?text=eBay" 
                        alt="eBay" 
                        className="mx-auto mb-4 h-12 object-contain"
                      />
                      <p className="font-medium">eBay</p>
                      <Badge variant="outline" className="mt-2">Non connecté</Badge>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        Connecter
                      </Button>
                    </div>
                    
                    <div className="border rounded-lg p-4 text-center">
                      <img 
                        src="https://placehold.co/200x100/e2e8f0/1e293b?text=Etsy" 
                        alt="Etsy" 
                        className="mx-auto mb-4 h-12 object-contain"
                      />
                      <p className="font-medium">Etsy</p>
                      <Badge variant="outline" className="mt-2">Non connecté</Badge>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        Connecter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications recommandées</CardTitle>
                  <CardDescription>
                    Applications et services populaires pour améliorer votre boutique
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[...Array(9)].map((_, i) => {
                        const categories = ["email marketing", "analytics", "SEO", "livechat", "accounting", "inventory", "reviews", "loyalty", "shipping"];
                        const names = ["EmailPro", "DataMetrics", "SEO Boost", "LiveSupport", "AccountSync", "StockManager", "CustomerReviews", "RewardPoints", "ShipEasy"];
                        
                        return (
                          <Card key={i} className="flex flex-col">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{names[i]}</CardTitle>
                              <CardDescription className="text-xs">
                                {categories[i].charAt(0).toUpperCase() + categories[i].slice(1)}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow pb-2">
                              <p className="text-xs text-gray-500">
                                Améliorez votre boutique avec cette application de {categories[i]}.
                              </p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" size="sm" className="w-full">Installer</Button>
                            </CardFooter>
                          </Card>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* API KEY DIALOG */}
        <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Connecter {currentIntegration?.provider}</DialogTitle>
              <DialogDescription>
                Entrez votre clé API pour établir la connexion.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="apiKey" className="text-right">
                  Clé API
                </Label>
                <Input
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="col-span-3"
                  placeholder="Entrez votre clé API"
                />
              </div>
              <div className="col-span-4">
                <p className="text-sm text-gray-500">
                  Pour obtenir votre clé API, connectez-vous à votre compte {currentIntegration?.provider} et accédez à la section Développeurs ou API.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setApiKeyDialogOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleSaveApiKey}>
                Connecter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Marketplace;
