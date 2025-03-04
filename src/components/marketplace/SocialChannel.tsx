
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Store, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface SocialChannelProps {
  platform: string;
  isConnected: boolean;
  followers: number;
  likes: number;
}

const SocialChannel: React.FC<SocialChannelProps> = ({ platform, isConnected, followers, likes }) => {
  const [connected, setConnected] = useState(isConnected);
  
  const handleToggle = () => {
    setConnected(!connected);
    toast(`${platform} ${!connected ? "connecté" : "déconnecté"} avec succès`);
  };
  
  const getIcon = () => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      default:
        return <Store className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full p-2">
          {getIcon()}
        </div>
        <div>
          <p className="font-medium">{platform}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{followers} abonnés</span>
            <span>•</span>
            <span>{likes} likes</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch id={`${platform}-switch`} checked={connected} onCheckedChange={handleToggle} />
        <Button variant="ghost" size="sm">
          <ExternalLink className="h-4 w-4 mr-2" />
          Gérer
        </Button>
      </div>
    </div>
  );
};

export default SocialChannel;
