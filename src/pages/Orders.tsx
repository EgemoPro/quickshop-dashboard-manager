
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  ShoppingCart,
  Filter,
  Download,
  Eye,
  Search,
  Calendar,
  Check,
  X,
  Clock
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrderStatus, type Order } from "@/store/slices/ordersSlice";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const statusIcons = {
  "Livrée": <Check className="h-4 w-4 text-green-500" />,
  "En cours": <Clock className="h-4 w-4 text-orange-500" />,
  "En attente": <Clock className="h-4 w-4 text-blue-500" />,
  "Annulée": <X className="h-4 w-4 text-red-500" />
};

const Orders = () => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { recentOrders, isLoading } = useAppSelector(state => state.orders);
  
  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewOrderDetails, setViewOrderDetails] = useState(false);
  
  // Filter and sort orders
  const filteredOrders = recentOrders
    .filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           order.customer.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (statusFilter === "all") return matchesSearch;
      return matchesSearch && order.status === statusFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (sortOrder === "newest") {
        return dateB.getTime() - dateA.getTime();
      } else {
        return dateA.getTime() - dateB.getTime();
      }
    });
  
  // Handle changing order status
  const handleStatusChange = (orderId: string, status: "Livrée" | "En cours" | "En attente" | "Annulée") => {
    dispatch(updateOrderStatus({ id: orderId, status }));
    
    toast({
      title: "Statut mis à jour",
      description: `La commande ${orderId} a été mise à jour en "${status}".`,
    });
  };
  
  // Export orders as CSV
  const exportOrders = () => {
    const headers = ["ID", "Client", "Date", "Montant", "Statut", "Produits"];
    const csvRows = [headers.join(",")];
    
    recentOrders.forEach(order => {
      const row = [
        order.id,
        order.customer,
        order.date,
        order.amount,
        order.status,
        order.products
      ];
      csvRows.push(row.join(","));
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export réussi",
      description: "Les commandes ont été exportées avec succès au format CSV.",
    });
  };
  
  // Status badge variant
  const getStatusVariant = (status: string) => {
    switch(status) {
      case "Livrée": return "default";
      case "En cours": return "secondary";
      case "En attente": return "outline";
      case "Annulée": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(isMobile ? "px-0 w-full" : "container px-4" ,"mx-auto py-8")}
      >
        <header className="mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
              <p className="text-gray-600 mt-1">Gérez vos commandes en cours</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => null}>
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline" onClick={exportOrders}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher une commande..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tous les statuts" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Livrée">Livrée</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Trier par date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récent d'abord</SelectItem>
                <SelectItem value="oldest">Plus ancien d'abord</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <Card className={cn(isMobile ? "" : "" , "p-6")}>
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ScrollArea className="h-[600px]">
              {filteredOrders.length > 0 ? (
                <div className="grid gap-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <ShoppingCart className="h-8 w-8 text-gray-400" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{order.id}</h3>
                              <Badge variant="outline">{order.date}</Badge>
                            </div>
                            <p className="text-sm text-gray-500">{order.customer}</p>
                            <p className="text-sm text-gray-500">
                              {order.products} produits
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{order.amount}</p>
                            <Badge
                              variant={getStatusVariant(order.status) as "default" | "secondary" | "outline" | "destructive"}
                              className="flex items-center gap-1"
                            >
                              {statusIcons[order.status as keyof typeof statusIcons]}
                              {order.status}
                            </Badge>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              setSelectedOrder(order);
                              setViewOrderDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mb-4 opacity-30" />
                  <p>Aucune commande trouvée</p>
                  <p className="text-sm mt-2">Essayez de modifier vos filtres</p>
                </div>
              )}
            </ScrollArea>
          )}
        </Card>
        
        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={viewOrderDetails} onOpenChange={setViewOrderDetails}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Détails de la commande {selectedOrder.id}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-medium">Client</div>
                  <div>{selectedOrder.customer}</div>
                  
                  <div className="font-medium">Date</div>
                  <div>{selectedOrder.date}</div>
                  
                  <div className="font-medium">Montant</div>
                  <div>{selectedOrder.amount}</div>
                  
                  <div className="font-medium">Produits</div>
                  <div>{selectedOrder.products}</div>
                  
                  <div className="font-medium">Statut actuel</div>
                  <div>
                    <Badge
                      variant={getStatusVariant(selectedOrder.status) as "default" | "secondary" | "outline" | "destructive"}
                      className="flex items-center gap-1"
                    >
                      {statusIcons[selectedOrder.status as keyof typeof statusIcons]}
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Changer le statut</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedOrder.status === "En attente" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "En attente")}
                    >
                      En attente
                    </Button>
                    <Button 
                      variant={selectedOrder.status === "En cours" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "En cours")}
                    >
                      En cours
                    </Button>
                    <Button 
                      variant={selectedOrder.status === "Livrée" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "Livrée")}
                    >
                      Livrée
                    </Button>
                    <Button 
                      variant={selectedOrder.status === "Annulée" ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "Annulée")}
                    >
                      Annulée
                    </Button>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={() => setViewOrderDetails(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </div>
  );
};

export default Orders;
