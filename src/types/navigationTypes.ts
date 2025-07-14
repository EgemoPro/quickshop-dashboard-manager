export interface SubNavigationItem {
  to: string;
  label: string;
  icon: React.ElementType;
}



export interface NavigationItemProps {
  to?: string;
  icon: React.ElementType;
  label: string;
  subItems?: SubNavigationItem[];
  showLabels: boolean;
  closeAllExpanded: () => void;
  isMobile?: boolean;
}
