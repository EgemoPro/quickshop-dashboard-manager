
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/hooks/use-currency";
import { Package, Truck, MapPin, Clock, Plus, ExternalLink, CalendarClock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Shipping = () => {
  const { shipments, carriers, shippingRates } = useAppSelector(state => state.shipping);
  const { formatCurrency } = useCurrency();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expéditions</h1>
          <p className="text-muted-foreground">Gérez vos transporteurs, suivez vos colis et configurez les options d'expédition</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expéditions en cours</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.filter(s => s.status === 'in_transit').length}</div>
            <p className="text-xs text-muted-foreground">
              Sur {shipments.length} expéditions totales
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Livraisons prévues aujourd'hui</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.filter(s => s.status === 'out_for_delivery').length}</div>
            <p className="text-xs text-muted-foreground">
              En attente de livraison
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transporteurs actifs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carriers.length}</div>
            <p className="text-xs text-muted-foreground">
              Partenaires de livraison
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="shipments" className="w-full">
        <TabsList>
          <TabsTrigger value="shipments">Expéditions</TabsTrigger>
          <TabsTrigger value="carriers">Transporteurs</TabsTrigger>
          <TabsTrigger value="rates">Tarifs d'expédition</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shipments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Suivi des expéditions</h2>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Nouvelle expédition</Button>
          </div>
          
          {shipments.map((shipment) => (
            <Card key={shipment.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Package className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Expédition #{shipment.trackingNumber}</CardTitle>
                      <CardDescription>
                        Commande #{shipment.orderNumber} - {new Date(shipment.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={
                    shipment.status === 'delivered' ? 'default' : 
                    shipment.status === 'in_transit' ? 'secondary' : 
                    shipment.status === 'out_for_delivery' ? 'outline' :
                    'destructive'
                  }>
                    {shipment.status === 'delivered' ? 'Livré' :
                     shipment.status === 'in_transit' ? 'En transit' :
                     shipment.status === 'out_for_delivery' ? 'En cours de livraison' :
                     shipment.status === 'pending' ? 'En attente' : 
                     'Problème'
                    }
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start gap-2">
                    <Truck className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Transporteur</p>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={shipment.carrierLogo} alt={shipment.carrier} />
                          <AvatarFallback>{shipment.carrier.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium">{shipment.carrier}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Destination</p>
                      <p className="font-medium">{shipment.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Livraison estimée</p>
                      <p className="font-medium">{shipment.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                {shipment.lastUpdate && (
                  <div className="mt-4 p-3 bg-muted rounded-md text-sm">
                    <p className="font-medium">Dernière mise à jour</p>
                    <p className="text-muted-foreground">{shipment.lastUpdate}</p>
                  </div>
                )}
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-end gap-2 p-3">
                <Button variant="outline" size="sm">Détails</Button>
                <Button size="sm">Suivre le colis</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="carriers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Transporteurs partenaires</h2>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Ajouter un transporteur</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {carriers.map((carrier) => (
              <Card key={carrier.id}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarImage src={carrier.logo} alt={carrier.name} />
                    <AvatarFallback>{carrier.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{carrier.name}</CardTitle>
                    <CardDescription>{carrier.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Délai moyen</p>
                      <p className="font-medium">{carrier.averageDeliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Prix moyen</p>
                      <p className="font-medium">{formatCurrency(carrier.averagePrice)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant={carrier.active ? "default" : "outline"} className="mt-1">
                        {carrier.active ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expéditions</p>
                      <p className="font-medium">{carrier.shipmentsCount} ce mois</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Configurer</Button>
                  <Button variant="secondary" size="sm">Voir les détails</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="rates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Tarifs d'expédition</h2>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Ajouter un tarif</Button>
          </div>
          
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Nom</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Zone</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Délai</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Prix</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Statut</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {shippingRates.map((rate) => (
                    <tr 
                      key={rate.id} 
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle font-medium">
                        {rate.name}
                      </td>
                      <td className="p-4 align-middle">
                        {rate.zone}
                      </td>
                      <td className="p-4 align-middle">
                        {rate.deliveryTime}
                      </td>
                      <td className="p-4 align-middle">
                        {formatCurrency(rate.price)}
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={rate.active ? "default" : "outline"}>
                          {rate.active ? "Actif" : "Inactif"}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Shipping;
