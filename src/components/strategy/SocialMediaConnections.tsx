
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Globe, Rss, Link } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export interface SocialMediaProfile {
  platform: string;
  url: string;
  connected: boolean;
  username?: string;
  followers?: number;
}

interface SocialMediaConnectionsProps {
  socialProfiles: SocialMediaProfile[];
  onSocialProfilesChange: (profiles: SocialMediaProfile[]) => void;
}

const SocialMediaConnections: React.FC<SocialMediaConnectionsProps> = ({
  socialProfiles,
  onSocialProfilesChange
}) => {
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<SocialMediaProfile[]>(socialProfiles);

  const handleUrlChange = (index: number, value: string) => {
    const newProfiles = [...profiles];
    newProfiles[index].url = value;
    setProfiles(newProfiles);
    onSocialProfilesChange(newProfiles);
  };

  const handleToggleConnection = (index: number) => {
    const newProfiles = [...profiles];
    newProfiles[index].connected = !newProfiles[index].connected;
    
    // Simulate connection/disconnection
    if (newProfiles[index].connected) {
      newProfiles[index].followers = Math.floor(Math.random() * 1000) + 100;
      toast({
        title: "Compte connecté",
        description: `Votre compte ${newProfiles[index].platform} a été connecté avec succès.`,
      });
    } else {
      toast({
        title: "Compte déconnecté",
        description: `Votre compte ${newProfiles[index].platform} a été déconnecté.`,
        variant: "destructive",
      });
    }
    
    setProfiles(newProfiles);
    onSocialProfilesChange(newProfiles);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'site web':
        return <Globe className="h-5 w-5" />;
      case 'rss':
        return <Rss className="h-5 w-5" />;
      default:
        return <Link className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Réseaux sociaux</h3>
      <p className="text-sm text-gray-500">
        Connectez vos réseaux sociaux pour améliorer votre visibilité et synchroniser votre contenu.
      </p>
      
      <div className="space-y-4 mt-4">
        {profiles.map((profile, index) => (
          <div key={index} className="flex flex-col space-y-2 p-4 border rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  {getPlatformIcon(profile.platform)}
                </div>
                <span className="font-medium">{profile.platform}</span>
              </div>
              <Switch 
                checked={profile.connected} 
                onCheckedChange={() => handleToggleConnection(index)}
              />
            </div>
            
            <div className="pt-2">
              <Label htmlFor={`${profile.platform}-url`}>URL du profil</Label>
              <div className="flex mt-1">
                <Input
                  id={`${profile.platform}-url`}
                  placeholder={`https://${profile.platform.toLowerCase()}.com/votreprofil`}
                  value={profile.url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className="flex-1"
                />
                {profile.connected && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 whitespace-nowrap"
                    onClick={() => window.open(profile.url, '_blank')}
                  >
                    Voir
                  </Button>
                )}
              </div>
            </div>
            
            {profile.connected && profile.followers !== undefined && (
              <div className="text-sm text-gray-500 pt-2">
                {profile.followers} abonnés
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaConnections;
