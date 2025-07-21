
import { useAppSelector } from "@/store/hooks";

const formatNumber = (num: number, slice: string = ","): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, slice);
};


export const useCurrency = () => {
  const { currency, currencySymbol } = useAppSelector(state => state.settings);
  
  /**
   * Formate un montant avec la devise actuelle du store
   * @param amount - Le montant à formater (nombre ou chaîne)
   * @param options - Options de formatage supplémentaires
   * @returns Montant formaté avec devise
   */
  const formatCurrency = (
    amount: number | string,
    options: { 
      withSymbol?: boolean;
      withSpace?: boolean;
      symbolPosition?: 'before' | 'after';
    } = {}
  ) => {
    const { 
      withSymbol = true,
      withSpace = true,
      symbolPosition = 'after'
    } = options;
    
    // Convertir le montant en nombre si nécessaire
    const numAmount = typeof amount === 'string' 
      ? parseFloat(amount.replace(/[^\d.-]/g, '')) 
      : amount;
    
    // Gérer les cas d'erreur
    if (isNaN(numAmount)) return '0';
    
    // Formater le nombre
    // const formattedAmount = numAmount.toFixed(2).replace(/\.00$/, '');
    const formattedAmount = formatNumber(numAmount," ")
    // Renvoyer le montant formaté avec ou sans symbole
    if (!withSymbol) return formattedAmount;
    
    const space = withSpace ? ' ' : '';
    
    return symbolPosition === 'before'
      ? `${currencySymbol}${space}${formattedAmount}`
      : `${formattedAmount}${space}${currencySymbol}`;
  };
  
  return { formatCurrency, currency, currencySymbol };
};
