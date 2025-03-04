
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, PhoneCall, Edit } from "lucide-react";

interface ContactButtonsProps {
  onEditProfile: () => void;
}

const ContactButtons: React.FC<ContactButtonsProps> = ({ onEditProfile }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      <Button variant="outline" className="w-full">
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button variant="outline" className="w-full">
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
