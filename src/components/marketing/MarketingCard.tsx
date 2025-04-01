
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MarketingCardProps = {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

const MarketingCard = ({ title, icon, children }: MarketingCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {icon && icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default MarketingCard;
