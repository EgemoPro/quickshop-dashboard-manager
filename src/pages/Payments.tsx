
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/hooks/use-currency";
import { DollarSign, CreditCard, Wallet, RefreshCcw, Plus, ExternalLink } from "lucide-react";

const Payments = () => {
  const { paymentMethods, transactions } = useAppSelector(state => state.payment);
  const { formatCurrency } = useCurrency();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paiements</h1>
          <p className="text-muted-foreground">Gérez vos moyens de paiement et consultez l'historique des transactions</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solde du compte</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(2750.80)}</div>
            <p className="text-xs text-muted-foreground">
              +{formatCurrency(450)} ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions en attente</CardTitle>
            <RefreshCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(125.50)}</div>
            <p className="text-xs text-muted-foreground">
              3 transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moyens de paiement</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentMethods.length}</div>
            <p className="text-xs text-muted-foreground">
              Cartes et comptes bancaires
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payment-methods" className="w-full">
        <TabsList>
          <TabsTrigger value="payment-methods">Moyens de paiement</TabsTrigger>
          <TabsTrigger value="transactions">Historique des transactions</TabsTrigger>
          <TabsTrigger value="settings">Paramètres de paiement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment-methods" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold tracking-tight">Moyens de paiement enregistrés</h2>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Ajouter</Button>
          </div>
          
          {paymentMethods.map((method) => (
            <Card key={method.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? (
                      <CreditCard className="h-8 w-8 text-primary" />
                    ) : (
                      <Wallet className="h-8 w-8 text-primary" />
                    )}
                    <div>
                      <CardTitle>{method.name}</CardTitle>
                      <CardDescription>
                        {method.type === 'card' 
                          ? `**** **** **** ${method.lastFourDigits}` 
                          : method.accountNumber}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={method.isDefault ? "default" : "outline"}>
                    {method.isDefault ? "Par défaut" : "Secondaire"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-muted-foreground">Expire le</p>
                    <p>{method.expiryDate || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ajouté le</p>
                    <p>{new Date(method.addedOn).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Statut</p>
                    <p className="text-green-600 font-medium">{method.status}</p>
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="flex justify-end gap-2 p-3">
                <Button variant="outline" size="sm">Modifier</Button>
                <Button variant="destructive" size="sm">Supprimer</Button>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Moyen de paiement</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Montant</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Statut</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {transactions.map((transaction) => (
                    <tr 
                      key={transaction.id} 
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                    >
                      <td className="p-4 align-middle">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle font-medium">
                        {transaction.description}
                      </td>
                      <td className="p-4 align-middle">
                        {transaction.paymentMethod}
                      </td>
                      <td className="p-4 align-middle">
                        <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                          {transaction.type === 'credit' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge variant={
                          transaction.status === 'completed' ? 'default' : 
                          transaction.status === 'pending' ? 'outline' : 
                          'destructive'
                        }>
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="icon">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de paiement</CardTitle>
              <CardDescription>Configurez vos préférences de paiement et de facturation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-medium">Devise préférée</h3>
                <p className="text-sm text-muted-foreground">Euro (€)</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium">Cycle de facturation</h3>
                <p className="text-sm text-muted-foreground">Mensuel, le 1er de chaque mois</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium">Notifications de paiement</h3>
                <p className="text-sm text-muted-foreground">Activées pour tous les mouvements</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Modifier les paramètres</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
