
import React, { ReactNode } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface ProfileSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  description,
  children
}) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
