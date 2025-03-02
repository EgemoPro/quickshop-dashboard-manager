
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useCurrency } from "@/hooks/use-currency";

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded" | "partially_refunded";
  paymentMethod: string;
  paymentId: string;
  createdAt: string;
  updatedAt: string;
  customerInfo: {
    name: string;
    email: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  refunds: Array<{
    id: string;
    amount: number;
    reason: string;
    createdAt: string;
    status: "pending" | "completed" | "failed";
  }>;
  // Custom fields for UI display only
  description?: string;
  type?: 'credit' | 'debit';
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onViewDetails: (id: string) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onViewDetails }) => {
  const { formatCurrency } = useCurrency();

  return (
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
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 align-middle font-medium">
                  {transaction.orderId ? `Commande #${transaction.orderId}` : 'Transaction'}
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
                  <Button variant="ghost" size="icon" onClick={() => onViewDetails(transaction.id)}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;
