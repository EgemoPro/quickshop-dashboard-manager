import React, { useState, useMemo } from 'react';
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
  Info,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { ProductImage, ProductSize } from "@/types/productSlicesTypes";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "./ImageUploader";
import CategorySelect from "./CategorySelect";
import FormFieldError from "./FormFieldError";

interface MultiStepProductFormProps {
  onSubmit: (product: any) => void;
  currencySymbol: string;
  isLoading?: boolean;
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

const MultiStepProductForm: React.FC<MultiStepProductFormProps> = ({ onSubmit, currencySymbol, isLoading = false }) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Validation errors computed from form data
  const errors = useMemo(() => {
    const errs: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errs.name = "Le nom du produit est requis";
    }
    if (!formData.description.trim()) {
      errs.description = "La description est requise";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errs.price = "Le prix doit être supérieur à 0";
    }
    
    return errs;
  }, [formData.name, formData.description, formData.price]);

  // Get error for a field only if it has been touched
  const getFieldError = (field: string) => {
    return touchedFields.has(field) ? errors[field] : undefined;
  };

  // Mark a field as touched when user interacts with it
  const handleFieldBlur = (field: string) => {
    setTouchedFields(prev => new Set(prev).add(field));
  };

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
    // Mark all fields in current step as touched when trying to proceed
    const currentStepData = steps.find(s => s.id === currentStep);
    if (currentStepData) {
      const newTouched = new Set(touchedFields);
      currentStepData.fields.forEach(field => newTouched.add(field));
      setTouchedFields(newTouched);
    }
    
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

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate upload progress for images
      if (formData.images.length > 0) {
        for (let i = 0; i <= 100; i += 10) {
          setUploadProgress(i);
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      const product = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        sku: formData.sku || `SKU-${Date.now()}`
      };

      await onSubmit(product);
      
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
      setUploadProgress(0);

      toast({
        title: "Produit créé",
        description: "Le produit a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du produit.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl mb-6 shadow-lg border border-primary/20"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Package className="h-10 w-10 text-primary" />
          </motion.div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent mb-4">
            Créer un nouveau produit
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Donnez vie à votre produit en {steps.length} étapes fluides et intuitives
          </p>
        </motion.div>

        {/* Modern Stepper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-12"
        >
          {/* Stepper Container */}
          <div className="relative bg-card/60 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-xl">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl" />
            
            {/* Steps Row */}
            <div className="relative flex items-start justify-between">
              {steps.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;
                const isClickable = step.id < currentStep || (step.id <= currentStep);
                
                return (
                  <React.Fragment key={step.id}>
                    {/* Step Item */}
                    <div className="flex flex-col items-center relative z-10 flex-1">
                      {/* Step Circle */}
                      <motion.button
                        type="button"
                        onClick={() => {
                          if (step.id < currentStep) {
                            setCurrentStep(step.id);
                          } else if (step.id === currentStep + 1 && validateStep(currentStep)) {
                            setCurrentStep(step.id);
                          }
                        }}
                        disabled={step.id > currentStep + 1}
                        className={`relative group ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                        whileHover={isClickable ? { scale: 1.08 } : {}}
                        whileTap={isClickable ? { scale: 0.95 } : {}}
                      >
                        {/* Outer Ring Animation */}
                        <motion.div
                          className={`absolute -inset-2 rounded-full ${
                            isCurrent ? 'bg-primary/20' : 'bg-transparent'
                          }`}
                          animate={{
                            scale: isCurrent ? [1, 1.2, 1] : 1,
                            opacity: isCurrent ? [0.5, 0.2, 0.5] : 0
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Main Circle */}
                        <motion.div
                          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                            isCompleted 
                              ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30' 
                              : isCurrent
                                ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/40'
                                : 'bg-muted/80 border-2 border-border/50'
                          }`}
                          initial={false}
                          animate={{
                            boxShadow: isCurrent 
                              ? '0 8px 32px hsl(var(--primary)/0.4), 0 0 0 4px hsl(var(--primary)/0.1)' 
                              : isCompleted
                                ? '0 8px 24px rgba(16, 185, 129, 0.3)'
                                : '0 2px 8px hsl(var(--muted)/0.3)'
                          }}
                        >
                          <AnimatePresence mode="wait">
                            {isCompleted ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              >
                                <CheckCircle className="h-7 w-7 text-white" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="icon"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`${isCurrent ? 'text-primary-foreground' : 'text-muted-foreground'}`}
                              >
                                {React.cloneElement(step.icon as React.ReactElement, { 
                                  className: 'h-6 w-6' 
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Hover Glow */}
                          {isClickable && (
                            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          )}
                        </motion.div>
                        
                        {/* Step Number Badge */}
                        <motion.div
                          className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-emerald-400 text-white shadow-md'
                              : isCurrent
                                ? 'bg-primary text-primary-foreground shadow-md'
                                : 'bg-muted-foreground/20 text-muted-foreground'
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {step.id}
                        </motion.div>
                      </motion.button>
                      
                      {/* Step Info */}
                      <motion.div 
                        className="mt-4 text-center max-w-[120px]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        <motion.span 
                          className={`block text-sm font-semibold transition-colors duration-300 ${
                            isCompleted 
                              ? 'text-emerald-600' 
                              : isCurrent 
                                ? 'text-primary' 
                                : 'text-muted-foreground'
                          }`}
                        >
                          {step.title}
                        </motion.span>
                        <span className={`text-xs mt-1 block transition-colors duration-300 ${
                          isCurrent ? 'text-muted-foreground' : 'text-muted-foreground/60'
                        }`}>
                          {step.description}
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="flex-shrink-0 relative mt-8 mx-2">
                        <div className="w-full min-w-[40px] lg:min-w-[80px] h-1 bg-muted/50 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${
                              isCompleted 
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                                : 'bg-gradient-to-r from-primary to-primary/60'
                            }`}
                            initial={{ width: "0%" }}
                            animate={{ 
                              width: isCompleted ? "100%" : isCurrent ? "50%" : "0%" 
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                        
                        {/* Animated Dots on Line */}
                        {isCurrent && (
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                            animate={{ 
                              x: [0, 40, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            
            {/* Progress Bar */}
            <motion.div 
              className="mt-8 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">Progression</span>
                <motion.span 
                  className="text-sm font-bold text-primary"
                  key={progress}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
              <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary to-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: [-80, 400] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
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
              <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-md overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <CardHeader className="relative bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-b border-primary/20">
                  <CardTitle className="flex items-center gap-4 text-2xl font-bold">
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Info className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div>
                      <div className="text-primary">Informations générales</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Les détails essentiels de votre produit
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative space-y-8 p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="sku" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        SKU (optionnel)
                      </Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        placeholder="Ex: TSHIRT-001"
                        className="h-12 border-2 border-muted/50 focus:border-primary/70 rounded-xl transition-all duration-300 hover:border-primary/50"
                      />
                    </motion.div>
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="name" className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        Nom du produit <span className="text-destructive font-bold">*</span>
                      </Label>
                      <FormFieldError error={getFieldError('name')}>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          onBlur={() => handleFieldBlur('name')}
                          placeholder="Ex: T-shirt Premium"
                          className={`h-12 border-2 rounded-xl transition-all duration-300 pr-10 ${
                            getFieldError('name') 
                              ? 'border-destructive/70 focus:border-destructive hover:border-destructive/50' 
                              : 'border-muted/50 focus:border-primary/70 hover:border-primary/50'
                          }`}
                        />
                      </FormFieldError>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-foreground/80">
                      Description <span className="text-destructive">*</span>
                    </Label>
                    <FormFieldError error={getFieldError('description')}>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        onBlur={() => handleFieldBlur('description')}
                        placeholder="Décrivez votre produit en détail, ses caractéristiques, ses avantages..."
                        className={`min-h-[120px] transition-all duration-200 resize-none pr-10 ${
                          getFieldError('description') 
                            ? 'border-destructive/70 focus:border-destructive' 
                            : 'border-muted-foreground/20 focus:border-primary/50'
                        }`}
                      />
                    </FormFieldError>
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
                      <FormFieldError error={getFieldError('price')}>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10">
                            {currencySymbol}
                          </span>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                            onBlur={() => handleFieldBlur('price')}
                            placeholder="29.99"
                            className={`pl-8 pr-10 transition-all duration-200 ${
                              getFieldError('price') 
                                ? 'border-destructive/70 focus:border-destructive' 
                                : 'border-muted-foreground/20 focus:border-emerald-500/50'
                            }`}
                          />
                        </div>
                      </FormFieldError>
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
              <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-md overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <CardHeader className="relative bg-gradient-to-r from-emerald-500/15 via-emerald-500/10 to-emerald-500/5 border-b border-emerald-500/20">
                  <CardTitle className="flex items-center gap-4 text-2xl font-bold">
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 rounded-xl shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ImageIcon className="h-6 w-6 text-emerald-600" />
                    </motion.div>
                    <div>
                      <div className="text-emerald-700">Images du produit</div>
                      <div className="text-sm text-muted-foreground font-normal">
                        Ajoutez des photos attractives (optionnel)
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative p-8 space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-gradient-to-r from-emerald-50/50 to-emerald-100/30 rounded-xl border border-emerald-200/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Info className="h-5 w-5 text-emerald-600" />
                      </div>
                      <span className="font-semibold text-emerald-800">Étape optionnelle</span>
                    </div>
                    <p className="text-sm text-emerald-700/80 leading-relaxed">
                      Cette étape est optionnelle. Vous pouvez créer votre produit sans images et les ajouter plus tard depuis la gestion des produits.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <ImageUploader 
                      images={formData.images}
                      onImagesChange={(images) => setFormData(prev => ({ ...prev, images }))}
                    />
                  </motion.div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Upload Progress */}
        {isSubmitting && formData.images.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="h-5 w-5 text-primary" />
              </motion.div>
              <span className="text-sm font-medium text-primary">
                Upload des images en cours...
              </span>
            </div>
            <div className="relative h-2 bg-primary/20 rounded-full overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-primary/80"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-xs text-primary/80 mt-2 text-right">
              {uploadProgress}%
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg"
        >
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            className="flex items-center gap-3 h-12 px-6 border-2 hover:border-primary/50 transition-all duration-300 disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Précédent</span>
          </Button>

          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Étape {currentStep} sur {steps.length}
            </div>
            
            {currentStep < steps.length ? (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed() || isSubmitting}
                  className="flex items-center gap-3 h-12 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-40"
                >
                  <span className="font-semibold">Suivant</span>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-3 h-12 px-8 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-40"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="h-5 w-5" />
                      </motion.div>
                      <span className="font-semibold">Création en cours...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Créer le produit</span>
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MultiStepProductForm;