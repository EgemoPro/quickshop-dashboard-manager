
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/hooks/use-currency";

interface PaymentStatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  type?: 'currency' | 'number';
}

const PaymentStatsCard: React.FC<PaymentStatsCardProps> = ({ 
  title, 
  value, 
  description, 
  icon,
  type = 'number'
}) => {
  const { formatCurrency } = useCurrency();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {type === 'currency' ? formatCurrency(value) : value}
        </div>
        <p className="text-xs text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentStatsCard;
