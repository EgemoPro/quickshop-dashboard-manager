
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { 
  addPromoCode, 
  updatePromoCode, 
  deletePromoCode, 
  togglePromoCodeStatus,
  addCampaign,
  updateCampaign,
  deleteCampaign,
  toggleCampaignStatus,
  addEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate
} from "@/store/slices/marketingSlice";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CalendarIcon, CheckIcon, CopyIcon, EyeIcon, FileEdit, MoreHorizontal, PlusIcon, TagIcon, Trash2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

// Schemas for the form validation
const promoCodeSchema = z.object({
  code: z.string().min(3, "Le code doit contenir au moins 3 caractères"),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "La valeur doit être un nombre supérieur à 0",
  }),
  minimumPurchase: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
  applicableProducts: z.string().optional(),
  usageLimit: z.string().optional(),
  description: z.string().optional(),
});

const campaignSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  platform: z.string().min(1, "Sélectionnez une plateforme"),
  budget: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Le budget doit être un nombre positif",
  }),
  startDate: z.date(),
  endDate: z.date(),
  targetAudience: z.string().optional(),
  objectives: z.string().optional(),
  description: z.string().optional(),
});

const emailTemplateSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  subject: z.string().min(1, "Le sujet est requis"),
  content: z.string().min(10, "Le contenu doit contenir au moins 10 caractères"),
  type: z.string().min(1, "Sélectionnez un type"),
});

const Marketing = () => {
  const dispatch = useAppDispatch();
  const { promoCodes, campaigns, emailTemplates } = useAppSelector((state) => state.marketing);
  
  const [activeTab, setActiveTab] = useState("promo-codes");
  const [isAddingPromoCode, setIsAddingPromoCode] = useState(false);
  const [isEditingPromoCode, setIsEditingPromoCode] = useState(false);
  const [selectedPromoCodeId, setSelectedPromoCodeId] = useState("");
  
  const [isAddingCampaign, setIsAddingCampaign] = useState(false);
  const [isEditingCampaign, setIsEditingCampaign] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  
  const [isAddingEmailTemplate, setIsAddingEmailTemplate] = useState(false);
  const [isEditingEmailTemplate, setIsEditingEmailTemplate] = useState(false);
  const [selectedEmailTemplateId, setSelectedEmailTemplateId] = useState("");

  // Promo Code Form
  const promoCodeForm = useForm<z.infer<typeof promoCodeSchema>>({
    resolver: zodResolver(promoCodeSchema),
    defaultValues: {
      code: "",
      discountType: "percentage",
      discountValue: "",
      minimumPurchase: "",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      applicableProducts: "",
      usageLimit: "",
      description: "",
    },
  });

  const resetPromoCodeForm = () => {
    promoCodeForm.reset({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minimumPurchase: "",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      applicableProducts: "",
      usageLimit: "",
      description: "",
    });
  };

  const handleAddPromoCode = (data: z.infer<typeof promoCodeSchema>) => {
    const newPromoCode = {
      id: `PROMO-${Date.now()}`,
      code: data.code,
      discountType: data.discountType,
      discountValue: parseFloat(data.discountValue),
      minimumPurchase: data.minimumPurchase ? parseFloat(data.minimumPurchase) : 0,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      applicableProducts: data.applicableProducts || "Tous les produits",
      usageLimit: data.usageLimit ? parseInt(data.usageLimit) : null,
      description: data.description || "",
      isActive: true,
      usedCount: 0,
      createdAt: new Date().toISOString(),
    };
    dispatch(addPromoCode(newPromoCode));
    resetPromoCodeForm();
    setIsAddingPromoCode(false);
    toast({
      title: "Code promo ajouté",
      description: `Le code promo ${data.code} a été ajouté avec succès.`,
    });
  };

  const handleEditPromoCode = (data: z.infer<typeof promoCodeSchema>) => {
    const updatedPromoCode = {
      id: selectedPromoCodeId,
      code: data.code,
      discountType: data.discountType,
      discountValue: parseFloat(data.discountValue),
      minimumPurchase: data.minimumPurchase ? parseFloat(data.minimumPurchase) : 0,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      applicableProducts: data.applicableProducts || "Tous les produits",
      usageLimit: data.usageLimit ? parseInt(data.usageLimit) : null,
      description: data.description || "",
    };
    dispatch(updatePromoCode(updatedPromoCode));
    resetPromoCodeForm();
    setIsEditingPromoCode(false);
    toast({
      title: "Code promo modifié",
      description: `Le code promo ${data.code} a été modifié avec succès.`,
    });
  };

  const handleDeletePromoCode = (id: string) => {
    dispatch(deletePromoCode(id));
    toast({
      title: "Code promo supprimé",
      description: "Le code promo a été supprimé avec succès.",
    });
  };

  const handleTogglePromoCodeStatus = (id: string, isActive: boolean) => {
    dispatch(togglePromoCodeStatus({ id, isActive: !isActive }));
    toast({
      title: isActive ? "Code promo désactivé" : "Code promo activé",
      description: isActive
        ? "Le code promo a été désactivé avec succès."
        : "Le code promo a été activé avec succès.",
    });
  };

  const editPromoCode = (id: string) => {
    const promoCode = promoCodes.find((pc) => pc.id === id);
    if (promoCode) {
      promoCodeForm.reset({
        code: promoCode.code,
        discountType: promoCode.discountType,
        discountValue: promoCode.discountValue.toString(),
        minimumPurchase: promoCode.minimumPurchase ? promoCode.minimumPurchase.toString() : "",
        startDate: new Date(promoCode.startDate),
        endDate: new Date(promoCode.endDate),
        applicableProducts: promoCode.applicableProducts,
        usageLimit: promoCode.usageLimit ? promoCode.usageLimit.toString() : "",
        description: promoCode.description,
      });
      setSelectedPromoCodeId(id);
      setIsEditingPromoCode(true);
    }
  };

  // Campaign Form
  const campaignForm = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: "",
      platform: "",
      budget: "",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      targetAudience: "",
      objectives: "",
      description: "",
    },
  });

  const resetCampaignForm = () => {
    campaignForm.reset({
      name: "",
      platform: "",
      budget: "",
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      targetAudience: "",
      objectives: "",
      description: "",
    });
  };

  const handleAddCampaign = (data: z.infer<typeof campaignSchema>) => {
    const newCampaign = {
      id: `CAMP-${Date.now()}`,
      name: data.name,
      platform: data.platform,
      budget: parseFloat(data.budget),
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      targetAudience: data.targetAudience || "Tous les utilisateurs",
      objectives: data.objectives || "Augmenter les ventes",
      description: data.description || "",
      isActive: true,
      performance: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        cpc: 0,
        roas: 0,
      },
      createdAt: new Date().toISOString(),
    };
    dispatch(addCampaign(newCampaign));
    resetCampaignForm();
    setIsAddingCampaign(false);
    toast({
      title: "Campagne ajoutée",
      description: `La campagne ${data.name} a été ajoutée avec succès.`,
    });
  };

  const handleEditCampaign = (data: z.infer<typeof campaignSchema>) => {
    const updatedCampaign = {
      id: selectedCampaignId,
      name: data.name,
      platform: data.platform,
      budget: parseFloat(data.budget),
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
      targetAudience: data.targetAudience || "Tous les utilisateurs",
      objectives: data.objectives || "Augmenter les ventes",
      description: data.description || "",
    };
    dispatch(updateCampaign(updatedCampaign));
    resetCampaignForm();
    setIsEditingCampaign(false);
    toast({
      title: "Campagne modifiée",
      description: `La campagne ${data.name} a été modifiée avec succès.`,
    });
  };

  const handleDeleteCampaign = (id: string) => {
    dispatch(deleteCampaign(id));
    toast({
      title: "Campagne supprimée",
      description: "La campagne a été supprimée avec succès.",
    });
  };

  const handleToggleCampaignStatus = (id: string, isActive: boolean) => {
    dispatch(toggleCampaignStatus({ id, isActive: !isActive }));
    toast({
      title: isActive ? "Campagne désactivée" : "Campagne activée",
      description: isActive
        ? "La campagne a été désactivée avec succès."
        : "La campagne a été activée avec succès.",
    });
  };

  const editCampaign = (id: string) => {
    const campaign = campaigns.find((camp) => camp.id === id);
    if (campaign) {
      campaignForm.reset({
        name: campaign.name,
        platform: campaign.platform,
        budget: campaign.budget.toString(),
        startDate: new Date(campaign.startDate),
        endDate: new Date(campaign.endDate),
        targetAudience: campaign.targetAudience,
        objectives: campaign.objectives,
        description: campaign.description,
      });
      setSelectedCampaignId(id);
      setIsEditingCampaign(true);
    }
  };

  // Email Template Form
  const emailTemplateForm = useForm<z.infer<typeof emailTemplateSchema>>({
    resolver: zodResolver(emailTemplateSchema),
    defaultValues: {
      name: "",
      subject: "",
      content: "",
      type: "",
    },
  });

  const resetEmailTemplateForm = () => {
    emailTemplateForm.reset({
      name: "",
      subject: "",
      content: "",
      type: "",
    });
  };

  const handleAddEmailTemplate = (data: z.infer<typeof emailTemplateSchema>) => {
    const newEmailTemplate = {
      id: `EMAIL-${Date.now()}`,
      name: data.name,
      subject: data.subject,
      content: data.content,
      type: data.type,
      createdAt: new Date().toISOString(),
    };
    dispatch(addEmailTemplate(newEmailTemplate));
    resetEmailTemplateForm();
    setIsAddingEmailTemplate(false);
    toast({
      title: "Modèle d'email ajouté",
      description: `Le modèle d'email ${data.name} a été ajouté avec succès.`,
    });
  };

  const handleEditEmailTemplate = (data: z.infer<typeof emailTemplateSchema>) => {
    const updatedEmailTemplate = {
      id: selectedEmailTemplateId,
      name: data.name,
      subject: data.subject,
      content: data.content,
      type: data.type,
    };
    dispatch(updateEmailTemplate(updatedEmailTemplate));
    resetEmailTemplateForm();
    setIsEditingEmailTemplate(false);
    toast({
      title: "Modèle d'email modifié",
      description: `Le modèle d'email ${data.name} a été modifié avec succès.`,
    });
  };

  const handleDeleteEmailTemplate = (id: string) => {
    dispatch(deleteEmailTemplate(id));
    toast({
      title: "Modèle d'email supprimé",
      description: "Le modèle d'email a été supprimé avec succès.",
    });
  };

  const editEmailTemplate = (id: string) => {
    const emailTemplate = emailTemplates.find((template) => template.id === id);
    if (emailTemplate) {
      emailTemplateForm.reset({
        name: emailTemplate.name,
        subject: emailTemplate.subject,
        content: emailTemplate.content,
        type: emailTemplate.type,
      });
      setSelectedEmailTemplateId(id);
      setIsEditingEmailTemplate(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h1 className="text-2xl font-bold">Marketing & Promotions</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gérez vos codes promo, campagnes marketing et modèles d'emails.
        </p>
      </div>

      <Tabs defaultValue="promo-codes" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="promo-codes">Codes Promo</TabsTrigger>
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="emails">Emails & Notifications</TabsTrigger>
        </TabsList>

        {/* Promo Codes Tab */}
        <TabsContent value="promo-codes" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Codes Promo</h2>
            <Dialog open={isAddingPromoCode} onOpenChange={setIsAddingPromoCode}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Nouveau Code Promo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un code promo</DialogTitle>
                  <DialogDescription>
                    Créez un nouveau code promo pour vos clients.
                  </DialogDescription>
                </DialogHeader>
                <Form {...promoCodeForm}>
                  <form onSubmit={promoCodeForm.handleSubmit(handleAddPromoCode)} className="space-y-6">
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-4">
                        <FormField
                          control={promoCodeForm.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code</FormLabel>
                              <FormControl>
                                <Input placeholder="ETE2023" {...field} />
                              </FormControl>
                              <FormDescription>
                                Code que les clients utiliseront lors du paiement.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={promoCodeForm.control}
                            name="discountType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type de remise</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez un type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                                    <SelectItem value="fixed">Montant fixe (€)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={promoCodeForm.control}
                            name="discountValue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Valeur de la remise</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="10" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={promoCodeForm.control}
                          name="minimumPurchase"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Achat minimum (€)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="50" {...field} />
                              </FormControl>
                              <FormDescription>
                                Laissez vide s'il n'y a pas de minimum.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={promoCodeForm.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "P", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={promoCodeForm.control}
                            name="endDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de fin</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "P", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={promoCodeForm.control}
                          name="applicableProducts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Produits applicables</FormLabel>
                              <FormControl>
                                <Input placeholder="Tous les produits" {...field} />
                              </FormControl>
                              <FormDescription>
                                Laissez vide pour appliquer à tous les produits.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={promoCodeForm.control}
                          name="usageLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Limite d'utilisation</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="100" {...field} />
                              </FormControl>
                              <FormDescription>
                                Nombre maximum d'utilisations. Laissez vide pour illimité.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={promoCodeForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Description du code promo..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </ScrollArea>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddingPromoCode(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Promo Codes Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Remise</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Utilisations</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promoCodes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                        Aucun code promo disponible
                      </TableCell>
                    </TableRow>
                  ) : (
                    promoCodes.map((promoCode) => (
                      <TableRow key={promoCode.id}>
                        <TableCell className="font-medium">{promoCode.code}</TableCell>
                        <TableCell>
                          {promoCode.discountType === "percentage"
                            ? `${promoCode.discountValue}%`
                            : `${promoCode.discountValue}€`}
                          {promoCode.minimumPurchase > 0 && (
                            <span className="text-xs text-gray-500 block">
                              Min: {promoCode.minimumPurchase}€
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Du: {format(new Date(promoCode.startDate), "dd/MM/yyyy")}</div>
                            <div>Au: {format(new Date(promoCode.endDate), "dd/MM/yyyy")}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {promoCode.usageLimit ? (
                            <span>
                              {promoCode.usedCount}/{promoCode.usageLimit}
                            </span>
                          ) : (
                            <span>{promoCode.usedCount} / Illimité</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={promoCode.isActive}
                              onCheckedChange={() =>
                                handleTogglePromoCodeStatus(promoCode.id, promoCode.isActive)
                              }
                            />
                            <Badge
                              variant={promoCode.isActive ? "default" : "secondary"}
                            >
                              {promoCode.isActive ? "Actif" : "Inactif"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => editPromoCode(promoCode.id)}>
                                <FileEdit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  navigator.clipboard.writeText(promoCode.code);
                                  toast({
                                    title: "Code copié",
                                    description: "Le code promo a été copié dans le presse-papier.",
                                  });
                                }}
                              >
                                <CopyIcon className="h-4 w-4 mr-2" />
                                Copier le code
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeletePromoCode(promoCode.id)}
                              >
                                <Trash2Icon className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Edit Promo Code Dialog */}
          <Dialog open={isEditingPromoCode} onOpenChange={setIsEditingPromoCode}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Modifier le code promo</DialogTitle>
                <DialogDescription>
                  Modifiez les détails du code promo.
                </DialogDescription>
              </DialogHeader>
              <Form {...promoCodeForm}>
                <form onSubmit={promoCodeForm.handleSubmit(handleEditPromoCode)} className="space-y-6">
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4">
                      <FormField
                        control={promoCodeForm.control}
                        name="code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                              <Input placeholder="ETE2023" {...field} />
                            </FormControl>
                            <FormDescription>
                              Code que les clients utiliseront lors du paiement.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={promoCodeForm.control}
                          name="discountType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type de remise</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                                  <SelectItem value="fixed">Montant fixe (€)</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={promoCodeForm.control}
                          name="discountValue"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Valeur de la remise</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="10" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={promoCodeForm.control}
                        name="minimumPurchase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Achat minimum (€)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="50" {...field} />
                            </FormControl>
                            <FormDescription>
                              Laissez vide s'il n'y a pas de minimum.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={promoCodeForm.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de début</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "P", { locale: fr })
                                      ) : (
                                        <span>Choisir une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={promoCodeForm.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de fin</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "P", { locale: fr })
                                      ) : (
                                        <span>Choisir une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={promoCodeForm.control}
                        name="applicableProducts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Produits applicables</FormLabel>
                            <FormControl>
                              <Input placeholder="Tous les produits" {...field} />
                            </FormControl>
                            <FormDescription>
                              Laissez vide pour appliquer à tous les produits.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={promoCodeForm.control}
                        name="usageLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Limite d'utilisation</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="100" {...field} />
                            </FormControl>
                            <FormDescription>
                              Nombre maximum d'utilisations. Laissez vide pour illimité.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={promoCodeForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Description du code promo..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </ScrollArea>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditingPromoCode(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Enregistrer</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Campagnes publicitaires</h2>
            <Dialog open={isAddingCampaign} onOpenChange={setIsAddingCampaign}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Nouvelle Campagne
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Ajouter une campagne</DialogTitle>
                  <DialogDescription>
                    Créez une nouvelle campagne publicitaire.
                  </DialogDescription>
                </DialogHeader>
                <Form {...campaignForm}>
                  <form onSubmit={campaignForm.handleSubmit(handleAddCampaign)} className="space-y-6">
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-4">
                        <FormField
                          control={campaignForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom de la campagne</FormLabel>
                              <FormControl>
                                <Input placeholder="Soldes d'été 2023" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={campaignForm.control}
                          name="platform"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Plateforme</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez une plateforme" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="facebook">Facebook</SelectItem>
                                  <SelectItem value="instagram">Instagram</SelectItem>
                                  <SelectItem value="google">Google Ads</SelectItem>
                                  <SelectItem value="tiktok">TikTok</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="multi">Multi-plateforme</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={campaignForm.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Budget (€)</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="1000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={campaignForm.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de début</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "P", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={campaignForm.control}
                            name="endDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date de fin</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "P", { locale: fr })
                                        ) : (
                                          <span>Choisir une date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={campaignForm.control}
                          name="targetAudience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Public cible</FormLabel>
                              <FormControl>
                                <Input placeholder="Jeunes adultes 18-35 ans" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={campaignForm.control}
                          name="objectives"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Objectifs</FormLabel>
                              <FormControl>
                                <Input placeholder="Augmenter les ventes de 20%" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={campaignForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Description détaillée de la campagne..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </ScrollArea>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddingCampaign(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Plateforme</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Période</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                        Aucune campagne disponible
                      </TableCell>
                    </TableRow>
                  ) : (
                    campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.platform}</Badge>
                        </TableCell>
                        <TableCell>{campaign.budget}€</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Du: {format(new Date(campaign.startDate), "dd/MM/yyyy")}</div>
                            <div>Au: {format(new Date(campaign.endDate), "dd/MM/yyyy")}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-xs space-y-1">
                            <div>Impressions: {campaign.performance.impressions}</div>
                            <div>Clics: {campaign.performance.clicks}</div>
                            <div>CTR: {campaign.performance.ctr}%</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={campaign.isActive}
                              onCheckedChange={() =>
                                handleToggleCampaignStatus(campaign.id, campaign.isActive)
                              }
                            />
                            <Badge
                              variant={campaign.isActive ? "default" : "secondary"}
                            >
                              {campaign.isActive ? "En cours" : "Suspendue"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => editCampaign(campaign.id)}>
                                <FileEdit className="h-4 w-4 mr-2" />
                                Modifier
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  toast({
                                    title: "Rapport généré",
                                    description: "Le rapport de performance a été généré.",
                                  });
                                }}
                              >
                                <TagIcon className="h-4 w-4 mr-2" />
                                Générer un rapport
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                              >
                                <Trash2Icon className="h-4 w-4 mr-2" />
                                Supprimer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Edit Campaign Dialog */}
          <Dialog open={isEditingCampaign} onOpenChange={setIsEditingCampaign}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Modifier la campagne</DialogTitle>
                <DialogDescription>
                  Modifiez les détails de la campagne publicitaire.
                </DialogDescription>
              </DialogHeader>
              <Form {...campaignForm}>
                <form onSubmit={campaignForm.handleSubmit(handleEditCampaign)} className="space-y-6">
                  <ScrollArea className="h-[60vh] pr-4">
                    <div className="space-y-4">
                      <FormField
                        control={campaignForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom de la campagne</FormLabel>
                            <FormControl>
                              <Input placeholder="Soldes d'été 2023" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={campaignForm.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plateforme</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une plateforme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="google">Google Ads</SelectItem>
                                <SelectItem value="tiktok">TikTok</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="multi">Multi-plateforme</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={campaignForm.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget (€)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="1000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={campaignForm.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de début</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "P", { locale: fr })
                                      ) : (
                                        <span>Choisir une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={campaignForm.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de fin</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "P", { locale: fr })
                                      ) : (
                                        <span>Choisir une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={campaignForm.control}
                        name="targetAudience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Public cible</FormLabel>
                            <FormControl>
                              <Input placeholder="Jeunes adultes 18-35 ans" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={campaignForm.control}
                        name="objectives"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Objectifs</FormLabel>
                            <FormControl>
                              <Input placeholder="Augmenter les ventes de 20%" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={campaignForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Description détaillée de la campagne..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </ScrollArea>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditingCampaign(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Enregistrer</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Emails Tab */}
        <TabsContent value="emails" className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Modèles d'emails</h2>
            <Dialog open={isAddingEmailTemplate} onOpenChange={setIsAddingEmailTemplate}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Nouveau Modèle
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Ajouter un modèle d'email</DialogTitle>
                  <DialogDescription>
                    Créez un nouveau modèle d'email pour vos campagnes.
                  </DialogDescription>
                </DialogHeader>
                <Form {...emailTemplateForm}>
                  <form onSubmit={emailTemplateForm.handleSubmit(handleAddEmailTemplate)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={emailTemplateForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom du modèle</FormLabel>
                            <FormControl>
                              <Input placeholder="Bienvenue aux nouveaux clients" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={emailTemplateForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="welcome">Bienvenue</SelectItem>
                                <SelectItem value="promotion">Promotion</SelectItem>
                                <SelectItem value="newsletter">Newsletter</SelectItem>
                                <SelectItem value="abandoned-cart">Panier abandonné</SelectItem>
                                <SelectItem value="order-confirmation">Confirmation de commande</SelectItem>
                                <SelectItem value="shipping-confirmation">Confirmation d'expédition</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={emailTemplateForm.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sujet</FormLabel>
                            <FormControl>
                              <Input placeholder="Bienvenue chez Boutique XYZ!" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={emailTemplateForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contenu</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Contenu de l'email..."
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Vous pouvez utiliser des variables comme {"{nom}"}, {"{prenom}"}, etc.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddingEmailTemplate(false)}>
                        Annuler
                      </Button>
                      <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Email Templates Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {emailTemplates.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="flex items-center justify-center p-6">
                  <p className="text-center text-gray-500">
                    Aucun modèle d'email disponible. Créez votre premier modèle !
                  </p>
                </CardContent>
              </Card>
            ) : (
              emailTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{template.name}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mt-1">
                            {template.type}
                          </Badge>
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => editEmailTemplate(template.id)}>
                            <FileEdit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <EyeIcon className="h-4 w-4 mr-2" />
                            Prévisualiser
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckIcon className="h-4 w-4 mr-2" />
                            Envoyer un test
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteEmailTemplate(template.id)}
                          >
                            <Trash2Icon className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium">Sujet :</span>
                        <p className="text-sm">{template.subject}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Aperçu :</span>
                        <p className="text-sm line-clamp-3">{template.content}</p>
                      </div>
                      <div className="pt-2">
                        <span className="text-xs text-gray-500">
                          Créé le {format(new Date(template.createdAt), "dd/MM/yyyy")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Utiliser ce modèle
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          {/* Edit Email Template Dialog */}
          <Dialog open={isEditingEmailTemplate} onOpenChange={setIsEditingEmailTemplate}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Modifier le modèle d'email</DialogTitle>
                <DialogDescription>
                  Modifiez les détails du modèle d'email.
                </DialogDescription>
              </DialogHeader>
              <Form {...emailTemplateForm}>
                <form onSubmit={emailTemplateForm.handleSubmit(handleEditEmailTemplate)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={emailTemplateForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du modèle</FormLabel>
                          <FormControl>
                            <Input placeholder="Bienvenue aux nouveaux clients" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailTemplateForm.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez un type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="welcome">Bienvenue</SelectItem>
                              <SelectItem value="promotion">Promotion</SelectItem>
                              <SelectItem value="newsletter">Newsletter</SelectItem>
                              <SelectItem value="abandoned-cart">Panier abandonné</SelectItem>
                              <SelectItem value="order-confirmation">Confirmation de commande</SelectItem>
                              <SelectItem value="shipping-confirmation">Confirmation d'expédition</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailTemplateForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Bienvenue chez Boutique XYZ!" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailTemplateForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contenu</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Contenu de l'email..."
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Vous pouvez utiliser des variables comme {"{nom}"}, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsEditingEmailTemplate(false)}>
                      Annuler
                    </Button>
                    <Button type="submit">Enregistrer</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Marketing;
