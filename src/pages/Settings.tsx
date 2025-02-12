
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Store,
  Mail,
  Bell,
  CreditCard,
  Languages,
  Shield
} from "lucide-react";

const Settings = () => {
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
              <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-gray-600 mt-1">Gérez les paramètres de votre boutique</p>
            </div>
          </div>
        </header>

        <div className="grid gap-8">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Store className="h-6 w-6 text-gray-500" />
              <h2 className="text-xl font-semibold">Informations de la boutique</h2>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="store-name">Nom de la boutique</Label>
                <Input id="store-name" placeholder="Ma Super Boutique" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-description">Description</Label>
                <Input id="store-description" placeholder="Une description de votre boutique" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-address">Adresse</Label>
                <Input id="store-address" placeholder="123 Rue du Commerce" />
              </div>
            </div>
          </Card>

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
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Alertes de stock</Label>
                  <p className="text-sm text-gray-500">Être notifié quand le stock est faible</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <CreditCard className="h-6 w-6 text-gray-500" />
                <h2 className="text-xl font-semibold">Paiement</h2>
              </div>
              <Button variant="outline" className="w-full">
                Configurer les moyens de paiement
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-6 w-6 text-gray-500" />
                <h2 className="text-xl font-semibold">Sécurité</h2>
              </div>
              <Button variant="outline" className="w-full">
                Gérer les paramètres de sécurité
              </Button>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
