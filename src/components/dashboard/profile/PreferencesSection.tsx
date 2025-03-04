
import React from "react";
import { UserPreferences } from "@/store/slices/authSlice";

interface PreferencesSectionProps {
  userPreferences?: UserPreferences;
}

const PreferencesSection: React.FC<PreferencesSectionProps> = ({ userPreferences }) => {
  if (!userPreferences) return null;
  
  return (
    <div>
      <h4 className="font-medium mb-2">Préférences</h4>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="font-medium">Mode:</span>
          <span>{userPreferences.darkMode ? "Sombre" : "Clair"}</span>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="font-medium">Notifications:</span>
          <span>{userPreferences.notifications ? "Activées" : "Désactivées"}</span>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <span className="font-medium">Langue:</span>
          <span>{userPreferences.language === "fr" ? "Français" : "English"}</span>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;
