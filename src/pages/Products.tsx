
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package2, Plus, Edit, Trash2, Search, Filter, AlertTriangle, Image as ImageIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProduct, deleteProduct, updateProduct, setLoading, type Product, ProductImage } from "@/store/slices/productsSlice";
import { useToast } from "@/components/ui/use-toast";
import ImageUploader from "@/components/products/ImageUploader";
import CategorySelect from "@/components/products/CategorySelect";

const Products = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { lowStockProducts, isLoading } = useAppSelector((state) => state.products);
  const { currencySymbol } = useAppSelector((state) => state.settings);
  
  // Local state for UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  
  // Form state for adding/editing products
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    stock: 0,
    category: "Vêtements",
    images: [] as ProductImage[],
  });

  // Filter products based on search and status
  const filteredProducts = lowStockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === "all") return matchesSearch;
    if (filterStatus === "instock") return matchesSearch && product.stock > 10;
    if (filterStatus === "lowstock") return matchesSearch && product.stock <= 10 && product.stock > 0;
    if (filterStatus === "outofstock") return matchesSearch && product.stock === 0;
    return matchesSearch;
  });

  // Generate status text and variant based on stock
  const getProductStatus = (stock: number) => {
    if (stock > 10) return { text: "En stock", variant: "default" as const };
    if (stock > 0) return { text: "Stock faible", variant: "secondary" as const };
    return { text: "Rupture", variant: "destructive" as const };
  };

  // Handle adding a new product
  const handleAddProduct = () => {
    const priceWithSymbol = formState.price.includes(currencySymbol) 
      ? formState.price 
      : `${formState.price} ${currencySymbol}`;
      
    const newProduct: Product = {
      id: `PRD-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
      name: formState.name,
      price: priceWithSymbol,
      stock: formState.stock,
      category: formState.category,
      images: formState.images,
    };
    
    dispatch(addProduct(newProduct));
    setIsAddModalOpen(false);
    resetForm();
    
    toast({
      title: "Produit ajouté",
      description: `${newProduct.name} a été ajouté avec succès.`,
    });
  };

  // Handle editing a product
  const handleEditProduct = () => {
    if (!currentProduct) return;
    
    const priceValue = formState.price.replace(currencySymbol, '').trim();
    const priceWithSymbol = `${priceValue} ${currencySymbol}`;
    
    const updatedProduct: Product = {
      ...currentProduct,
      name: formState.name,
      price: priceWithSymbol,
      stock: formState.stock,
      category: formState.category,
      images: formState.images,
    };
    
    dispatch(updateProduct(updatedProduct));
    setIsEditModalOpen(false);
    resetForm();
    
    toast({
      title: "Produit mis à jour",
      description: `${updatedProduct.name} a été mis à jour avec succès.`,
    });
  };

  // Handle deleting a product
  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    
    dispatch(deleteProduct(productToDelete));
    setShowDeleteDialog(false);
    setProductToDelete(null);
    
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé avec succès.",
      variant: "destructive",
    });
  };

  // Open edit modal with product data
  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setFormState({
      name: product.name,
      price: product.price.replace(currencySymbol, '').trim(),
      stock: product.stock,
      category: product.category,
      images: product.images || [],
    });
    setIsEditModalOpen(true);
  };

  // Handle image changes
  const handleImagesChange = (images: ProductImage[]) => {
    setFormState({
      ...formState,
      images,
    });
  };

  // Reset form state
  const resetForm = () => {
    setFormState({
      name: "",
      price: "",
      stock: 0,
      category: "Vêtements",
      images: [],
    });
    setCurrentProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
              <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tous les statuts" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="instock">En stock</SelectItem>
                <SelectItem value="lowstock">Stock faible</SelectItem>
                <SelectItem value="outofstock">Rupture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <Card className="p-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span>Chargement...</span>
              </div>
            </div>
          )}
          
          <ScrollArea className="h-[600px]">
            {filteredProducts.length > 0 ? (
              <div className="grid gap-4">
                {filteredProducts.map((product) => {
                  const status = getProductStatus(product.stock);
                  return (
                    <div
                      key={product.id}
                      className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0].url} 
                              alt={product.name}
                              className="h-12 w-12 object-cover rounded"
                            />
                          ) : (
                            <Package2 className="h-8 w-8 text-gray-400" />
                          )}
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-500">Prix: {product.price}</p>
                            <p className="text-sm text-gray-500">Catégorie: {product.category}</p>
                            <div className="flex items-center mt-1">
                              {product.images && product.images.length > 0 && (
                                <span className="text-xs text-gray-400 flex items-center">
                                  <ImageIcon className="h-3 w-3 mr-1" /> 
                                  {product.images.length} image{product.images.length > 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-end">
                            <Badge variant={status.variant}>
                              {status.text}
                            </Badge>
                            <span className="text-sm text-gray-500 mt-1">
                              Stock: {product.stock} unités
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditModal(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setProductToDelete(product.id);
                                setShowDeleteDialog(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                <Package2 className="h-12 w-12 mb-4 opacity-30" />
                <p>Aucun produit trouvé</p>
                <p className="text-sm mt-2">Essayez de modifier vos filtres ou d'ajouter de nouveaux produits</p>
              </div>
            )}
          </ScrollArea>
        </Card>

        {/* Add Product Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Ajouter un produit</DialogTitle>
              <DialogDescription>
                Remplissez les informations du nouveau produit ci-dessous.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-medium">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right font-medium">
                    Prix ({currencySymbol})
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    value={formState.price}
                    onChange={(e) => setFormState({...formState, price: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stock" className="text-right font-medium">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formState.stock}
                    onChange={(e) => setFormState({...formState, stock: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right font-medium">
                    Catégorie
                  </div>
                  <div className="col-span-3">
                    <CategorySelect 
                      selectedCategory={formState.category} 
                      onCategoryChange={(category) => setFormState({...formState, category})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">Images</Label>
                <ImageUploader 
                  images={formState.images}
                  onImagesChange={handleImagesChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleAddProduct}>
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Modifier le produit</DialogTitle>
              <DialogDescription>
                Modifiez les informations du produit ci-dessous.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right font-medium">
                    Nom
                  </Label>
                  <Input
                    id="edit-name"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-price" className="text-right font-medium">
                    Prix ({currencySymbol})
                  </Label>
                  <Input
                    id="edit-price"
                    value={formState.price}
                    onChange={(e) => setFormState({...formState, price: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-stock" className="text-right font-medium">
                    Stock
                  </Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={formState.stock}
                    onChange={(e) => setFormState({...formState, stock: parseInt(e.target.value) || 0})}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="text-right font-medium">
                    Catégorie
                  </div>
                  <div className="col-span-3">
                    <CategorySelect 
                      selectedCategory={formState.category} 
                      onCategoryChange={(category) => setFormState({...formState, category})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="font-medium">Images</Label>
                <ImageUploader 
                  images={formState.images}
                  onImagesChange={handleImagesChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleEditProduct}>
                Mettre à jour
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Confirmer la suppression
              </DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDeleteProduct}>
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Products;
