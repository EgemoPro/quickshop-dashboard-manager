import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductImage } from "@/store/slices/productsSlice";
import ImageUploader from "@/components/products/ImageUploader";
import CategorySelect from "@/components/products/CategorySelect";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tag, ImageIcon, Info, Box, Globe } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSelector } from "@/store/hooks";

interface ProductFormProps {
  formState: {
    name: string;
    price: string;
    stock: number;
    category: string;
    images: ProductImage[];
    description?: string;
    availabilityZone: string;
  };
  setFormState: React.Dispatch<React.SetStateAction<{
    name: string;
    price: string;
    stock: number;
    category: string;
    images: ProductImage[];
    description?: string;
    availabilityZone: string;
  }>>;
  currencySymbol: string;
  onImagesChange: (images: ProductImage[]) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formState,
  setFormState,
  currencySymbol,
  onImagesChange
}) => {
  const { availabilityZones } = useAppSelector((state) => state.products);

  return (
    <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-4">
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span>Informations</span>
          </TabsTrigger>
          <TabsTrigger value="options" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Options</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            <span>Inventaire</span>
          </TabsTrigger>
          <TabsTrigger value="images" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>Images</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="mt-0 space-y-6">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium mb-1.5 block">
                Nom du produit
              </Label>
              <Input
                id="name"
                placeholder="Ex: T-shirt Premium"
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
                className="border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-gray-700 font-medium mb-1.5 block">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre produit..."
                value={formState.description || ""}
                onChange={(e) => setFormState({...formState, description: e.target.value})}
                className="min-h-[100px] border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
            
            <div>
              <Label htmlFor="price" className="text-gray-700 font-medium mb-1.5 block">
                Prix ({currencySymbol})
              </Label>
              <div className="relative">
                <Input
                  id="price"
                  type="number"
                  placeholder="Ex: 29.99"
                  value={formState.price}
                  onChange={(e) => setFormState({...formState, price: e.target.value})}
                  className="border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                  {currencySymbol}
                </div>
              </div>
            </div>
            
            <div>
              <CategorySelect 
                selectedCategory={formState.category} 
                onCategoryChange={(category) => setFormState({...formState, category})}
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="options" className="mt-0 space-y-6">
          <div>
            <Label htmlFor="availabilityZone" className="text-gray-700 font-medium mb-1.5 block">
              Zone de disponibilité
            </Label>
            <Select 
              value={formState.availabilityZone} 
              onValueChange={(value) => setFormState({...formState, availabilityZone: value})}
            >
              <SelectTrigger className="w-full border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary">
                <SelectValue placeholder="Choisissez une zone de disponibilité" />
              </SelectTrigger>
              <SelectContent>
                {availabilityZones.map((zone) => (
                  <SelectItem key={zone.id} value={zone.id}>
                    {zone.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 mt-1">
              Sélectionnez la zone où ce produit sera disponible à la vente
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-0 space-y-6">
          <div>
            <Label htmlFor="stock" className="text-gray-700 font-medium mb-1.5 block">
              Stock disponible
            </Label>
            <Input
              id="stock"
              type="number"
              placeholder="Ex: 100"
              value={formState.stock}
              onChange={(e) => setFormState({...formState, stock: parseInt(e.target.value) || 0})}
              className="border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <h4 className="font-medium text-amber-700 flex items-center gap-1.5 mb-1">
              <Info className="h-4 w-4" />
              Gestion des stocks
            </h4>
            <p className="text-sm text-amber-600">
              Un produit avec moins de 10 unités en stock sera marqué comme "Stock faible". 
              Un produit avec 0 unité sera marqué comme "Rupture".
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="images" className="mt-0">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-700 font-medium mb-1.5 block">
                Images du produit
              </Label>
              <ImageUploader 
                images={formState.images}
                onImagesChange={onImagesChange}
              />
            </div>
            
            {formState.images.length === 0 && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-sm">
                <p className="text-blue-700">
                  Ajoutez au moins une image pour mettre en valeur votre produit. 
                  La première image sera utilisée comme image principale.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductForm;
