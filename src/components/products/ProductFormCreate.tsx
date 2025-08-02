
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, ImageIcon, Package, Palette, Tag, Ruler } from "lucide-react";
import { ProductImage, ProductSize } from "@/types/productSlicesTypes";
import { useToast } from "@/components/ui/use-toast";
import ImageUploader from "./ImageUploader";
import CategorySelect from "./CategorySelect";

interface ProductFormCreateProps {
  onSubmit: (product: any) => void;
  currencySymbol: string;
}

const ProductFormCreate: React.FC<ProductFormCreateProps> = ({ onSubmit, currencySymbol }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    brand: '',
    price: '',
    stock: 0,
    originalPrice: '',
    category: 'Vêtements',
    tags: [] as string[],
    available: true,
    colors: [] as string[],
    sizes: [] as ProductSize[],
    dimensions: '',
    weight: '',
    images: [] as ProductImage[],
    availabilityZone: 'everywhere'
  });

  const [newTag, setNewTag] = useState('');
  const [newColor, setNewColor] = useState('#000000');
  const [newSize, setNewSize] = useState({ name: '', dimensions: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const formDataToSubmit = new FormData()

    if (!formData.name || !formData.description || !formData.price) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const product = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      sku: formData.sku || `SKU-${Date.now()}`
    };

    onSubmit(product);
    
    // Reset form
    setFormData({
      sku: '',
      name: '',
      description: '',
      brand: '',
      price: '',
      stock: 0,
      originalPrice: '',
      category: 'Vêtements',
      tags: [],
      available: true,
      colors: [],
      sizes: [],
      dimensions: '',
      weight: '',
      images: [],
      availabilityZone: 'everywhere'
    });

    toast({
      title: "Produit créé",
      description: "Le produit a été créé avec succès.",
    });
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addColor = () => {
    if (!formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }));
    }
  };

  const removeColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(c => c !== color)
    }));
  };

  const addSize = () => {
    if (newSize.name.trim()) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize]
      }));
      setNewSize({ name: '', dimensions: '' });
    }
  };

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3">
            Créer un nouveau produit
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Donnez vie à votre produit en remplissant toutes les informations nécessaires pour une présentation professionnelle
          </p>
        </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations générales */}
        <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="h-5 w-5 text-primary" />
              </div>
              Informations générales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium text-foreground/80">SKU (optionnel)</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Ex: TSHIRT-001"
                  className="border-muted-foreground/20 focus:border-primary/50 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground/80">
                  Nom du produit <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: T-shirt Premium"
                  className="border-muted-foreground/20 focus:border-primary/50 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-foreground/80">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Décrivez votre produit en détail, ses caractéristiques, ses avantages..."
                className="min-h-[120px] border-muted-foreground/20 focus:border-primary/50 transition-all duration-200 resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="brand" className="text-sm font-medium text-foreground/80">Marque</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Ex: Nike"
                  className="border-muted-foreground/20 focus:border-primary/50 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Catégorie</Label>
                <CategorySelect 
                  selectedCategory={formData.category} 
                  onCategoryChange={(category) => setFormData(prev => ({ ...prev, category }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prix et stock */}
        <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Package className="h-5 w-5 text-emerald-600" />
              </div>
              Prix et inventaire
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-foreground/80">
                  Prix ({currencySymbol}) <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {currencySymbol}
                  </span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="29.99"
                    className="pl-8 border-muted-foreground/20 focus:border-emerald-500/50 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice" className="text-sm font-medium text-foreground/80">Prix original ({currencySymbol})</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    {currencySymbol}
                  </span>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                    placeholder="39.99"
                    className="pl-8 border-muted-foreground/20 focus:border-emerald-500/50 transition-all duration-200"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-sm font-medium text-foreground/80">Stock disponible</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                  placeholder="100"
                  className="border-muted-foreground/20 focus:border-emerald-500/50 transition-all duration-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Images du produit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUploader 
              images={formData.images}
              onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ajouter un tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Couleurs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Couleurs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-20"
              />
              <Button type="button" onClick={addColor}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((color) => (
                <div key={color} className="flex items-center gap-1 p-2 border rounded">
                  <div 
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm">{color}</span>
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeColor(color)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tailles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Tailles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                value={newSize.name}
                onChange={(e) => setNewSize(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Taille (ex: M, XL)"
              />
              <Input
                value={newSize.dimensions}
                onChange={(e) => setNewSize(prev => ({ ...prev, dimensions: e.target.value }))}
                placeholder="Dimensions (optionnel)"
              />
              <Button type="button" onClick={addSize}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <span className="font-medium">{size.name}</span>
                    {size.dimensions && <span className="text-sm text-gray-500 ml-2">({size.dimensions})</span>}
                  </div>
                  <X 
                    className="h-4 w-4 cursor-pointer" 
                    onClick={() => removeSize(index)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dimensions et poids */}
        <Card>
          <CardHeader>
            <CardTitle>Dimensions et poids</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dimensions">Dimensions globales</Label>
                <Input
                  id="dimensions"
                  value={formData.dimensions}
                  onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                  placeholder="Ex: 30x20x5 cm"
                />
              </div>
              <div>
                <Label htmlFor="weight">Poids</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="Ex: 250g"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border/50">
          <Button 
            type="button" 
            variant="outline"
            className="px-8 py-3 border-2 hover:bg-muted/50 transition-all duration-200"
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Package className="h-4 w-4 mr-2" />
            Créer le produit
          </Button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormCreate;
