<lov-code>
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addPromoCode,
  updatePromoCode,
  deletePromoCode,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  addEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "@/store/slices/marketingSlice";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, MessageSquare, Mail, Search, Plus, Calendar, BarChart, Settings, Edit2, Trash, Twitter, Send, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed" | "freeShipping";
  discountValue: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  limitedUses: boolean;
  maxUses: number;
  usedCount: number;
  applicableProducts: "all" | string[];
  applicableCategories: "all" | string[];
  active: boolean;
}

interface Campaign {
  id: string;
  name: string;
  platform: "facebook" | "instagram" | "tiktok" | "google" | "email" | "sms";
  status: "draft" | "scheduled" | "active" | "completed" | "paused";
  budget: number;
  startDate: string;
  endDate: string;
  target: {
    demographics: string[];
    interests: string[];
    locations: string[];
  };
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    cost: number;
    revenue: number;
    roi: number;
  };
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  lastEdited: string;
}

interface EmailSubscriber {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscriptionDate: string;
  status: "active" | "inactive";
}

const Marketing = () => {
  const dispatch = useAppDispatch();
  const marketingData = useAppSelector((state) => state.marketing);
  const [promoCodeDialog, setPromoCodeDialog] = useState(false);
  const [campaignDialog, setCampaignDialog] = useState(false);
  const [emailTemplateDialog, setEmailTemplateDialog] = useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState<PromoCode | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<EmailTemplate | null>(null);
  const [promoCodeForm, setPromoCodeForm] = useState<Omit<PromoCode, "id" | "usedCount">>({
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minPurchase: 0,
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    limitedUses: false,
    maxUses: 100,
    applicableProducts: "all",
    applicableCategories: "all",
    active: true,
  });
  const [campaignForm, setCampaignForm] = useState<Omit<Campaign, "id" | "performance">>({
    name: "",
    platform: "facebook",
    status: "draft",
    budget: 0,
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    target: {
      demographics: [],
      interests: [],
      locations: [],
    },
  });
  const [emailTemplateForm, setEmailTemplateForm] = useState<Omit<EmailTemplate, "id" | "lastEdited">>({
    name: "",
    subject: "",
    content: "",
  });

  const handlePromoCodeSubmit = () => {
    if (selectedPromoCode) {
      dispatch(updatePromoCode({ ...promoCodeForm, id: selectedPromoCode.id }));
      toast.success("Promo code updated successfully!");
    } else {
      dispatch(addPromoCode(promoCodeForm));
      toast.success("Promo code added successfully!");
    }
    setPromoCodeDialog(false);
    setSelectedPromoCode(null);
    setPromoCodeForm({
      code: "",
      discountType: "percentage",
      discountValue: 0,
      minPurchase: 0,
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      limitedUses: false,
      maxUses: 100,
      applicableProducts: "all",
      applicableCategories: "all",
      active: true,
    });
  };

  const handleCampaignSubmit = () => {
    if (selectedCampaign) {
      dispatch(updateCampaign({ ...campaignForm, id: selectedCampaign.id }));
      toast.success("Campaign updated successfully!");
    } else {
      dispatch(addCampaign(campaignForm));
      toast.success("Campaign added successfully!");
    }
    setCampaignDialog(false);
    setSelectedCampaign(null);
    setCampaignForm({
      name: "",
      platform: "facebook",
      status: "draft",
      budget: 0,
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      target: {
        demographics: [],
        interests: [],
        locations: [],
      },
    });
  };

  const handleEmailTemplateSubmit = () => {
    if (selectedEmailTemplate) {
      dispatch(updateEmailTemplate({ ...emailTemplateForm, id: selectedEmailTemplate.id }));
      toast.success("Email template updated successfully!");
    } else {
      dispatch(addEmailTemplate(emailTemplateForm));
      toast.success("Email template added successfully!");
    }
    setEmailTemplateDialog(false);
    setSelectedEmailTemplate(null);
    setEmailTemplateForm({
      name: "",
      subject: "",
      content: "",
    });
  };

  const emailSubscribers: EmailSubscriber[] = [
    {
      id: "sub-001",
      firstName: "Jean",
      lastName: "Dupont",
      email: "jean.dupont@example.com",
      subscriptionDate: "2023-11-01",
      status: "active",
    },
    {
      id: "sub-002",
      firstName: "Sophie",
      lastName: "Martin",
      email: "sophie.martin@example.com",
      subscriptionDate: "2023-10-15",
      status: "inactive",
    },
    {
      id: "sub-003",
      firstName: "Luc",
      lastName: "Lefevre",
      email: "luc.lefevre@example.com",
      subscriptionDate: "2023-09-20",
      status: "active",
    },
  ];

  return (
    <div className="container p-4 md:p-6 mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marketing</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Rechercher..." className="max-w-sm" />
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="promoCodes">Codes Promo</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="emailMarketing">Email Marketing</TabsTrigger>
          <TabsTrigger value="emailSubscribers">Abonnés Email</TabsTrigger>
          {/* <TabsTrigger value="settings">Paramètres</TabsTrigger> */}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Campagnes Actives</CardTitle>
                <CardDescription>Nombre de campagnes marketing actives.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{marketingData.activeCampaigns}</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  <BarChart className="h-4 w-4 mr-2" />
                  Voir les statistiques
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Codes Promo</CardTitle>
                <CardDescription>Nombre total de codes promo disponibles.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{marketingData.promoCodesCount}</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Gérer les codes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Abonnés Email</CardTitle>
                <CardDescription>Nombre total d'abonnés à la newsletter.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{marketingData.emailSubscribers}</div>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Voir les abonnés
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Aperçu des Campagnes</CardTitle>
              <CardDescription>Statistiques générales des campagnes marketing.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom de la Campagne
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plateforme
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Budget
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ROI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketingData.campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.platform}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.budget} €</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.performance.roi}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="secondary">{campaign.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promoCodes" className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Codes Promotionnels</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Code Promo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedPromoCode ? "Modifier" : "Ajouter"} un Code Promo</DialogTitle>
                  <DialogDescription>
                    {selectedPromoCode
                      ? "Modifiez les détails du code promo."
                      : "Ajoutez un nouveau code promo à utiliser par les clients."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">
                      Code
                    </Label>
                    <Input
                      type="text"
                      id="code"
                      value={promoCodeForm.code}
                      onChange={(e) => setPromoCodeForm({ ...promoCodeForm, code: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discountType" className="text-right">
                      Type de Réduction
                    </Label>
                    <Select
                      value={promoCodeForm.discountType}
                      onValueChange={(value) => setPromoCodeForm({ ...promoCodeForm, discountType: value as "percentage" | "fixed" | "freeShipping" })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Pourcentage</SelectItem>
                        <SelectItem value="fixed">Montant Fixe</SelectItem>
                        <SelectItem value="freeShipping">Livraison Gratuite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discountValue" className="text-right">
                      Valeur de la Réduction
                    </Label>
                    <Input
                      type="number"
                      id="discountValue"
                      value={promoCodeForm.discountValue}
                      onChange={(e) => setPromoCodeForm({ ...promoCodeForm, discountValue: Number(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="minPurchase" className="text-right">
                      Achat Minimum
                    </Label>
                    <Input
                      type="number"
                      id="minPurchase"
                      value={promoCodeForm.minPurchase}
                      onChange={(e) => setPromoCodeForm({ ...promoCodeForm, minPurchase: Number(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Date de Début
                    </Label>
                    <Input
                      type="date"
                      id="startDate"
                      value={promoCodeForm.startDate}
                      onChange={(e) => setPromoCodeForm({ ...promoCodeForm, startDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      Date de Fin
                    </Label>
                    <Input
                      type="date"
                      id="endDate"
                      value={promoCodeForm.endDate}
                      onChange={(e) => setPromoCodeForm({ ...promoCodeForm, endDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="limitedUses" className="text-right">
                      Utilisations Limitées
                    </Label>
                    <Switch
                      id="limitedUses"
                      checked={promoCodeForm.limitedUses}
                      onCheckedChange={(checked) => setPromoCodeForm({ ...promoCodeForm, limitedUses: checked })}
                      className="col-span-3"
                    />
                  </div>
                  {promoCodeForm.limitedUses && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="maxUses" className="text-right">
                        Nombre Maximum d'Utilisations
                      </Label>
                      <Input
                        type="number"
                        id="maxUses"
                        value={promoCodeForm.maxUses}
                        onChange={(e) => setPromoCodeForm({ ...promoCodeForm, maxUses: Number(e.target.value) })}
                        className="col-span-3"
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="applicableProducts" className="text-right">
                      Produits Applicables
                    </Label>
                    <Input
                      type="text"
                      id="applicableProducts"
                      value={promoCodeForm.applicableProducts}
                      onChange={(e) => setPromoCodeForm({ ...promoCodeForm, applicableProducts: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="applicableCategories" className="text-right">
                      Catégories Applicables
                    </Label>
                    <Input
                      type="text"
                      id="applicableCategories"
                      value={promoCodeForm.applicableCategories}
                      onChange={(e) => setPromoCodeForm({ ...promoCodeForm, applicableCategories: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="active" className="text-right">
                      Actif
                    </Label>
                    <Switch
                      id="active"
                      checked={promoCodeForm.active}
                      onCheckedChange={(checked) => setPromoCodeForm({ ...promoCodeForm, active: checked })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setPromoCodeDialog(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" onClick={handlePromoCodeSubmit}>
                    {selectedPromoCode ? "Modifier" : "Ajouter"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valeur
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Achat Minimum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date de Début
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date de Fin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketingData.promoCodes.map((promoCode) => (
                      <tr key={promoCode.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{promoCode.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{promoCode.discountType}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{promoCode.discountValue}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{promoCode.minPurchase}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{promoCode.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{promoCode.endDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedPromoCode(promoCode);
                              setPromoCodeForm({
                                code: promoCode.code,
                                discountType: promoCode.discountType,
                                discountValue: promoCode.discountValue,
                                minPurchase: promoCode.minPurchase,
                                startDate: promoCode.startDate,
                                endDate: promoCode.endDate,
                                limitedUses: promoCode.limitedUses,
                                maxUses: promoCode.maxUses,
                                applicableProducts: promoCode.applicableProducts,
                                applicableCategories: promoCode.applicableCategories,
                                active: promoCode.active,
                              });
                              setPromoCodeDialog(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              dispatch(deletePromoCode(promoCode.id));
                              toast.success("Promo code deleted successfully!");
                            }}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Campagnes Marketing</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une Campagne
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedCampaign ? "Modifier" : "Ajouter"} une Campagne</DialogTitle>
                  <DialogDescription>
                    {selectedCampaign
                      ? "Modifiez les détails de la campagne."
                      : "Ajoutez une nouvelle campagne marketing."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nom
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      value={campaignForm.name}
                      onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="platform" className="text-right">
                      Plateforme
                    </Label>
                    <Select
                      value={campaignForm.platform}
                      onValueChange={(value) => setCampaignForm({ ...campaignForm, platform: value as "facebook" | "instagram" | "tiktok" | "google" | "email" | "sms" })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner" />
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
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={campaignForm.status}
                      onValueChange={(value) => setCampaignForm({ ...campaignForm, status: value as "draft" | "scheduled" | "active" | "completed" | "paused" })}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="scheduled">Planifiée</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="completed">Terminée</SelectItem>
                        <SelectItem value="paused">En Pause</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">
                      Budget
                    </Label>
                    <Input
                      type="number"
                      id="budget"
                      value={campaignForm.budget}
                      onChange={(e) => setCampaignForm({ ...campaignForm, budget: Number(e.target.value) })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="startDate" className="text-right">
                      Date de Début
                    </Label>
                    <Input
                      type="date"
                      id="startDate"
                      value={campaignForm.startDate}
                      onChange={(e) => setCampaignForm({ ...campaignForm, startDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="endDate" className="text-right">
                      Date de Fin
                    </Label>
                    <Input
                      type="date"
                      id="endDate"
                      value={campaignForm.endDate}
                      onChange={(e) => setCampaignForm({ ...campaignForm, endDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setCampaignDialog(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" onClick={handleCampaignSubmit}>
                    {selectedCampaign ? "Modifier" : "Ajouter"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plateforme
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Budget
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date de Début
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date de Fin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {marketingData.campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.platform}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.budget}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{campaign.endDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setCampaignForm({
                                name: campaign.name,
                                platform: campaign.platform,
                                status: campaign.status,
                                budget: campaign.budget,
                                startDate: campaign.startDate,
                                endDate: campaign.endDate,
                                target: campaign.target,
                              });
                              setCampaignDialog(true);
                            }}
                          >
                            <Edit2 className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              dispatch(deleteCampaign(campaign.id));
                              toast.success("Campaign deleted successfully!");
                            }}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emailMarketing" className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle>Modèles d'Email</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Modèle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedEmailTemplate ? "Modifier" : "Ajouter"} un Modèle d'Email</DialogTitle>
                  <DialogDescription>
                    {selectedEmailTemplate
                      ? "Modifiez les détails du modèle d'email."
                      : "Ajoutez un nouveau modèle d'email à utiliser dans vos campagnes."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nom
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      value={emailTemplateForm.name}
                      onChange={(e) => setEmailTemplateForm({ ...emailTemplateForm, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject" className="text-right">
                      Sujet
                    </Label>
                    <Input
                      type="text"
                      id="subject"
                      value={emailTemplateForm.subject}
                      onChange={(e) => setEmailTemplateForm({ ...emailTemplateForm, subject: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="content" className="text-right">
                      Contenu
                    </Label>
                    <Input
                      id="content"
                      value={emailTemplateForm.content}
                      onChange={(e) => setEmailTemplateForm({ ...emailTemplateForm, content: e.target.value })}
                      className="col-span-3"
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="secondary" onClick={() => setEmailTemplateDialog(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" onClick={handleEmailTemplateSubmit}>
                    {selectedEmailTemplate ? "Modifier" : "Ajouter"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-
