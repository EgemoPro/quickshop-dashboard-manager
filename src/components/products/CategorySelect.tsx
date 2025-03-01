
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addCategory } from '@/store/slices/productsSlice';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface CategorySelectProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ selectedCategory, onCategoryChange }) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.products);
  const { toast } = useToast();
  
  const [newCategory, setNewCategory] = useState('');
  const [open, setOpen] = useState(false);
  
  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      toast({
        title: "Catégorie invalide",
        description: "Veuillez entrer un nom de catégorie valide.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      toast({
        title: "Catégorie existante",
        description: "Cette catégorie existe déjà.",
        variant: "destructive",
      });
      return;
    }
    
    const newCategoryObj = {
      id: Math.random().toString(36).substring(2, 9),
      name: newCategory
    };
    
    dispatch(addCategory(newCategoryObj));
    onCategoryChange(newCategory);
    setNewCategory('');
    setOpen(false);
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${newCategory}" a été ajoutée avec succès.`,
    });
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="category">Catégorie</Label>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center text-xs">
              <Plus className="h-3 w-3 mr-1" /> Nouvelle catégorie
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter une catégorie</DialogTitle>
              <DialogDescription>
                Créez une nouvelle catégorie pour vos produits.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-category" className="text-right">
                  Nom
                </Label>
                <Input
                  id="new-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-3"
                  placeholder="Ex: Accessoires"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCategory}>Ajouter</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger id="category">
          <SelectValue placeholder="Sélectionnez une catégorie" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategorySelect;
