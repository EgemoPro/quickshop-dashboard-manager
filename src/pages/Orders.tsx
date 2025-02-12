
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ShoppingCart,
  Filter,
  Download,
  Eye
} from "lucide-react";

const orders = [
  {
    id: "#1234",
    client: "Jean Dupont",
    date: "2024-02-20",
    montant: "89,99 €",
    statut: "En cours",
    produits: ["T-shirt Premium", "Jeans Classique"]
  },
  {
    id: "#1235",
    client: "Marie Martin",
    date: "2024-02-19",
    montant: "129,99 €",
    statut: "Expédié",
    produits: ["Veste d'Hiver"]
  },
  {
    id: "#1236",
    client: "Pierre Durand",
    date: "2024-02-18",
    montant: "59,99 €",
    statut: "En attente",
    produits: ["Sac à Main", "Chaussures de Sport"]
  }
];

const Orders = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
              <p className="text-gray-600 mt-1">Gérez vos commandes en cours</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </header>

        <Card className="p-6">
          <ScrollArea className="h-[600px]">
            <div className="grid gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{order.id}</h3>
                          <Badge variant="outline">{order.date}</Badge>
                        </div>
                        <p className="text-sm text-gray-500">{order.client}</p>
                        <p className="text-sm text-gray-500">
                          {order.produits.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">{order.montant}</p>
                        <Badge
                          variant={
                            order.statut === "Expédié"
                              ? "default"
                              : order.statut === "En cours"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.statut}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </motion.div>
    </div>
  );
};

export default Orders;
