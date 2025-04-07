
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
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
  Clock,
  User,
  Package,
  CreditCard
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateOrderStatus, type Order } from "@/store/slices/ordersSlice";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  const { currencySymbol } = useAppSelector(state => state.settings);

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
    
    setViewOrderDetails(false);
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
    switch (status) {
      case "Livrée": return "default";
      case "En cours": return "secondary";
      case "En attente": return "outline";
      case "Annulée": return "destructive";
      default: return "outline";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Livrée": return "bg-green-50";
      case "En cours": return "bg-orange-50";
      case "En attente": return "bg-blue-50";
      case "Annulée": return "bg-red-50";
      default: return "bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(isMobile ? "px-2 w-full" : "container px-4", "mx-auto py-8")}
      >
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-white pb-0">
            <div className="flex justify-between items-center flex-wrap gap-4 border-b pb-6">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                  Commandes
                </CardTitle>
                <p className="text-gray-600 mt-1">Gérez vos commandes en cours</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => null} className="border-gray-200 hover:bg-gray-100">
                  <Filter className="h-4 w-4 mr-2 text-gray-500" />
                  Filtrer
                </Button>
                <Button variant="outline" onClick={exportOrders} className="border-gray-200 hover:bg-gray-100">
                  <Download className="h-4 w-4 mr-2 text-gray-500" />
                  Exporter
                </Button>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une commande..."
                  className="pl-10 border-gray-200 focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-200 focus:border-primary">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
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
                <SelectTrigger className="border-gray-200 focus:border-primary">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Trier par date" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Plus récent d'abord</SelectItem>
                  <SelectItem value="oldest">Plus ancien d'abord</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="bg-white">
                {filteredOrders.length > 0 ? (
                  <div className="hidden md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commande</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Produits</TableHead>
                          <TableHead>Montant</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow 
                            key={order.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setSelectedOrder(order);
                              setViewOrderDetails(true);
                            }}
                          >
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.products}</TableCell>
                            <TableCell className="font-medium">{order.amount} {currencySymbol}</TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusVariant(order.status) as "default" | "secondary" | "outline" | "destructive"}
                                className="flex items-center gap-1 w-fit"
                              >
                                {statusIcons[order.status as keyof typeof statusIcons]}
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedOrder(order);
                                  setViewOrderDetails(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mb-4 opacity-30" />
                    <p>Aucune commande trouvée</p>
                    <p className="text-sm mt-2">Essayez de modifier vos filtres</p>
                  </div>
                )}

                {/* Mobile view */}
                <div className="md:hidden">
                  <ScrollArea className="h-[550px]">
                    <div className="divide-y">
                      {filteredOrders.map((order) => (
                        <div
                          key={order.id}
                          className={cn(
                            "px-4 py-3 hover:bg-gray-50", 
                            getStatusBgColor(order.status)
                          )}
                          onClick={() => {
                            setSelectedOrder(order);
                            setViewOrderDetails(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="rounded-full bg-primary/10 p-2 mr-3">
                                <ShoppingCart className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{order.id}</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                  <User className="h-3 w-3 mr-1" />
                                  {order.customer}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge
                                variant={getStatusVariant(order.status) as "default" | "secondary" | "outline" | "destructive"}
                                className="flex items-center gap-1 mb-1"
                              >
                                {statusIcons[order.status as keyof typeof statusIcons]}
                                {order.status}
                              </Badge>
                              <p className="text-sm font-medium">{order.amount} {currencySymbol}</p>
                            </div>
                          </div>

                          <div className="mt-2 flex justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {order.date}
                            </div>
                            <div className="flex items-center">
                              <Package className="h-3 w-3 mr-1" />
                              {order.products} produits
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details Dialog */}
        {selectedOrder && (
          <Dialog open={viewOrderDetails} onOpenChange={setViewOrderDetails}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Commande {selectedOrder.id}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Client:</span>
                    <span>{selectedOrder.customer}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Date:</span>
                    <span>{selectedOrder.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Montant:</span>
                    <span>{selectedOrder.amount} {currencySymbol}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Produits:</span>
                    <span>{selectedOrder.products}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    Statut actuel
                  </h4>
                  <Badge
                    variant={getStatusVariant(selectedOrder.status) as "default" | "secondary" | "outline" | "destructive"}
                    className="flex items-center gap-1 w-fit"
                  >
                    {statusIcons[selectedOrder.status as keyof typeof statusIcons]}
                    {selectedOrder.status}
                  </Badge>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Changer le statut</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={selectedOrder.status === "En attente" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "En attente")}
                      className="justify-start"
                    >
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      En attente
                    </Button>
                    <Button
                      variant={selectedOrder.status === "En cours" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "En cours")}
                      className="justify-start"
                    >
                      <Clock className="h-4 w-4 mr-2 text-orange-500" />
                      En cours
                    </Button>
                    <Button
                      variant={selectedOrder.status === "Livrée" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "Livrée")}
                      className="justify-start"
                    >
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      Livrée
                    </Button>
                    <Button
                      variant={selectedOrder.status === "Annulée" ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(selectedOrder.id, "Annulée")}
                      className="justify-start"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Annulée
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button onClick={() => setViewOrderDetails(false)} className="w-full sm:w-auto">
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
