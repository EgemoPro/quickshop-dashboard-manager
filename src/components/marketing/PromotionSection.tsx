import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { PlusCircle, Calendar as CalendarIcon, Tag, Trash2, Edit2, Percent, Package, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { PromoCode, addPromoCode, updatePromoCode, deletePromoCode, togglePromoCodeStatus } from '@/store/slices/marketingSlice';

const PromotionSection = () => {
  const dispatch = useDispatch();
  const { promoCodes } = useSelector((state: RootState) => state.marketing);
  const {  currencySymbol } = useSelector((state: RootState) => state.settings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromoCode, setEditingPromoCode] = useState<PromoCode | null>(null);
  
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<PromoCode['discountType']>('percentage');
  const [discountValue, setDiscountValue] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [limitedUses, setLimitedUses] = useState(false);
  const [maxUses, setMaxUses] = useState(0);
  const [applicableProducts, setApplicableProducts] = useState<string | string[]>('all');
  const [applicableCategories, setApplicableCategories] = useState<string | string[]>('all');
  
  const resetForm = () => {
    setCode('');
    setDiscountType('percentage');
    setDiscountValue(0);
    setMinPurchase(0);
    setStartDate(undefined);
    setEndDate(undefined);
    setLimitedUses(false);
    setMaxUses(0);
    setApplicableProducts('all');
    setApplicableCategories('all');
    setEditingPromoCode(null);
  };

  const handleEdit = (promoCode: PromoCode) => {
    setEditingPromoCode(promoCode);
    setCode(promoCode.code);
    setDiscountType(promoCode.discountType);
    setDiscountValue(promoCode.discountValue);
    setMinPurchase(promoCode.minPurchase);
    setStartDate(new Date(promoCode.startDate));
    setEndDate(new Date(promoCode.endDate));
    setLimitedUses(promoCode.limitedUses);
    setMaxUses(promoCode.maxUses);
    setApplicableProducts(typeof promoCode.applicableProducts === 'string' ? promoCode.applicableProducts : promoCode.applicableProducts.join(','));
    setApplicableCategories(typeof promoCode.applicableCategories === 'string' ? promoCode.applicableCategories : promoCode.applicableCategories.join(','));
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce code promo ?')) {
      dispatch(deletePromoCode(id));
    }
  };

  const handleToggleStatus = (id: string) => {
    dispatch(togglePromoCodeStatus(id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const processApplicableField = (field: string | string[]): string | string[] => {
      if (typeof field === 'string' && field !== 'all') {
        return field.includes(',') ? field.split(',').map(item => item.trim()) : field;
      }
      return field;
    };

    const promoCodeData = {
      code,
      discountType,
      discountValue,
      minPurchase,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : '',
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : '',
      limitedUses,
      maxUses,
      applicableProducts: processApplicableField(applicableProducts),
      applicableCategories: processApplicableField(applicableCategories),
      active: true
    };

    if (editingPromoCode) {
      dispatch(updatePromoCode({
        id: editingPromoCode.id,
        ...promoCodeData
      }));
    } else {
      dispatch(addPromoCode(promoCodeData as Omit<PromoCode, "id" | "usedCount">));
    }

    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Codes Promo</CardTitle>
            <CardDescription>Créez et gérez vos codes promotionnels</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Nouveau Code Promo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingPromoCode ? 'Modifier le Code Promo' : 'Nouveau Code Promo'}</DialogTitle>
                <DialogDescription>
                  {editingPromoCode 
                    ? 'Modifiez les détails de votre code promo.' 
                    : 'Créez un nouveau code promo pour vos clients.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="code" className="text-right">Code</Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      className="col-span-3"
                      placeholder="SUMMER10"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="discountType" className="text-right">Type de Réduction</Label>
                    <select
                      id="discountType"
                      value={discountType}
                      onChange={(e) => setDiscountType(e.target.value as PromoCode['discountType'])}
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="percentage">Pourcentage</option>
                      <option value="fixed">Montant fixe</option>
                      <option value="freeShipping">Livraison gratuite</option>
                    </select>
                  </div>
                  {discountType !== 'freeShipping' && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="discountValue" className="text-right">Valeur</Label>
                      <div className="col-span-3 flex items-center">
                        <Input
                          id="discountValue"
                          type="number"
                          value={discountValue}
                          onChange={(e) => setDiscountValue(Number(e.target.value))}
                          min="0"
                          step={discountType === 'percentage' ? '1' : '0.01'}
                          required
                        />
                        <span className="ml-2">{discountType === 'percentage' ? '%' :  currencySymbol}</span>
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="minPurchase" className="text-right">Achat Minimum</Label>
                    <div className="col-span-3 flex items-center">
                      <Input
                        id="minPurchase"
                        type="number"
                        value={minPurchase}
                        onChange={(e) => setMinPurchase(Number(e.target.value))}
                        min="0"
                        step="0.01"
                      />
                      <span className="ml-2"> {currencySymbol}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Date de début</Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, 'PPP') : <span>Choisir une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Date de fin</Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, 'PPP') : <span>Choisir une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="limitedUses" className="text-right">Utilisation limitée</Label>
                    <div className="col-span-3 flex items-center">
                      <Switch
                        id="limitedUses"
                        checked={limitedUses}
                        onCheckedChange={setLimitedUses}
                      />
                    </div>
                  </div>
                  {limitedUses && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="maxUses" className="text-right">Nombre max d'utilisations</Label>
                      <Input
                        id="maxUses"
                        type="number"
                        value={maxUses}
                        onChange={(e) => setMaxUses(Number(e.target.value))}
                        className="col-span-3"
                        min="1"
                        required={limitedUses}
                      />
                    </div>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="applicableProducts" className="text-right">Produits Applicables</Label>
                    <Input
                      id="applicableProducts"
                      value={applicableProducts}
                      onChange={(e) => setApplicableProducts(e.target.value)}
                      className="col-span-3"
                      placeholder="all (ou liste d'IDs séparés par des virgules)"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="applicableCategories" className="text-right">Catégories Applicables</Label>
                    <Input
                      id="applicableCategories"
                      value={applicableCategories}
                      onChange={(e) => setApplicableCategories(e.target.value)}
                      className="col-span-3"
                      placeholder="all (ou liste de catégories séparées par des virgules)"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingPromoCode ? 'Mettre à jour' : 'Créer'}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {promoCodes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun code promo n'a été créé. Cliquez sur "Nouveau Code Promo" pour commencer.
            </div>
          ) : (
            promoCodes.map((promoCode) => (
              <div key={promoCode.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={promoCode.active ? 'default' : 'secondary'}>
                      {promoCode.active ? 'Actif' : 'Inactif'}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {promoCode.discountType === 'percentage' && <Percent className="h-3.5 w-3.5" />}
                      {promoCode.discountType === 'fixed' && <Tag className="h-3.5 w-3.5" />}
                      {promoCode.discountType === 'freeShipping' && <Package className="h-3.5 w-3.5" />}
                      {promoCode.discountType === 'percentage' && `${promoCode.discountValue}% de réduction`}
                      {promoCode.discountType === 'fixed' && `${promoCode.discountValue} {currencySymbol} de réduction`}
                      {promoCode.discountType === 'freeShipping' && 'Livraison gratuite'}
                    </Badge>
                  </div>
                  <h3 className="font-medium">{promoCode.code}</h3>
                  <div className="text-sm text-gray-500">
                    {promoCode.minPurchase > 0 && (
                      <div className="mt-1">
                        <span className="font-medium">Achat minimum:</span> {promoCode.minPurchase} {currencySymbol}
                      </div>
                    )}
                    <div className="mt-1">
                      <span className="font-medium">Période:</span> {format(new Date(promoCode.startDate), 'dd/MM/yyyy')} - {format(new Date(promoCode.endDate), 'dd/MM/yyyy')}
                    </div>
                    {promoCode.limitedUses && (
                      <div className="mt-1">
                        <span className="font-medium">Utilisations:</span> {promoCode.usedCount} / {promoCode.maxUses}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(promoCode)}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Modifier
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(promoCode.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Supprimer
                  </Button>
                  <Button 
                    variant={promoCode.active ? "secondary" : "outline"} 
                    size="sm" 
                    onClick={() => handleToggleStatus(promoCode.id)}
                  >
                    {promoCode.active ? 'Désactiver' : 'Activer'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionSection;
