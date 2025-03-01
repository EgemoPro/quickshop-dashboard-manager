
import React from "react";
import { Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

interface NotificationsCardProps {
  notifications: {
    emailNotifications: boolean;
    stockAlerts: boolean;
    orderUpdates: boolean;
    marketingEmails: boolean;
  };
  onToggle: (field: string) => void;
}

const NotificationsCard = ({ notifications, onToggle }: NotificationsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Bell className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Notifications par email</Label>
            <p className="text-sm text-gray-500">Recevoir des notifications pour les nouvelles commandes</p>
          </div>
          <Switch
            checked={notifications.emailNotifications}
            onCheckedChange={() => onToggle("emailNotifications")}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Alertes de stock</Label>
            <p className="text-sm text-gray-500">Être notifié quand le stock est faible</p>
          </div>
          <Switch
            checked={notifications.stockAlerts}
            onCheckedChange={() => onToggle("stockAlerts")}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Mises à jour des commandes</Label>
            <p className="text-sm text-gray-500">Recevoir des notifications lors des changements de statut</p>
          </div>
          <Switch
            checked={notifications.orderUpdates}
            onCheckedChange={() => onToggle("orderUpdates")}
          />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Emails marketing</Label>
            <p className="text-sm text-gray-500">Recevoir des emails promotionnels</p>
          </div>
          <Switch
            checked={notifications.marketingEmails}
            onCheckedChange={() => onToggle("marketingEmails")}
          />
        </div>
      </div>
    </Card>
  );
};

export default NotificationsCard;
