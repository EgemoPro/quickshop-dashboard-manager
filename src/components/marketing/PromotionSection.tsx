
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Gift, Edit, Trash2, Clock, Tag, Percent, Package } from "lucide-react";
import { addPromoCode, updatePromoCode, deletePromoCode, togglePromoCodeStatus } from "@/store/slices/marketingSlice";
import { format } from "date-fns";

interface PromotionSectionProps {
  darkMode: boolean;
}

const PromotionSection: React.FC<PromotionSectionProps> = ({ darkMode }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { promoCodes } = useSelector((state: RootState) => state.marketing);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<string | null>(null);
  
  const [promoForm, setPromoForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 0,
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), "yyyy-MM-dd"),
    limitedUses: false,
    maxUses: 100,
    applicableProducts: "all",
    applicableCategories: "all",
    active: true,
  });
  
  const resetForm = () => {
    setPromoForm({
      code: "",
      discountType: "percentage",
      discountValue: 10,
      minPurchase: 0,
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), "yyyy-MM-dd"),
      limitedUses: false,
      maxUses: 100,
      applicableProducts: "all",
      applicableCategories: "all",
      active: true,
    });
    setEditingPromo(null);
  };
  
  const handleOpenDialog = (promoId?: string) => {
    if (promoId) {
      const promo = promoCodes.find(p => p.id === promoId);
      if (promo) {
        setPromoForm({
          code: promo.code,
          discountType: promo.discountType,
          discountValue: promo.discountValue,
          minPurchase: promo.minPurchase,
          startDate: promo.startDate,
          endDate: promo.endDate,
          limitedUses: promo.limitedUses,
          maxUses: promo.maxUses,
          applicableProducts: typeof promo.applicableProducts === 'string' ? promo.applicableProducts : 'all',
          applicableCategories: typeof promo.applicableCategories === 'string' ? promo.applicableCategories : 'all',
          active: promo.active,
        });
        setEditingPromo(promoId);
      }
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    resetForm();
  };
  
  const handleSubmit = () => {
    if (!promoForm.code) {
      toast({
        title: "Erreur",
        description: "Le code promo est requis",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (editingPromo) {
        dispatch(updatePromoCode({
          id: editingPromo,
          ...promoForm,
        }));
        toast({
          title: "Succès",
          description: "Le code promo a été mis à jour",
        });
      } else {
        dispatch(addPromoCode(promoForm));
        toast({
          title: "Succès",
          description: "Le code promo a été créé",
        });
      }
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = (id: string) => {
    dispatch(deletePromoCode(id));
    toast({
      title: "Succès",
      description: "Le code promo a été supprimé",
    });
  };
  
  const handleToggleStatus = (id: string) => {
    dispatch(togglePromoCodeStatus(id));
  };
  
  const getPromoTypeIcon = (type: string) => {
    switch (type) {
      case 'percentage':
        return <Percent className="h-4 w-4" />;
      case 'fixed':
        return <Tag className="h-4 w-4" />;
      case 'freeShipping':
        return <Package className="h-4 w-4" />;
      default:
        return <Gift className="h-4 w-4" />;
    }
  };
  
  const getPromoTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage':
        return 'Pourcentage';
      case 'fixed':
        return 'Montant fixe';
      case 'freeShipping':
        return 'Livraison gratuite';
      default:
        return 'Inconnu';
    }
  };
  
  return (
    <Card className={`border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} transition-colors duration-300`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Promotions & Codes Promo</CardTitle>
            <CardDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              Gérez les offres spéciales et codes de réduction
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4 mr-2" /> Nouveau code
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Actifs</TabsTrigger>
            <TabsTrigger value="inactive">Inactifs</TabsTrigger>
            <TabsTrigger value="all">Tous</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="space-y-2">
              {promoCodes.filter(promo => promo.active).map(promo => (
                <div 
                  key={promo.id} 
                  className={`p-4 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-700 hover:bg-gray-650' : 'bg-gray-50 hover:bg-gray-100'} transition-colors`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-teal-900' : 'bg-teal-100'}`}>
                      {getPromoTypeIcon(promo.discountType)}
                    </div>
                    <div>
                      <h3 className="font-medium">{promo.code}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getPromoTypeLabel(promo.discountType)}: {promo.discountType === 'percentage' ? `${promo.discountValue}%` : 
                          promo.discountType === 'fixed' ? `${promo.discountValue}€` : 'Livraison gratuite'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className={`text-xs flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock className="h-3 w-3 mr-1" /> {promo.startDate} - {promo.endDate}
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(promo.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(promo.id)}>
                      <Switch checked={promo.active} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(promo.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              {promoCodes.filter(promo => promo.active).length === 0 && (
                <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Gift className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucun code promo actif</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="inactive">
            <div className="space-y-2">
              {promoCodes.filter(promo => !promo.active).map(promo => (
                <div 
                  key={promo.id} 
                  className={`p-4 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} opacity-70`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      {getPromoTypeIcon(promo.discountType)}
                    </div>
                    <div>
                      <h3 className="font-medium">{promo.code}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getPromoTypeLabel(promo.discountType)}: {promo.discountType === 'percentage' ? `${promo.discountValue}%` : 
                          promo.discountType === 'fixed' ? `${promo.discountValue}€` : 'Livraison gratuite'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(promo.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(promo.id)}>
                      <Switch checked={promo.active} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(promo.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              {promoCodes.filter(promo => !promo.active).length === 0 && (
                <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Gift className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucun code promo inactif</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="space-y-2">
              {promoCodes.length > 0 ? promoCodes.map(promo => (
                <div 
                  key={promo.id} 
                  className={`p-4 rounded-lg flex justify-between items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} ${!promo.active ? 'opacity-70' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${darkMode ? promo.active ? 'bg-teal-900' : 'bg-gray-600' : promo.active ? 'bg-teal-100' : 'bg-gray-200'}`}>
                      {getPromoTypeIcon(promo.discountType)}
                    </div>
                    <div>
                      <h3 className="font-medium">{promo.code}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {getPromoTypeLabel(promo.discountType)}: {promo.discountType === 'percentage' ? `${promo.discountValue}%` : 
                          promo.discountType === 'fixed' ? `${promo.discountValue}€` : 'Livraison gratuite'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className={`text-xs flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock className="h-3 w-3 mr-1" /> {promo.startDate} - {promo.endDate}
                    </p>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(promo.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(promo.id)}>
                      <Switch checked={promo.active} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(promo.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              )) : (
                <div className={`p-8 text-center rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <Gift className={`h-10 w-10 mx-auto mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Aucun code promo</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Dialog pour ajouter/éditer un code promo */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'} sm:max-w-[550px]`}>
          <DialogHeader>
            <DialogTitle>{editingPromo ? "Modifier le code promo" : "Créer un nouveau code promo"}</DialogTitle>
            <DialogDescription className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
              {editingPromo ? "Modifiez les détails du code promo" : "Remplissez les détails pour créer un nouveau code promo"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="promo-code" className="text-right">Code</Label>
              <Input
                id="promo-code"
                value={promoForm.code}
                onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value })}
                placeholder="BIENVENUE10"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discount-type" className="text-right">Type</Label>
              <Select 
                value={promoForm.discountType} 
                onValueChange={(value) => setPromoForm({ ...promoForm, discountType: value as "percentage" | "fixed" | "freeShipping" })}
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
                <Label htmlFor="discount-value" className="text-right">Valeur</Label>
                <Input
                  id="discount-value"
                  type="number"
                  value={promoForm.discountValue}
                  onChange={(e) => setPromoForm({ ...promoForm, discountValue: Number(e.target.value) })}
                  placeholder="10"
                  className="col-span-3"
                />
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="min-purchase" className="text-right">Achat min.</Label>
              <Input
                id="min-purchase"
                type="number"
                value={promoForm.minPurchase}
                onChange={(e) => setPromoForm({ ...promoForm, minPurchase: Number(e.target.value) })}
                placeholder="0"
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start-date" className="text-right">Date début</Label>
              <Input
                id="start-date"
                type="date"
                value={promoForm.startDate}
                onChange={(e) => setPromoForm({ ...promoForm, startDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end-date" className="text-right">Date fin</Label>
              <Input
                id="end-date"
                type="date"
                value={promoForm.endDate}
                onChange={(e) => setPromoForm({ ...promoForm, endDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limited-uses" className="text-right">Limité</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="limited-uses"
                  checked={promoForm.limitedUses}
                  onCheckedChange={(checked) => setPromoForm({ ...promoForm, limitedUses: checked })}
                />
                <Label htmlFor="limited-uses">Nombre d'utilisations limité</Label>
              </div>
            </div>
            
            {promoForm.limitedUses && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="max-uses" className="text-right">Max. utilisations</Label>
                <Input
                  id="max-uses"
                  type="number"
                  value={promoForm.maxUses}
                  onChange={(e) => setPromoForm({ ...promoForm, maxUses: Number(e.target.value) })}
                  placeholder="100"
                  className="col-span-3"
                />
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active-status" className="text-right">Statut</Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="active-status"
                  checked={promoForm.active}
                  onCheckedChange={(checked) => setPromoForm({ ...promoForm, active: checked })}
                />
                <Label htmlFor="active-status">{promoForm.active ? "Actif" : "Inactif"}</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700">
              {editingPromo ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PromotionSection;
