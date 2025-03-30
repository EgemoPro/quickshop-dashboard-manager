
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Edit, Link2 } from "lucide-react";
import { toast } from "sonner";

interface ContactButtonsProps {
  onEditProfile: () => void;
  email?: string;
  ref?: string;
}

const ContactButtons: React.FC<ContactButtonsProps> = ({ onEditProfile, email = "", ref = "" }) => {
  const handleEmailClick = () => {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else {
      toast.error("Aucune adresse e-mail n'est disponible.");
    }
  };


  const handleOpenSotrePreview = () => {
    // previsualisation de la boutique
    if (ref) {
      window.location.href = `tel:${ref}`;
    } else {
      toast.error("Infos de la boutique manquante, complètez les infos puis ressayez !");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      <Button variant="outline" className="w-full" onClick={handleEmailClick}>
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button variant="outline" className="w-full" onClick={handleOpenSotrePreview}>
        <Link2 className="h-4 w-4 mr-2" />
        Voir la boutique
      </Button>
      <Button variant="outline" className="w-full col-span-2" onClick={onEditProfile}>
        <Edit className="h-4 w-4 mr-2" />
        Modifier le profil
      </Button>
    </div>
  );
};

export default ContactButtons;
