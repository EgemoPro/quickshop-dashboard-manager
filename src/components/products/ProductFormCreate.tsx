
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
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer un nouveau produit</h1>
        <p className="text-gray-600">Remplissez les informations détaillées de votre produit</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Informations générales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sku">SKU (optionnel)</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="Ex: TSHIRT-001"
                />
              </div>
              <div>
                <Label htmlFor="name">Nom du produit *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: T-shirt Premium"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Décrivez votre produit en détail..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marque</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Ex: Nike"
                />
              </div>
              <div>
                <CategorySelect 
                  selectedCategory={formData.category} 
                  onCategoryChange={(category) => setFormData(prev => ({ ...prev, category }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prix et stock */}
        <Card>
          <CardHeader>
            <CardTitle>Prix et inventaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Prix ({currencySymbol}) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="29.99"
                  required
                />
              </div>
              <div>
                <Label htmlFor="originalPrice">Prix original ({currencySymbol})</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: e.target.value }))}
                  placeholder="39.99"
                />
              </div>
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) || 0 }))}
                  placeholder="100"
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

        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline">
            Annuler
          </Button>
          <Button type="submit">
            Créer le produit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormCreate;
