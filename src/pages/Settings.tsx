
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/store/hooks";
import { updateSettings } from "@/store/slices/settingsSlice";

// Import the newly created components
// import StoreInfoCard from "@/components/settings/StoreInfoCard";
import NotificationsCard from "@/components/settings/NotificationsCard";
import RegionalSettingsCard from "@/components/settings/RegionalSettingsCard";
import SecurityCard from "@/components/settings/SecurityCard";
import PaymentCard from "@/components/settings/PaymentCard";
import PrivacyCard from "@/components/settings/PrivacyCard";
import PasswordDialog from "@/components/settings/PasswordDialog";

// Type for settings
interface StoreSettings {
  storeName: string;
  storeDescription: string;
  storeAddress: string;
  storeEmail: string;
  storePhone: string;
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
  const dispatch = useAppDispatch();
  
  // Initial settings state
  const [settings, setSettings] = useState<StoreSettings>({
    storeName: "Ma Super Boutique",
    storeDescription: "Une boutique en ligne proposant des produits de qualité",
    storeAddress: "123 Rue du Commerce, 75001 Paris",
    storeEmail: "contact@masuperboutique.com",
    storePhone: "+33 1 23 45 67 89",
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

  // Handle password data change
  const handlePasswordDataChange = (field: string, value: string) => {
    setPasswordData({
      ...passwordData,
      [field]: value
    });
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Notifications */}
            <NotificationsCard
              notifications={settings.notifications}
              onToggle={handleNotificationToggle}
            />

            {/* Regional Settings */}
            <RegionalSettingsCard />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Security */}
            <SecurityCard
              onPasswordDialogOpen={() => setShowPasswordDialog(true)}
            />

            {/* Payment */}
            <PaymentCard />
          </div>
          
          {/* Privacy */}
          <PrivacyCard
            privacySettings={settings.privacySettings}
            onPrivacyChange={handlePrivacyChange}
          />
        </div>
        
        {/* Password Dialog */}
        <PasswordDialog
          open={showPasswordDialog}
          onOpenChange={setShowPasswordDialog}
          passwordData={passwordData}
          passwordError={passwordError}
          onPasswordDataChange={handlePasswordDataChange}
          onPasswordChange={handlePasswordChange}
        />
      </motion.div>
    </div>
  );
};

export default Settings;
