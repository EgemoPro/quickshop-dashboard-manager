
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Megaphone, Gift, Mail, Plus, Edit, Trash2, Calendar as CalendarIcon, Facebook, Instagram, TikTok } from "lucide-react";
import { addPromoCode, addCampaign, addEmailTemplate, deletePromoCode, togglePromoCodeStatus, updateCampaign } from "@/store/slices/marketingSlice";

const Marketing = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { promoCodes, campaigns, emailTemplates } = useAppSelector((state) => state.marketing);
  
  // State for forms
  const [isAddPromoOpen, setIsAddPromoOpen] = useState(false);
  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false);
  const [isAddEmailOpen, setIsAddEmailOpen] = useState(false);
  
  // Promo code form state
  const [promoForm, setPromoForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    limitedUses: false,
    maxUses: 100,
    active: true,
  });
  
  // Campaign form state
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    platform: "facebook",
    status: "draft",
    budget: 500,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    target: {
      demographics: ["18-35"],
      interests: ["shopping"],
      locations: ["Paris"],
    }
  });
  
  // Email template form state
  const [emailForm, setEmailForm] = useState({
    name: "",
    subject: "",
    content: "<p>Bonjour {{prenom}},</p><p>Merci pour votre fidélité!</p>",
  });
  
  // Handle promo code submission
  const handleAddPromoCode = () => {
    dispatch(addPromoCode({
      code: promoForm.code,
      discountType: promoForm.discountType as "percentage" | "fixed" | "freeShipping",
      discountValue: promoForm.discountValue,
      minPurchase: promoForm.minPurchase,
      startDate: promoForm.startDate,
      endDate: promoForm.endDate,
      limitedUses: promoForm.limitedUses,
      maxUses: promoForm.maxUses,
      applicableProducts: "all",
      applicableCategories: "all",
      active: promoForm.active,
    }));
    setIsAddPromoOpen(false);
    toast({
      title: "Code promo créé",
      description: `Le code ${promoForm.code} a été créé avec succès.`,
    });
  };
  
  // Handle campaign submission
  const handleAddCampaign = () => {
    dispatch(addCampaign({
      name: campaignForm.name,
      platform: campaignForm.platform as "facebook" | "instagram" | "tiktok" | "google" | "email" | "sms",
      status: campaignForm.status as "draft" | "scheduled" | "active" | "completed" | "paused",
      budget: campaignForm.budget,
      startDate: campaignForm.startDate,
      endDate: campaignForm.endDate,
      target: campaignForm.target,
    }));
    setIsAddCampaignOpen(false);
    toast({
      title: "Campagne créée",
      description: `La campagne ${campaignForm.name} a été créée avec succès.`,
    });
  };
  
  // Handle email template submission
  const handleAddEmailTemplate = () => {
    dispatch(addEmailTemplate({
      name: emailForm.name,
      subject: emailForm.subject,
      content: emailForm.content,
    }));
    setIsAddEmailOpen(false);
    toast({
      title: "Modèle d'email créé",
      description: `Le modèle ${emailForm.name} a été créé avec succès.`,
    });
  };
  
  // Delete promo code
  const handleDeletePromoCode = (id: string) => {
    dispatch(deletePromoCode(id));
    toast({
      title: "Code promo supprimé",
      description: "Le code promo a été supprimé avec succès.",
      variant: "destructive",
    });
  };
  
  // Toggle promo code status
  const handleTogglePromoStatus = (id: string) => {
    dispatch(togglePromoCodeStatus(id));
    toast({
      title: "Statut mis à jour",
      description: "Le statut du code promo a été mis à jour.",
    });
  };
  
  return (
    <div className="container max-w-6xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Marketing & Promotions</h1>
            <p className="text-gray-500">Gérez vos campagnes marketing et codes promo</p>
          </div>
        </div>
        
        <Tabs defaultValue="promos">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="promos" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" />
              Codes Promo
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center">
              <Megaphone className="mr-2 h-4 w-4" />
              Campagnes
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Emails
            </TabsTrigger>
          </TabsList>
          
          {/* PROMO CODES TAB */}
          <TabsContent value="promos">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsAddPromoOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Nouveau code promo
              </Button>
            </div>
            
            <div className="space-y-4">
              {promoCodes.map((promo) => (
                <Card key={promo.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{promo.code}</CardTitle>
                        <CardDescription>
                          {promo.discountType === "percentage" && `${promo.discountValue}% de réduction`}
                          {promo.discountType === "fixed" && `${promo.discountValue}€ de réduction`}
                          {promo.discountType === "freeShipping" && "Livraison gratuite"}
                        </CardDescription>
                      </div>
                      <Badge variant={promo.active ? "default" : "secondary"}>
                        {promo.active ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Achat minimum: {promo.minPurchase}€</p>
                      <p>Période: {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}</p>
                      {promo.limitedUses && (
                        <p>Utilisations: {promo.usedCount} / {promo.maxUses}</p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleTogglePromoStatus(promo.id)}>
                      {promo.active ? "Désactiver" : "Activer"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeletePromoCode(promo.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {promoCodes.length === 0 && (
                <div className="text-center p-10 border rounded-lg bg-gray-50">
                  <Gift className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Aucun code promo pour le moment</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsAddPromoOpen(true)}>
                    Créer un code promo
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* CAMPAIGNS TAB */}
          <TabsContent value="campaigns">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsAddCampaignOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Nouvelle campagne
              </Button>
            </div>
            
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          {campaign.platform === "facebook" && <Facebook className="h-4 w-4 mr-1" />}
                          {campaign.platform === "instagram" && <Instagram className="h-4 w-4 mr-1" />}
                          {campaign.platform === "tiktok" && <TikTok className="h-4 w-4 mr-1" />}
                          {campaign.platform}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={
                          campaign.status === "active" ? "default" : 
                          campaign.status === "draft" ? "secondary" : 
                          campaign.status === "paused" ? "outline" : 
                          campaign.status === "scheduled" ? "secondary" : "outline"
                        }
                      >
                        {campaign.status === "active" && "Active"}
                        {campaign.status === "draft" && "Brouillon"}
                        {campaign.status === "paused" && "En pause"}
                        {campaign.status === "scheduled" && "Planifiée"}
                        {campaign.status === "completed" && "Terminée"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>Budget: {campaign.budget}€</p>
                      <p>Période: {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</p>
                      <div className="mt-2">
                        <p className="font-medium text-gray-700">Performance:</p>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">Impressions</p>
                            <p className="font-medium">{campaign.performance.impressions}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">Clics</p>
                            <p className="font-medium">{campaign.performance.clicks}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">ROI</p>
                            <p className="font-medium">{campaign.performance.roi}x</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const newStatus = campaign.status === "active" ? "paused" : "active";
                        dispatch(updateCampaign({ 
                          id: campaign.id, 
                          status: newStatus 
                        }));
                      }}
                    >
                      {campaign.status === "active" ? "Mettre en pause" : "Activer"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {campaigns.length === 0 && (
                <div className="text-center p-10 border rounded-lg bg-gray-50">
                  <Megaphone className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Aucune campagne pour le moment</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsAddCampaignOpen(true)}>
                    Créer une campagne
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* EMAILS TAB */}
          <TabsContent value="emails">
            <div className="flex justify-end mb-4">
              <Button onClick={() => setIsAddEmailOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Nouveau modèle d'email
              </Button>
            </div>
            
            <div className="space-y-4">
              {emailTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>
                          {template.subject}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-gray-500">
                        Dernière modification: {new Date(template.lastEdited).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md p-3 bg-gray-50 text-sm max-h-40 overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: template.content }} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="sm">
                      <Mail className="h-4 w-4 mr-2" /> Envoyer
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {emailTemplates.length === 0 && (
                <div className="text-center p-10 border rounded-lg bg-gray-50">
                  <Mail className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Aucun modèle d'email pour le moment</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsAddEmailOpen(true)}>
                    Créer un modèle d'email
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* ADD PROMO CODE DIALOG */}
        <Dialog open={isAddPromoOpen} onOpenChange={setIsAddPromoOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Créer un code promo</DialogTitle>
              <DialogDescription>
                Configurez les détails de votre nouveau code promo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="code" className="text-right">
                  Code
                </Label>
                <Input
                  id="code"
                  value={promoForm.code}
                  onChange={(e) => setPromoForm({...promoForm, code: e.target.value})}
                  className="col-span-3"
                  placeholder="ETE2023"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="discountType" className="text-right">
                  Type
                </Label>
                <Select 
                  value={promoForm.discountType} 
                  onValueChange={(value) => setPromoForm({...promoForm, discountType: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Type de réduction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Pourcentage</SelectItem>
                    <SelectItem value="fixed">Montant fixe</SelectItem>
                    <SelectItem value="freeShipping">Livraison gratuite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {promoForm.discountType !== "freeShipping" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discountValue" className="text-right">
                    Valeur
                  </Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={promoForm.discountValue}
                    onChange={(e) => setPromoForm({...promoForm, discountValue: Number(e.target.value)})}
                    className="col-span-3"
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minPurchase" className="text-right">
                  Achat min
                </Label>
                <Input
                  id="minPurchase"
                  type="number"
                  value={promoForm.minPurchase}
                  onChange={(e) => setPromoForm({...promoForm, minPurchase: Number(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Date début
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={promoForm.startDate}
                  onChange={(e) => setPromoForm({...promoForm, startDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  Date fin
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={promoForm.endDate}
                  onChange={(e) => setPromoForm({...promoForm, endDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPromoOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleAddPromoCode}>
                Créer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* ADD CAMPAIGN DIALOG */}
        <Dialog open={isAddCampaignOpen} onOpenChange={setIsAddCampaignOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Créer une campagne</DialogTitle>
              <DialogDescription>
                Configurez les détails de votre nouvelle campagne publicitaire.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="campaignName" className="text-right">
                  Nom
                </Label>
                <Input
                  id="campaignName"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                  className="col-span-3"
                  placeholder="Soldes d'été"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="platform" className="text-right">
                  Plateforme
                </Label>
                <Select 
                  value={campaignForm.platform} 
                  onValueChange={(value) => setCampaignForm({...campaignForm, platform: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Choisir une plateforme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="google">Google</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="budget" className="text-right">
                  Budget (€)
                </Label>
                <Input
                  id="budget"
                  type="number"
                  value={campaignForm.budget}
                  onChange={(e) => setCampaignForm({...campaignForm, budget: Number(e.target.value)})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="campaignStart" className="text-right">
                  Date début
                </Label>
                <Input
                  id="campaignStart"
                  type="date"
                  value={campaignForm.startDate}
                  onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="campaignEnd" className="text-right">
                  Date fin
                </Label>
                <Input
                  id="campaignEnd"
                  type="date"
                  value={campaignForm.endDate}
                  onChange={(e) => setCampaignForm({...campaignForm, endDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCampaignOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleAddCampaign}>
                Créer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* ADD EMAIL TEMPLATE DIALOG */}
        <Dialog open={isAddEmailOpen} onOpenChange={setIsAddEmailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Créer un modèle d'email</DialogTitle>
              <DialogDescription>
                Configurez votre nouveau modèle d'email.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="templateName" className="text-right">
                  Nom
                </Label>
                <Input
                  id="templateName"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm({...emailForm, name: e.target.value})}
                  className="col-span-3"
                  placeholder="Email de bienvenue"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Sujet
                </Label>
                <Input
                  id="subject"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                  className="col-span-3"
                  placeholder="Bienvenue chez QuickShop!"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="content" className="text-right pt-2">
                  Contenu
                </Label>
                <div className="col-span-3">
                  <textarea
                    id="content"
                    value={emailForm.content}
                    onChange={(e) => setEmailForm({...emailForm, content: e.target.value})}
                    className="w-full min-h-[200px] p-2 border rounded-md"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Variables disponibles: {{prenom}}, {{nom}}, {{email}}
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEmailOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleAddEmailTemplate}>
                Créer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Marketing;
