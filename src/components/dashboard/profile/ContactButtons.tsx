
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, PhoneCall, Edit } from "lucide-react";
import { toast } from "sonner";

interface ContactButtonsProps {
  onEditProfile: () => void;
  email?: string;
  phone?: string;
}

const ContactButtons: React.FC<ContactButtonsProps> = ({ onEditProfile, email = "", phone = "" }) => {
  const handleEmailClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else {
      toast.error("Aucune adresse e-mail n'est disponible.");
    }
  };

  const handlePhoneClick = () => {
    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.error("Aucun numéro de téléphone n'est disponible.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      <Button variant="outline" className="w-full" onClick={handleEmailClick}>
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button variant="outline" className="w-full" onClick={handlePhoneClick}>
        <PhoneCall className="h-4 w-4 mr-2" />
        Appeler
      </Button>
      <Button variant="outline" className="w-full col-span-2" onClick={onEditProfile}>
        <Edit className="h-4 w-4 mr-2" />
        Modifier le profil
      </Button>
    </div>
  );
};

export default ContactButtons;
