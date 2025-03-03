
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, LineChart, PieChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Line, Pie, Cell } from "recharts";
import { 
  BadgePercent, 
  Mail, 
  Send, 
  Plus, 
  Users, 
  Calendar, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  Facebook, 
  Instagram, 
  Smartphone,
  BarChart2,
  Megaphone,
  Edit,
  Trash,
  Eye,
  Settings,
  Clock,
  AlignLeft,
  Clipboard,
  Search,
  Tag,
  Percent,
  CreditCard,
  TrendingUp,
  DollarSign,
  Box,
  Award,
  CornerUpRight,
  RefreshCw
} from "lucide-react";
import { RootState } from "@/store/store";
import { 
  addPromoCode, 
  updatePromoCode, 
  deletePromoCode, 
  togglePromoCodeStatus,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  updateCampaignStatus,
  addEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate
} from "@/store/slices/marketingSlice";

interface PromoFormData {
  code: string;
  discountType: "percentage" | "fixed" | "freeShipping";
  discountValue: number;
  minPurchase: number;
  startDate: string;
  endDate: string;
  limitedUses: boolean;
  maxUses: number;
  applicableProducts: "all" | string[];
  applicableCategories: "all" | string[];
  active: boolean;
}

interface CampaignFormData {
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
}

interface EmailTemplateFormData {
  name: string;
  subject: string;
  content: string;
}

const mockPerformanceData = [
  { name: "Jan", conversion: 10, click: 30, impression: 100 },
  { name: "Feb", conversion: 15, click: 45, impression: 120 },
  { name: "Mar", conversion: 20, click: 60, impression: 150 },
  { name: "Apr", conversion: 25, click: 75, impression: 170 },
  { name: "May", conversion: 30, click: 90, impression: 200 },
  { name: "Jun", conversion: 22, click: 65, impression: 180 },
];

const mockPromoUsageData = [
  { name: "SUMMER20", used: 45, remaining: 55 },
  { name: "WELCOME10", used: 78, remaining: 22 },
  { name: "FLASHSALE", used: 60, remaining: 40 },
  { name: "FREESHIP50", used: 32, remaining: 68 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Marketing: React.FC = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { promoCodes, campaigns, emailTemplates, isLoading } = useSelector((state: RootState) => state.marketing);
  
  const [activeTab, setActiveTab] = useState("promotions");
  const [openPromoDialog, setOpenPromoDialog] = useState(false);
  const [openCampaignDialog, setOpenCampaignDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  
  const [promoFormData, setPromoFormData] = useState<PromoFormData>({
    code: "",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    limitedUses: true,
    maxUses: 100,
    applicableProducts: "all",
    applicableCategories: "all",
    active: true
  });
  
  const [campaignFormData, setCampaignFormData] = useState<CampaignFormData>({
    name: "",
    platform: "facebook",
    status: "draft",
    budget: 100,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    target: {
      demographics: ["18-35"],
      interests: ["shopping"],
      locations: ["Paris"]
    }
  });
  
  const [emailFormData, setEmailFormData] = useState<EmailTemplateFormData>({
    name: "",
    subject: "",
    content: ""
  });
  
  const [editMode, setEditMode] = useState<{
    active: boolean;
    type: "promo" | "campaign" | "email";
    id: string | null;
  }>({
    active: false,
    type: "promo",
    id: null
  });
  
  const handlePromoSubmit = () => {
    if (editMode.active && editMode.type === "promo" && editMode.id) {
      dispatch(updatePromoCode({
        id: editMode.id,
        ...promoFormData
      }));
      toast({
        title: "Code promo mis à jour",
        description: `Le code "${promoFormData.code}" a été mis à jour avec succès.`,
      });
    } else {
      dispatch(addPromoCode(promoFormData));
      toast({
        title: "Code promo créé",
        description: `Le code "${promoFormData.code}" a été créé avec succès.`,
      });
    }
    
    setOpenPromoDialog(false);
    resetPromoForm();
  };
  
  const handleCampaignSubmit = () => {
    if (editMode.active && editMode.type === "campaign" && editMode.id) {
      dispatch(updateCampaign({
        id: editMode.id,
        ...campaignFormData
      }));
      toast({
        title: "Campagne mise à jour",
        description: `La campagne "${campaignFormData.name}" a été mise à jour avec succès.`,
      });
    } else {
      dispatch(addCampaign(campaignFormData));
      toast({
        title: "Campagne créée",
        description: `La campagne "${campaignFormData.name}" a été créée avec succès.`,
      });
    }
    
    setOpenCampaignDialog(false);
    resetCampaignForm();
  };
  
  const handleEmailSubmit = () => {
    if (editMode.active && editMode.type === "email" && editMode.id) {
      dispatch(updateEmailTemplate({
        id: editMode.id,
        ...emailFormData
      }));
      toast({
        title: "Modèle d'email mis à jour",
        description: `Le modèle "${emailFormData.name}" a été mis à jour avec succès.`,
      });
    } else {
      dispatch(addEmailTemplate(emailFormData));
      toast({
        title: "Modèle d'email créé",
        description: `Le modèle "${emailFormData.name}" a été créé avec succès.`,
      });
    }
    
    setOpenEmailDialog(false);
    resetEmailForm();
  };
  
  const handleDeletePromo = (id: string) => {
    dispatch(deletePromoCode(id));
    toast({
      title: "Code promo supprimé",
      description: "Le code promo a été supprimé avec succès.",
    });
  };
  
  const handleDeleteCampaign = (id: string) => {
    dispatch(deleteCampaign(id));
    toast({
      title: "Campagne supprimée",
      description: "La campagne a été supprimée avec succès.",
    });
  };
  
  const handleDeleteEmail = (id: string) => {
    dispatch(deleteEmailTemplate(id));
    toast({
      title: "Modèle d'email supprimé",
      description: "Le modèle d'email a été supprimé avec succès.",
    });
  };
  
  const handleTogglePromoStatus = (id: string) => {
    dispatch(togglePromoCodeStatus(id));
  };
  
  const handleUpdateCampaignStatus = (id: string, status: "draft" | "scheduled" | "active" | "completed" | "paused") => {
    dispatch(updateCampaignStatus({ id, status }));
    toast({
      title: "Statut mis à jour",
      description: `La campagne est maintenant "${status}".`,
    });
  };
  
  const editPromo = (id: string) => {
    const promo = promoCodes.find(code => code.id === id);
    if (promo) {
      setPromoFormData({
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        minPurchase: promo.minPurchase,
        startDate: promo.startDate,
        endDate: promo.endDate,
        limitedUses: promo.limitedUses,
        maxUses: promo.maxUses,
        applicableProducts: promo.applicableProducts,
        applicableCategories: promo.applicableCategories,
        active: promo.active
      });
      setEditMode({
        active: true,
        type: "promo",
        id
      });
      setOpenPromoDialog(true);
    }
  };
  
  const editCampaign = (id: string) => {
    const campaign = campaigns.find(camp => camp.id === id);
    if (campaign) {
      setCampaignFormData({
        name: campaign.name,
        platform: campaign.platform,
        status: campaign.status,
        budget: campaign.budget,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        target: {
          demographics: campaign.target.demographics,
          interests: campaign.target.interests,
          locations: campaign.target.locations
        }
      });
      setEditMode({
        active: true,
        type: "campaign",
        id
      });
      setOpenCampaignDialog(true);
    }
  };
  
  const editEmailTemplate = (id: string) => {
    const template = emailTemplates.find(temp => temp.id === id);
    if (template) {
      setEmailFormData({
        name: template.name,
        subject: template.subject,
        content: template.content
      });
      setEditMode({
        active: true,
        type: "email",
        id
      });
      setOpenEmailDialog(true);
    }
  };
  
  const resetPromoForm = () => {
    setPromoFormData({
      code: "",
      discountType: "percentage",
      discountValue: 10,
      minPurchase: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      limitedUses: true,
      maxUses: 100,
      applicableProducts: "all",
      applicableCategories: "all",
      active: true
    });
    setEditMode({
      active: false,
      type: "promo",
      id: null
    });
  };
  
  const resetCampaignForm = () => {
    setCampaignFormData({
      name: "",
      platform: "facebook",
      status: "draft",
      budget: 100,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      target: {
        demographics: ["18-35"],
        interests: ["shopping"],
        locations: ["Paris"]
      }
    });
    setEditMode({
      active: false,
      type: "campaign",
      id: null
    });
  };
  
  const resetEmailForm = () => {
    setEmailFormData({
      name: "",
      subject: "",
      content: ""
    });
    setEditMode({
      active: false,
      type: "email",
      id: null
    });
  };
  
  const getPlatformIcon = (platform: string) => {
    switch(platform) {
      case "facebook":
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case "tiktok":
        return <BarChart2 className="w-4 h-4 text-black" />;
      case "google":
        return <Search className="w-4 h-4 text-orange-500" />;
      case "email":
        return <Mail className="w-4 h-4 text-gray-600" />;
      case "sms":
        return <Smartphone className="w-4 h-4 text-green-600" />;
      default:
        return <Megaphone className="w-4 h-4" />;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getDiscountTypeIcon = (type: string) => {
    switch(type) {
      case "percentage":
        return <Percent className="w-4 h-4 text-green-600" />;
      case "fixed":
        return <DollarSign className="w-4 h-4 text-blue-600" />;
      case "freeShipping":
        return <Box className="w-4 h-4 text-purple-600" />;
      default:
        return <Tag className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Marketing & Promotions</h2>
      <p className="text-muted-foreground">
        Gérez vos campagnes, emails marketing et codes promotionnels.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campagnes actives</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {campaigns.filter(c => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              +{campaigns.filter(c => c.status === "scheduled").length} programmées
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Codes promos actifs</CardTitle>
            <BadgePercent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {promoCodes.filter(p => p.active).length}
            </div>
            <p className="text-xs text-muted-foreground">
              sur {promoCodes.length} codes créés
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnés à la newsletter</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">
              +24 cette semaine
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Performance des campagnes</CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Rafraîchir
            </Button>
          </div>
          <CardDescription>
            Analyse de la performance des 6 derniers mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={mockPerformanceData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="impression" stroke="#8884d8" name="Impressions" />
              <Line type="monotone" dataKey="click" stroke="#82ca9d" name="Clics" />
              <Line type="monotone" dataKey="conversion" stroke="#ff7300" name="Conversions" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Utilisation des codes promo</CardTitle>
            <CardDescription>Répartition des utilisations</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={mockPromoUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="used"
                  >
                    {mockPromoUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversion par plateforme</CardTitle>
            <CardDescription>Taux de conversion par canal</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: 'Facebook', conversion: 4.2 },
                  { name: 'Instagram', conversion: 3.8 },
                  { name: 'Google', conversion: 2.9 },
                  { name: 'Email', conversion: 5.7 },
                  { name: 'SMS', conversion: 4.5 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Taux (%)', angle: -90, position: 'insideLeft' }} />
                <RechartsTooltip formatter={(value) => [`${value}%`, 'Conversion']} />
                <Bar dataKey="conversion" fill="#8884d8">
                  {[
                    { name: 'Facebook', conversion: 4.2 },
                    { name: 'Instagram', conversion: 3.8 },
                    { name: 'Google', conversion: 2.9 },
                    { name: 'Email', conversion: 5.7 },
                    { name: 'SMS', conversion: 4.5 },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="promotions" className="flex items-center gap-2">
            <BadgePercent className="h-4 w-4" />
            Codes Promo
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Campagnes
          </TabsTrigger>
          <TabsTrigger value="emails" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Emails
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="promotions" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Codes Promotionnels</CardTitle>
                <Button onClick={() => {
                  resetPromoForm();
                  setOpenPromoDialog(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau code
                </Button>
              </div>
              <CardDescription>
                Créez et gérez des codes promotionnels pour vos clients.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">Code</th>
                      <th scope="col" className="px-6 py-3">Type</th>
                      <th scope="col" className="px-6 py-3">Valeur</th>
                      <th scope="col" className="px-6 py-3">Achat minimum</th>
                      <th scope="col" className="px-6 py-3">Utilisation</th>
                      <th scope="col" className="px-6 py-3">Période</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promoCodes.map((promo) => (
                      <tr key={promo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{promo.code}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getDiscountTypeIcon(promo.discountType)}
                            <span className="ml-2">
                              {promo.discountType === "percentage" ? "Pourcentage" : 
                               promo.discountType === "fixed" ? "Montant fixe" : 
                               "Livraison gratuite"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {promo.discountType === "percentage" ? `${promo.discountValue}%` : 
                           promo.discountType === "fixed" ? `${promo.discountValue}€` : 
                           "Gratuite"}
                        </td>
                        <td className="px-6 py-4">
                          {promo.minPurchase > 0 ? `${promo.minPurchase}€` : "Aucun"}
                        </td>
                        <td className="px-6 py-4">
                          {promo.usedCount} / {promo.limitedUses ? promo.maxUses : "∞"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${promo.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {promo.active ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="icon" onClick={() => handleTogglePromoStatus(promo.id)} title={promo.active ? "Désactiver" : "Activer"}>
                              {promo.active ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => editPromo(promo.id)} title="Modifier">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeletePromo(promo.id)} title="Supprimer">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={openPromoDialog} onOpenChange={setOpenPromoDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editMode.active && editMode.type === "promo" ? "Modifier le code promo" : "Créer un nouveau code promo"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Code promotionnel</Label>
                    <Input 
                      id="code" 
                      value={promoFormData.code} 
                      onChange={(e) => setPromoFormData({...promoFormData, code: e.target.value})} 
                      placeholder="ex: WELCOME10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountType">Type de remise</Label>
                    <select 
                      id="discountType" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={promoFormData.discountType}
                      onChange={(e) => setPromoFormData({...promoFormData, discountType: e.target.value as any})}
                    >
                      <option value="percentage">Pourcentage</option>
                      <option value="fixed">Montant fixe</option>
                      <option value="freeShipping">Livraison gratuite</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {promoFormData.discountType !== "freeShipping" && (
                    <div className="space-y-2">
                      <Label htmlFor="discountValue">Valeur de la remise</Label>
                      <Input 
                        id="discountValue" 
                        type="number"
                        value={promoFormData.discountValue} 
                        onChange={(e) => setPromoFormData({...promoFormData, discountValue: Number(e.target.value)})} 
                        placeholder={promoFormData.discountType === "percentage" ? "ex: 10" : "ex: 20"} 
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="minPurchase">Achat minimum (€)</Label>
                    <Input 
                      id="minPurchase" 
                      type="number"
                      value={promoFormData.minPurchase} 
                      onChange={(e) => setPromoFormData({...promoFormData, minPurchase: Number(e.target.value)})} 
                      placeholder="ex: 50" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début</Label>
                    <Input 
                      id="startDate" 
                      type="date"
                      value={promoFormData.startDate} 
                      onChange={(e) => setPromoFormData({...promoFormData, startDate: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin</Label>
                    <Input 
                      id="endDate" 
                      type="date"
                      value={promoFormData.endDate} 
                      onChange={(e) => setPromoFormData({...promoFormData, endDate: e.target.value})} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="limitedUses" 
                        checked={promoFormData.limitedUses} 
                        onChange={(e) => setPromoFormData({...promoFormData, limitedUses: e.target.checked})}
                      />
                      <Label htmlFor="limitedUses">Limiter les utilisations</Label>
                    </div>
                  </div>
                  {promoFormData.limitedUses && (
                    <div className="space-y-2">
                      <Label htmlFor="maxUses">Nombre max d'utilisations</Label>
                      <Input 
                        id="maxUses" 
                        type="number"
                        value={promoFormData.maxUses} 
                        onChange={(e) => setPromoFormData({...promoFormData, maxUses: Number(e.target.value)})} 
                        placeholder="ex: 100" 
                      />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenPromoDialog(false)}>Annuler</Button>
                <Button onClick={handlePromoSubmit}>
                  {editMode.active && editMode.type === "promo" ? "Mettre à jour" : "Créer le code"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="campaigns" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Campagnes publicitaires</CardTitle>
                <Button onClick={() => {
                  resetCampaignForm();
                  setOpenCampaignDialog(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouvelle campagne
                </Button>
              </div>
              <CardDescription>
                Gérez vos campagnes marketing sur différentes plateformes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">Campagne</th>
                      <th scope="col" className="px-6 py-3">Plateforme</th>
                      <th scope="col" className="px-6 py-3">Budget</th>
                      <th scope="col" className="px-6 py-3">Dates</th>
                      <th scope="col" className="px-6 py-3">Performance</th>
                      <th scope="col" className="px-6 py-3">Statut</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{campaign.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            {getPlatformIcon(campaign.platform)}
                            <span className="ml-2 capitalize">{campaign.platform}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{campaign.budget}€</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span>ROI</span>
                              <span className="font-medium">{campaign.performance.roi.toFixed(2)}x</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-green-600 h-1.5 rounded-full" 
                                style={{ width: `${Math.min(campaign.performance.roi * 10, 100)}%` }}>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(campaign.status)}`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="icon" onClick={() => editCampaign(campaign.id)} title="Modifier">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCampaign(campaign.id)} title="Supprimer">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={openCampaignDialog} onOpenChange={setOpenCampaignDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editMode.active && editMode.type === "campaign" ? "Modifier la campagne" : "Créer une nouvelle campagne"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Nom de la campagne</Label>
                  <Input 
                    id="campaignName" 
                    value={campaignFormData.name} 
                    onChange={(e) => setCampaignFormData({...campaignFormData, name: e.target.value})} 
                    placeholder="ex: Promo Fêtes de Fin d'Année" 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform">Plateforme</Label>
                    <select 
                      id="platform" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={campaignFormData.platform}
                      onChange={(e) => setCampaignFormData({...campaignFormData, platform: e.target.value as any})}
                    >
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="tiktok">TikTok</option>
                      <option value="google">Google</option>
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <select 
                      id="status" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={campaignFormData.status}
                      onChange={(e) => setCampaignFormData({...campaignFormData, status: e.target.value as any})}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="scheduled">Programmée</option>
                      <option value="active">Active</option>
                      <option value="paused">En pause</option>
                      <option value="completed">Terminée</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (€)</Label>
                    <Input 
                      id="budget" 
                      type="number"
                      value={campaignFormData.budget} 
                      onChange={(e) => setCampaignFormData({...campaignFormData, budget: Number(e.target.value)})} 
                      placeholder="ex: 500" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Date de début</Label>
                    <Input 
                      id="startDate" 
                      type="date"
                      value={campaignFormData.startDate} 
                      onChange={(e) => setCampaignFormData({...campaignFormData, startDate: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">Date de fin</Label>
                    <Input 
                      id="endDate" 
                      type="date"
                      value={campaignFormData.endDate} 
                      onChange={(e) => setCampaignFormData({...campaignFormData, endDate: e.target.value})} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Ciblage</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demographics" className="text-xs">Démographie</Label>
                      <Input 
                        id="demographics" 
                        value={campaignFormData.target.demographics.join(", ")} 
                        onChange={(e) => setCampaignFormData({
                          ...campaignFormData, 
                          target: {
                            ...campaignFormData.target,
                            demographics: e.target.value.split(",").map(item => item.trim())
                          }
                        })} 
                        placeholder="ex: 18-35, 35-55" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="interests" className="text-xs">Intérêts</Label>
                      <Input 
                        id="interests" 
                        value={campaignFormData.target.interests.join(", ")} 
                        onChange={(e) => setCampaignFormData({
                          ...campaignFormData, 
                          target: {
                            ...campaignFormData.target,
                            interests: e.target.value.split(",").map(item => item.trim())
                          }
                        })} 
                        placeholder="ex: shopping, technology" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="locations" className="text-xs">Lieux</Label>
                      <Input 
                        id="locations" 
                        value={campaignFormData.target.locations.join(", ")} 
                        onChange={(e) => setCampaignFormData({
                          ...campaignFormData, 
                          target: {
                            ...campaignFormData.target,
                            locations: e.target.value.split(",").map(item => item.trim())
                          }
                        })} 
                        placeholder="ex: Paris, Lyon" 
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenCampaignDialog(false)}>Annuler</Button>
                <Button onClick={handleCampaignSubmit}>
                  {editMode.active && editMode.type === "campaign" ? "Mettre à jour" : "Créer la campagne"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="emails" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Templates d'emails</CardTitle>
                <Button onClick={() => {
                  resetEmailForm();
                  setOpenEmailDialog(true);
                }}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau template
                </Button>
              </div>
              <CardDescription>
                Gérez vos modèles d'emails pour vos campagnes et notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3">Nom du template</th>
                      <th scope="col" className="px-6 py-3">Sujet</th>
                      <th scope="col" className="px-6 py-3">Dernière modification</th>
                      <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailTemplates.map((template) => (
                      <tr key={template.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{template.name}</td>
                        <td className="px-6 py-4">{template.subject}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{new Date(template.lastEdited).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="icon" onClick={() => editEmailTemplate(template.id)} title="Modifier">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteEmail(template.id)} title="Supprimer">
                              <Trash className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Aperçu">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Envoyer un test">
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={openEmailDialog} onOpenChange={setOpenEmailDialog}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editMode.active && editMode.type === "email" ? "Modifier le template" : "Créer un nouveau template d'email"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="emailName">Nom du template</Label>
                  <Input 
                    id="emailName" 
                    value={emailFormData.name} 
                    onChange={(e) => setEmailFormData({...emailFormData, name: e.target.value})} 
                    placeholder="ex: Campagne de Bienvenue" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Sujet</Label>
                  <Input 
                    id="emailSubject" 
                    value={emailFormData.subject} 
                    onChange={(e) => setEmailFormData({...emailFormData, subject: e.target.value})} 
                    placeholder="ex: Bienvenue chez QuickShop!" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailContent">Contenu</Label>
                  <Textarea 
                    id="emailContent" 
                    value={emailFormData.content} 
                    onChange={(e) => setEmailFormData({...emailFormData, content: e.target.value})} 
                    placeholder="Entrez le contenu HTML de votre email..." 
                    className="min-h-[200px]"
                  />
                  <p className="text-xs text-muted-foreground">Utilisez des variables comme {{prenom}} pour personnaliser l'email.</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenEmailDialog(false)}>Annuler</Button>
                <Button onClick={handleEmailSubmit}>
                  {editMode.active && editMode.type === "email" ? "Mettre à jour" : "Créer le template"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketing;
