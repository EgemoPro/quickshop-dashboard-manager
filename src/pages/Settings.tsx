
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Store,
  Mail,
  Bell,
  CreditCard,
  Languages,
  Shield,
  Save,
  Planet,
  Smartphone,
  Palette,
  FileText,
  LockKeyhole
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Type for settings
interface StoreSettings {
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
  currency: string;
  language: string;
  theme: string;
  notifications: {
    emailNotifications: boolean;
    stockAlerts: boolean;
    orderUpdates: boolean;
    marketingEmails: boolean;
  };
  privacySettings: {
    cookieConsent: string;
    dataSharing: boolean;
    analytics: boolean;
  };
}

const Settings = () => {
  const { toast } = useToast();
  
  // Initial settings state
  const [settings, setSettings] = useState<StoreSettings>({
    storeName: "Ma Super Boutique",
    storeDescription: "Une boutique en ligne proposant des produits de qualité",
    storeAddress: "123 Rue du Commerce, 75001 Paris",
    storeEmail: "contact@masuperboutique.com",
    storePhone: "+33 1 23 45 67 89",
    currency: "EUR",
    language: "fr",
    theme: "light",
    notifications: {
      emailNotifications: true,
      stockAlerts: true,
      orderUpdates: true,
      marketingEmails: false,
    },
    privacySettings: {
      cookieConsent: "essential",
      dataSharing: false,
      analytics: true,
    }
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // UI states
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  
  // Handle input changes
  const handleInputChange = (field: keyof Omit<StoreSettings, "notifications" | "privacySettings">, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };
  
  // Handle notification toggle
  const handleNotificationToggle = (field: keyof StoreSettings["notifications"]) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [field]: !settings.notifications[field]
      }
    });
  };
  
  // Handle privacy settings change
  const handlePrivacyChange = (field: keyof StoreSettings["privacySettings"], value: any) => {
    setSettings({
      ...settings,
      privacySettings: {
        ...settings.privacySettings,
        [field]: value
      }
    });
  };
  
  // Handle save settings
  const handleSaveSettings = () => {
    setSaveLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaveLoading(false);
      
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres de votre boutique ont été mis à jour avec succès.",
      });
    }, 1000);
  };
  
  // Handle password change
  const handlePasswordChange = () => {
    setPasswordError("");
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    
    // Simulate password change
    setTimeout(() => {
      setShowPasswordDialog(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      toast({
        title: "Mot de passe modifié",
        description: "Votre mot de passe a été modifié avec succès.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <header className="mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
              <p className="text-gray-600 mt-1">Gérez les paramètres de votre boutique</p>
            </div>
            <Button onClick={handleSaveSettings} disabled={saveLoading}>
              {saveLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
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
                <Input 
                  id="store-name" 
                  value={settings.storeName} 
                  onChange={(e) => handleInputChange("storeName", e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-description">Description</Label>
                <Textarea 
                  id="store-description" 
                  value={settings.storeDescription}
                  onChange={(e) => handleInputChange("storeDescription", e.target.value)}
                  rows={3} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-address">Adresse</Label>
                <Input 
                  id="store-address" 
                  value={settings.storeAddress}
                  onChange={(e) => handleInputChange("storeAddress", e.target.value)}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="store-email">Email</Label>
                  <Input 
                    id="store-email" 
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleInputChange("storeEmail", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-phone">Téléphone</Label>
                  <Input 
                    id="store-phone" 
                    value={settings.storePhone}
                    onChange={(e) => handleInputChange("storePhone", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Alertes de stock</Label>
                    <p className="text-sm text-gray-500">Être notifié quand le stock est faible</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.stockAlerts}
                    onCheckedChange={() => handleNotificationToggle("stockAlerts")}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mises à jour des commandes</Label>
                    <p className="text-sm text-gray-500">Recevoir des notifications lors des changements de statut</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.orderUpdates}
                    onCheckedChange={() => handleNotificationToggle("orderUpdates")}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emails marketing</Label>
                    <p className="text-sm text-gray-500">Recevoir des emails promotionnels</p>
                  </div>
                  <Switch 
                    checked={settings.notifications.marketingEmails}
                    onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Planet className="h-6 w-6 text-gray-500" />
                <h2 className="text-xl font-semibold">Paramètres régionaux</h2>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => handleInputChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionnez une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => handleInputChange("currency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Sélectionnez une devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">Dollar US ($)</SelectItem>
                      <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                      <SelectItem value="CAD">Dollar Canadien (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleInputChange("theme", value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Sélectionnez un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Shield className="h-6 w-6 text-gray-500" />
                <h2 className="text-xl font-semibold">Sécurité</h2>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Gérez les paramètres de sécurité de votre boutique.</p>
                
                <div className="grid gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowPasswordDialog(true)}
                  >
                    <LockKeyhole className="h-4 w-4 mr-2" />
                    Changer le mot de passe
                  </Button>
                </div>
                
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Activer l'authentification à deux facteurs
                  </Button>
                </div>
                
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Consulter le journal d'activité
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <CreditCard className="h-6 w-6 text-gray-500" />
                <h2 className="text-xl font-semibold">Paiement</h2>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Configurez les méthodes de paiement acceptées par votre boutique.</p>
                
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Configurer les moyens de paiement
                  </Button>
                </div>
                
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Modèles d'emails de facturation
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Palette className="h-6 w-6 text-gray-500" />
              <h2 className="text-xl font-semibold">Confidentialité</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Consentement aux cookies</Label>
                <RadioGroup 
                  value={settings.privacySettings.cookieConsent}
                  onValueChange={(value) => handlePrivacyChange("cookieConsent", value)}
                  className="grid gap-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="essential" id="essential" />
                    <Label htmlFor="essential" className="cursor-pointer">Cookies essentiels uniquement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="functional" id="functional" />
                    <Label htmlFor="functional" className="cursor-pointer">Cookies fonctionnels</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all" className="cursor-pointer">Tous les cookies</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Partage de données</Label>
                    <p className="text-sm text-gray-500">Autoriser le partage de données avec nos partenaires</p>
                  </div>
                  <Switch 
                    checked={settings.privacySettings.dataSharing}
                    onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytiques</Label>
                    <p className="text-sm text-gray-500">Collecter des données anonymes pour améliorer l'expérience</p>
                  </div>
                  <Switch 
                    checked={settings.privacySettings.analytics}
                    onCheckedChange={(checked) => handlePrivacyChange("analytics", checked)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Change Password Dialog */}
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Changer le mot de passe</DialogTitle>
              <DialogDescription>
                Entrez votre mot de passe actuel et votre nouveau mot de passe ci-dessous.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Mot de passe actuel</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">Nouveau mot de passe</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                />
              </div>
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handlePasswordChange}>
                Changer le mot de passe
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Settings;
