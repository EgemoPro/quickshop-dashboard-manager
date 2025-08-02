
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProduct, deleteProduct, updateProduct } from "@/store/slices/productsSlice";
import { type Product } from "@/types/productSlicesTypes";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/products/ProductCard";
import ProductForm from "@/components/products/ProductForm";
import ProductFormCreate from "@/components/products/ProductFormCreate";
import ProductFilters from "@/components/products/ProductFilters";
import EmptyState from "@/components/products/EmptyState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet,SheetTrigger, SheetTitle,SheetContent,SheetHeader,SheetFooter,SheetDescription,SheetPortal,SheetOverlay,SheetClose } from "@/components/ui/sheet";
import { useCurrency } from "@/hooks/use-currency";


const Products = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { lowStockProducts, isLoading } = useAppSelector((state) => state.products);
  const {user} = useAppSelector(state=> state.auth)
  const { currencySymbol } = useCurrency()

  // Local state for UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState("list");

  // Form state for editing products
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    stock: 0,
    category: "Vêtements",
    images: [],
    description: "",
    availabilityZone: "everywhere",
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

  // Handle creating a new product
  const handleCreateProduct = async (newProductData: any) => {
    const formData = new FormData();

    const newProduct: Product = {
      storeId: user.id,
      available: true,
      ...newProductData
    };
    
    for(let element in newProduct){
      if(element === "images"){
        for(let img in newProduct[element]){
          formData.append("images", newProduct[element][img]?.file)
          // console.log()
        }
      }
      formData.append(element, JSON.stringify(newProduct[element]));
    }
    console.log(formData)
    try {
      dispatch(addProduct(formData));
      setActiveTab("list");
  
      toast({
        title: "Produit ajouté",
        description: `${newProduct.name} a été ajouté avec succès.`,
      });
      
    } catch (error) {
      console.log(error)
      toast({
        title: "Erreur",
        description:"Echec l'or de l'ajout du produit"
      })
    }
  };

  // Handle editing a product
  const handleEditProduct = () => {
    if (!currentProduct) return;

    const updatedProduct: Product = {
      ...currentProduct,
      name: formState.name,
      price: parseFloat(formState.price),
      stock: formState.stock,
      category: formState.category,
      images: formState.images,
      description: formState.description,
      availabilityZone: formState.availabilityZone,
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
      price: product.price.toString(),
      stock: product.stock,
      category: product.category,
      images: product.images || [],
      description: product.description || "",
      availabilityZone: product.availabilityZone || "everywhere",
    });
    setIsEditModalOpen(true);
  };

  // Handle image changes
  const handleImagesChange = (images: any[]) => {
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
      description: "",
      availabilityZone: "everywhere",
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
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="font-medium">Chargement...</span>
            </div>
          </div>
        )}

        <header className="mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Produits</h1>
              <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
            </div>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="list">Liste des produits</TabsTrigger>
            <TabsTrigger value="create">Créer un produit</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            <ProductFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />

            <Card className="p-6 shadow-md border-none overflow-hidden">
              <ScrollArea className="h-[600px] pr-4">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        getProductStatus={getProductStatus}
                        currencySymbol={currencySymbol}
                        onEdit={openEditModal}
                        onDelete={(id) => {
                          setProductToDelete(id);
                          setShowDeleteDialog(true);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState onAddProduct={() => setActiveTab("create")} />
                )}
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <ProductFormCreate 
              onSubmit={handleCreateProduct}
              currencySymbol={currencySymbol}
            />
          </TabsContent>
        </Tabs>

        {/* Edit Product Modal */}
        <Sheet open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <SheetContent className="sm:max-w-[650px] p-2 bg-white rounded-l-md">
            <SheetHeader className="px-6 pt-6 pb-2">
              <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-500" />
                Modifier le produit
              </SheetTitle>
              <SheetDescription className="text-gray-500">
                Modifiez les informations du produit ci-dessous.
              </SheetDescription>
            </SheetHeader>

            <ProductForm
              formState={formState}
              setFormState={setFormState}
              currencySymbol={currencySymbol}
              onImagesChange={handleImagesChange}
            />

            <SheetFooter className="px-6 py-4 bg-gray-50 border-t">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleEditProduct} className="gap-1 bg-blue-500 hover:bg-blue-600">
                <Pencil className="h-4 w-4" />
                Mettre à jour
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden bg-white rounded-xl">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="flex items-center gap-2 text-red-500 font-bold text-xl">
                <AlertTriangle className="h-5 w-5" />
                Confirmer la suppression
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 py-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100 text-sm text-red-600">
                Cette action supprimera définitivement le produit de votre catalogue. Les données supprimées ne pourront pas être récupérées.
              </div>
            </div>
            <DialogFooter className="px-6 py-4 bg-gray-50 border-t">
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
