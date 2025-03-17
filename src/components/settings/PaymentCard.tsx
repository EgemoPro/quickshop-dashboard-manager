
import React, { useState } from "react";
import { CreditCard, Mail, Currency, CreditCardIcon, Wallet, Building2, TruckIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { togglePaymentMethod, updateEmailTemplate } from "@/store/slices/settingsSlice";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const PaymentCard = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { currency, currencySymbol, paymentMethods, emailTemplates } = useAppSelector((state) => state.settings);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<string>("invoice");
  const [emailContent, setEmailContent] = useState<string>("");
  
  const handleTogglePaymentMethod = (method: keyof typeof paymentMethods) => {
    dispatch(togglePaymentMethod(method));
    toast({
      title: "Méthode de paiement mise à jour",
      description: `La méthode de paiement a été ${paymentMethods[method] ? "désactivée" : "activée"}.`,
    });
  };

  const handleEmailTemplateChange = () => {
    dispatch(updateEmailTemplate({ 
      template: currentTemplate as keyof typeof emailTemplates, 
      content: emailContent 
    }));
    setOpenEmailDialog(false);
    toast({
      title: "Modèle d'email mis à jour",
      description: "Le modèle d'email a été mis à jour avec succès.",
    });
  };

  const openEmailTemplateDialog = (template: string) => {
    setCurrentTemplate(template);
    setEmailContent(emailTemplates[template as keyof typeof emailTemplates]);
    setOpenEmailDialog(true);
  };
  
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <CreditCard className="h-6 w-6 text-gray-500" />
        <h2 className="text-xl font-semibold">Paiement</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Configurez les méthodes de paiement acceptées par votre boutique.</p>
          <Badge variant="outline" className="ml-2">
            <Currency className="h-3 w-auto mr-1" />
            {currency} 
          </Badge>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start" onClick={() => setOpenPaymentDialog(true)}>
            <CreditCard className="h-4 w-4 mr-2" />
            Configurer les moyens de paiement
          </Button>
        </div>
        
        <div className="grid gap-2">
          <Button variant="outline" className="w-full justify-start" onClick={() => openEmailTemplateDialog("invoice")}>
            <Mail className="h-4 w-4 mr-2" />
            Modèles d'emails de facturation
          </Button>
        </div>
      </div>

      {/* Dialog pour la configuration des moyens de paiement */}
      <Dialog open={openPaymentDialog} onOpenChange={setOpenPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Méthodes de paiement</DialogTitle>
            <DialogDescription>
              Sélectionnez les méthodes de paiement que vous souhaitez proposer à vos clients.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCardIcon className="h-5 w-5 text-primary" />
                <Label htmlFor="stripe">Stripe</Label>
              </div>
              <Switch 
                id="stripe" 
                checked={paymentMethods.stripe} 
                onCheckedChange={() => handleTogglePaymentMethod("stripe")} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-primary" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <Switch 
                id="paypal" 
                checked={paymentMethods.paypal} 
                onCheckedChange={() => handleTogglePaymentMethod("paypal")} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <Label htmlFor="creditCard">Carte de crédit (Visa/Mastercard)</Label>
              </div>
              <Switch 
                id="creditCard" 
                checked={paymentMethods.creditCard} 
                onCheckedChange={() => handleTogglePaymentMethod("creditCard")} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5 text-primary" />
                <Label htmlFor="bankTransfer">Virement bancaire</Label>
              </div>
              <Switch 
                id="bankTransfer" 
                checked={paymentMethods.bankTransfer} 
                onCheckedChange={() => handleTogglePaymentMethod("bankTransfer")} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TruckIcon className="h-5 w-5 text-primary" />
                <Label htmlFor="cashOnDelivery">Paiement à la livraison</Label>
              </div>
              <Switch 
                id="cashOnDelivery" 
                checked={paymentMethods.cashOnDelivery} 
                onCheckedChange={() => handleTogglePaymentMethod("cashOnDelivery")} 
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog pour les modèles d'emails */}
      <Dialog open={openEmailDialog} onOpenChange={setOpenEmailDialog}>
        <DialogContent className="sm:max-w-[700px] sm:h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {currentTemplate === "invoice" && "Modèle d'email de facturation"}
              {currentTemplate === "orderConfirmation" && "Modèle d'email de confirmation de commande"}
              {currentTemplate === "shipping" && "Modèle d'email d'expédition"}
            </DialogTitle>
            <DialogDescription>
              Personnalisez le modèle d'email pour vos clients. Utilisez les variables comme {'{{storeName}}'}, {'{{orderNumber}}'}, {'{{totalAmount}}'}, {'{{currency}}'} pour personnaliser le contenu.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex space-x-2 mb-4">
            <Button 
              variant={currentTemplate === "invoice" ? "default" : "outline"} 
              onClick={() => openEmailTemplateDialog("invoice")}
            >
              Facturation
            </Button>
            <Button 
              variant={currentTemplate === "orderConfirmation" ? "default" : "outline"} 
              onClick={() => openEmailTemplateDialog("orderConfirmation")}
            >
              Confirmation
            </Button>
            <Button 
              variant={currentTemplate === "shipping" ? "default" : "outline"} 
              onClick={() => openEmailTemplateDialog("shipping")}
            >
              Expédition
            </Button>
          </div>
          
          <ScrollArea className="flex-grow">
            <Textarea 
              className="min-h-[300px]" 
              value={emailContent} 
              onChange={(e) => setEmailContent(e.target.value)}
              placeholder="Contenu du modèle d'email..."
            />
          </ScrollArea>
          
          <div className="mt-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm mb-4">
              <p className="font-semibold mb-2">Aperçu des variables:</p>
              <p><code>{'{{storeName}}'}</code> - Nom de votre boutique</p>
              <p><code>{'{{orderNumber}}'}</code> - Numéro de commande</p>
              <p><code>{'{{totalAmount}}'}</code> - Montant total</p>
              <p><code>{'{{currency}}'}</code> - Devise ({currency})</p>
            </div>
          </div>
          
          <Button onClick={handleEmailTemplateChange}>Enregistrer le modèle</Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PaymentCard;
