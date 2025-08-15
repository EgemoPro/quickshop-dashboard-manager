import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Plus, 
  ImageIcon, 
  Package, 
  Palette, 
  Tag, 
  Ruler, 
  ChevronLeft, 
  ChevronRight,
  Euro,
  Warehouse,
  Info
} from "lucide-react";
import { ProductImage, ProductSize } from "@/types/productSlicesTypes";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "./ImageUploader";
import CategorySelect from "./CategorySelect";

interface MultiStepProductFormProps {
  onSubmit: (product: any) => void;
  currencySymbol: string;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  fields: string[];
}

const steps: Step[] = [
  {
    id: 1,
    title: "Informations générales",
    description: "Nom, description et catégorie du produit",
    icon: <Info className="h-5 w-5" />,
    fields: ['name', 'description', 'category']
  },
  {
    id: 2,
    title: "Prix et inventaire",
    description: "Définissez vos prix et stock",
    icon: <Euro className="h-5 w-5" />,
    fields: ['price', 'stock']
  },
  {
    id: 3,
    title: "Caractéristiques",
    description: "Tags, couleurs et tailles",
    icon: <Package className="h-5 w-5" />,
    fields: []
  },
  {
    id: 4,
    title: "Images",
    description: "Ajoutez des photos de votre produit",
    icon: <ImageIcon className="h-5 w-5" />,
    fields: []
  }
];

const MultiStepProductForm: React.FC<MultiStepProductFormProps> = ({ onSubmit, currencySymbol }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
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

  const validateStep = (stepId: number) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return true;

    for (const field of step.fields) {
      if (field === 'name' && !formData.name.trim()) return false;
      if (field === 'description' && !formData.description.trim()) return false;
      if (field === 'price' && (!formData.price || parseFloat(formData.price) <= 0)) return false;
    }
    return true;
  };

  const canProceed = () => validateStep(currentStep);

  const nextStep = () => {
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (!canProceed()) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires pour continuer.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep(1) || !validateStep(2)) {
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
    setCurrentStep(1);

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

  const progress = (currentStep / steps.length) * 100;

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const transition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 },
    scale: { duration: 0.2 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3">
            Créer un nouveau produit
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Donnez vie à votre produit en {steps.length} étapes simples
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  animate={{
                    backgroundColor: currentStep >= step.id ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    color: currentStep >= step.id ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 border-primary/20 mb-2"
                >
                  {step.icon}
                </motion.div>
                <span className="text-xs text-center font-medium max-w-20">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="mb-8"
          >
            {currentStep === 1 && (
              <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Info className="h-5 w-5 text-primary" />
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
            )}

            {currentStep === 2 && (
              <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Euro className="h-5 w-5 text-emerald-600" />
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dimensions">Dimensions globales</Label>
                      <Input
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                        placeholder="Ex: 30x20x5 cm"
                        className="border-muted-foreground/20 focus:border-emerald-500/50 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Poids</Label>
                      <Input
                        id="weight"
                        value={formData.weight}
                        onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                        placeholder="Ex: 250g"
                        className="border-muted-foreground/20 focus:border-emerald-500/50 transition-all duration-200"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Tags */}
                <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Tag className="h-5 w-5 text-purple-600" />
                      </div>
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Ajouter un tag"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="border-muted-foreground/20 focus:border-purple-500/50 transition-all duration-200"
                      />
                      <Button type="button" onClick={addTag} variant="outline">
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
                <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Palette className="h-5 w-5 text-blue-600" />
                      </div>
                      Couleurs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="w-20 border-muted-foreground/20 focus:border-blue-500/50"
                      />
                      <Button type="button" onClick={addColor} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.colors.map((color) => (
                        <div key={color} className="flex items-center gap-1 p-2 border rounded-lg border-muted-foreground/20">
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
                <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 rounded-t-lg">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        <Ruler className="h-5 w-5 text-orange-600" />
                      </div>
                      Tailles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <Input
                        value={newSize.name}
                        onChange={(e) => setNewSize(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Taille (ex: M, XL)"
                        className="border-muted-foreground/20 focus:border-orange-500/50 transition-all duration-200"
                      />
                      <Input
                        value={newSize.dimensions}
                        onChange={(e) => setNewSize(prev => ({ ...prev, dimensions: e.target.value }))}
                        placeholder="Dimensions (optionnel)"
                        className="border-muted-foreground/20 focus:border-orange-500/50 transition-all duration-200"
                      />
                      <Button type="button" onClick={addSize} variant="outline">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.sizes.map((size, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded-lg border-muted-foreground/20">
                          <div>
                            <span className="font-medium">{size.name}</span>
                            {size.dimensions && <span className="text-sm text-muted-foreground ml-2">({size.dimensions})</span>}
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
              </div>
            )}

            {currentStep === 4 && (
              <Card className="border-0 shadow-xl bg-card/60 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <ImageIcon className="h-5 w-5 text-green-600" />
                    </div>
                    Images du produit
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
                    <p className="text-sm text-muted-foreground text-center">
                      Cette étape est optionnelle. Vous pouvez créer votre produit sans images et les ajouter plus tard.
                    </p>
                  </div>
                  <ImageUploader 
                    images={formData.images}
                    onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
                  />
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>

          <div className="flex gap-2">
            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Package className="h-4 w-4" />
                Créer le produit
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MultiStepProductForm;