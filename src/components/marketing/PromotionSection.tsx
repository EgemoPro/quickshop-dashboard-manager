import React, { useState } from "react";
import { Calendar, Clock, FilePenLine, Trash, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import MarketingCard from "./MarketingCard";
import { useAppDispatch } from "@/store/hooks";
import { 
  addPromoCode, 
  updatePromoCode, 
  deletePromoCode, 
  PromoCode 
} from "@/store/slices/marketingSlice";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

export const PromotionSection = ({ promoCodes }: { promoCodes: PromoCode[] }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPromoId, setCurrentPromoId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<PromoCode, 'id'>>({
    code: "",
    discountType: "percentage",
    discountValue: 10,
    minPurchase: 0,
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"), // +30 days
    limitedUses: false,
    maxUses: 100,
    usedCount: 0,
    applicableProducts: "all" as const,
    applicableCategories: "all" as const,
    active: true,
  });

  const resetForm = () => {
    setFormData({
      code: "",
      discountType: "percentage",
      discountValue: 10,
      minPurchase: 0,
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
      limitedUses: false,
      maxUses: 100,
      usedCount: 0,
      applicableProducts: "all",
      applicableCategories: "all",
      active: true,
    });
    setIsEditing(false);
    setCurrentPromoId(null);
  };

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddPromo = () => {
    setIsDialogOpen(true);
  };

  const handleEditPromo = (promo: PromoCode) => {
    setFormData({
      code: promo.code,
      discountType: promo.discountType,
      discountValue: promo.discountValue,
      minPurchase: promo.minPurchase,
      startDate: promo.startDate,
      endDate: promo.endDate,
      limitedUses: promo.limitedUses,
      maxUses: promo.maxUses,
      usedCount: promo.usedCount,
      applicableProducts: promo.applicableProducts,
      applicableCategories: promo.applicableCategories,
      active: promo.active,
    });
    setIsEditing(true);
    setCurrentPromoId(promo.id);
    setIsDialogOpen(true);
  };

  const handleDeletePromo = (id: string) => {
    dispatch(deletePromoCode(id));
    toast({
      title: "Code promo supprimé",
      description: "Le code promo a été supprimé avec succès."
    });
  };

  const handleSubmit = () => {
    if (isEditing && currentPromoId) {
      dispatch(updatePromoCode({
        id: currentPromoId,
        ...formData
      }));
      toast({
        title: "Code promo modifié",
        description: `Le code "${formData.code}" a été modifié avec succès.`
      });
    } else {
      const { usedCount, ...promoWithoutCounts } = formData;
      dispatch(addPromoCode(promoWithoutCounts));
      toast({
        title: "Code promo créé",
        description: `Le code "${formData.code}" a été créé avec succès.`
      });
    }
    resetForm();
    setIsDialogOpen(false);
  };

  return (
    <div>
      <MarketingCard title="Promotions et Codes Promo" icon={<Calendar className="h-5 w-5" />}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium">Codes promo actifs</h4>
          <Button size="sm" onClick={handleAddPromo} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>

        <div className="space-y-3">
          {promoCodes.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Aucun code promo défini</p>
          ) : (
            promoCodes.map((promo) => (
              <div key={promo.id} className="border rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-medium">{promo.code}</h5>
                    <Badge variant={promo.active ? "default" : "outline"}>
                      {promo.active ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {promo.discountType === "percentage"
                      ? `${promo.discountValue}% de réduction`
                      : promo.discountType === "fixed"
                      ? `${promo.discountValue}€ de réduction`
                      : "Livraison gratuite"}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Clock className="h-3 w-3" />
                    {promo.startDate} - {promo.endDate}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditPromo(promo)}>
                    <FilePenLine className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeletePromo(promo.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </MarketingCard>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Modifier le code promo" : "Ajouter un code promo"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Modifiez les détails du code promo ci-dessous."
                : "Remplissez les détails pour créer un nouveau code promo."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value.toUpperCase())}
                placeholder="ex: SUMMER2023"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="discountType">Type de réduction</Label>
                <Select
                  value={formData.discountType}
                  onValueChange={(value) => handleChange("discountType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type de réduction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="percentage">Pourcentage</SelectItem>
                      <SelectItem value="fixed">Montant fixe</SelectItem>
                      <SelectItem value="freeShipping">Livraison gratuite</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="discountValue">Valeur de la réduction</Label>
                <Input
                  id="discountValue"
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => handleChange("discountValue", parseFloat(e.target.value))}
                  disabled={formData.discountType === "freeShipping"}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="minPurchase">Achat minimum (€)</Label>
              <Input
                id="minPurchase"
                type="number"
                value={formData.minPurchase}
                onChange={(e) => handleChange("minPurchase", parseFloat(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Date de début</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endDate">Date de fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="limitedUses">Limiter le nombre d'utilisations</Label>
                <p className="text-xs text-gray-500">Limiter le nombre total d'utilisation</p>
              </div>
              <Switch
                id="limitedUses"
                checked={formData.limitedUses}
                onCheckedChange={(checked) => handleChange("limitedUses", checked)}
              />
            </div>

            {formData.limitedUses && (
              <div className="grid gap-2">
                <Label htmlFor="maxUses">Utilisations maximum</Label>
                <Input
                  id="maxUses"
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) => handleChange("maxUses", parseInt(e.target.value))}
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="active">Code actif</Label>
                <p className="text-xs text-gray-500">Activer ou désactiver ce code</p>
              </div>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleChange("active", checked)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={!formData.code}>
              <Check className="h-4 w-4 mr-2" />
              {isEditing ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromotionSection;
