import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, AlertTriangle, Image as ImageIcon, Pencil } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addProduct, deleteProduct, updateProduct, setLoading } from "@/store/slices/productsSlice";
import { type Product, ProductImage } from "../types/productSlicesTypes"
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "@/components/products/ProductCard";
import ProductForm from "@/components/products/ProductForm";
import ProductFilters from "@/components/products/ProductFilters";
import EmptyState from "@/components/products/EmptyState";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface TabsType {
  name: string;
  path: string;
}

const Products = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { lowStockProducts, isLoading } = useAppSelector((state) => state.products);
  const { currencySymbol } = useAppSelector((state) => state.settings);
  console.log(lowStockProducts)
  // Local state for UI
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [tabsPath, setTabsPath] = useState<TabsType>({
    name: "Liste",
    path: "/list"
  })
  // Form state for adding/editing products
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    stock: 0,
    category: "Vêtements",
    images: [] as ProductImage[],
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
      description: formState.description,
      availabilityZone: formState.availabilityZone,
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
      price: product.price.replace(currencySymbol, '').trim(),
      stock: product.stock,
      category: product.category,
      images: product.images || [],
      description: product.description || "",
      availabilityZone: product.availabilityZone,
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

        <header className="mb-5">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Produits {">"} {tabsPath.name}</h1>
              <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90 shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>

          <ProductFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
        </header>

        <Tabs defaultValue="list"  >
          <TabsList className="mb-5">
            <TabsTrigger value="list" >
              Liste
            </TabsTrigger>

            <TabsTrigger value="new" >
              Créer
            </TabsTrigger>
          </TabsList>

          <Card className="p-6 relative shadow-md border-none overflow-hidden">
            <TabsContent value="list" >

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
                  <EmptyState onAddProduct={() => setIsAddModalOpen(true)} />
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="new">

            </TabsContent>
          </Card>


        </Tabs>




        {/* Add Product Modal */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white rounded-xl">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Ajouter un produit
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Remplissez les informations du nouveau produit ci-dessous.
              </DialogDescription>
            </DialogHeader>

            <ProductForm
              formState={formState}
              setFormState={setFormState}
              currencySymbol={currencySymbol}
              onImagesChange={handleImagesChange}
            />

            <DialogFooter className="px-6 py-4 bg-gray-50 border-t">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleAddProduct} className="gap-1">
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Product Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white rounded-xl">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Pencil className="h-5 w-5 text-blue-500" />
                Modifier le produit
              </DialogTitle>
              <DialogDescription className="text-gray-500">
                Modifiez les informations du produit ci-dessous.
              </DialogDescription>
            </DialogHeader>

            <ProductForm
              formState={formState}
              setFormState={setFormState}
              currencySymbol={currencySymbol}
              onImagesChange={handleImagesChange}
            />

            <DialogFooter className="px-6 py-4 bg-gray-50 border-t">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" onClick={handleEditProduct} className="gap-1 bg-blue-500 hover:bg-blue-600">
                <Pencil className="h-4 w-4" />
                Mettre à jour
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
