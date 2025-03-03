
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/store/hooks";
import { useCurrency } from "@/hooks/use-currency";
import { DollarSign, CreditCard, Wallet, RefreshCcw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaymentStatsCard from "@/components/payments/PaymentStatsCard";
import PaymentMethodCard, { PaymentMethod } from "@/components/payments/PaymentMethodCard";
import TransactionsTable, { Transaction } from "@/components/payments/TransactionsTable";
import PaymentSettingsCard from "@/components/payments/PaymentSettingsCard";

const Payments = () => {
  const { transactions, paymentAccounts } = useAppSelector(state => state.payment);
  const { formatCurrency } = useCurrency();
  const [activeTab, setActiveTab] = useState("payment-methods");

  // Transform paymentAccounts to PaymentMethod type for UI
  const paymentMethods: PaymentMethod[] = paymentAccounts.map(account => ({
    id: account.id,
    name: account.name,
    type: account.type === 'bank' ? 'bank' : 'card',
    accountNumber: account.accountDetails.accountNumber || undefined,
    lastFourDigits: account.type === 'paypal' ? undefined : '3456',
    expiryDate: account.type === 'bank' ? undefined : '12/25',
    addedOn: account.lastUpdated,
    status: account.status,
    isDefault: account.id === paymentAccounts[0].id // First one is default for now
  }));

  // Transform transactions for UI
  const displayTransactions: Transaction[] = transactions.map(transaction => ({
    ...transaction,
    type: transaction.status === 'refunded' || transaction.status === 'partially_refunded' 
      ? 'debit' 
      : 'credit',
  }));

  const handleEditPaymentMethod = (id: string) => {
    console.log("Edit payment method:", id);
  };

  const handleDeletePaymentMethod = (id: string) => {
    console.log("Delete payment method:", id);
  };

  const handleViewTransactionDetails = (id: string) => {
    console.log("View transaction details:", id);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paiements</h1>
          <p className="text-muted-foreground">Gérez vos moyens de paiement et consultez l'historique des transactions</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <PaymentStatsCard
          title="Solde du compte"
          value={2750.80}
          description={`+${formatCurrency(450)} ce mois`}
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          type="currency"
        />
        <PaymentStatsCard
          title="Transactions en attente"
          value={125.50}
          description="3 transactions"
          icon={<RefreshCcw className="h-4 w-4 text-muted-foreground" />}
          type="currency"
        />
        <PaymentStatsCard
          title="Moyens de paiement"
          value={paymentMethods.length}
          description="Cartes et comptes bancaires"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Tabs defaultValue="payment-methods" className="w-full" value={activeTab} onValueChange={setActiveTab}>
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
          
          <div className="grid gap-4 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <PaymentMethodCard 
                key={method.id}
                method={method}
                onEdit={handleEditPaymentMethod}
                onDelete={handleDeletePaymentMethod}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <TransactionsTable 
            transactions={displayTransactions} 
            onViewDetails={handleViewTransactionDetails} 
          />
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <PaymentSettingsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
