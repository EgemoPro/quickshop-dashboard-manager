// Simple date formatting utilities to replace date-fns
export const formatDate = (date: Date | string, formatType: 'short' | 'long' | 'time' | 'datetime' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (formatType === 'short') {
    return dateObj.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }
  
  if (formatType === 'long') {
    return dateObj.toLocaleDateString('fr-FR', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }
  
  if (formatType === 'time') {
    return dateObj.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  if (formatType === 'datetime') {
    return dateObj.toLocaleString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }
  
  return dateObj.toLocaleDateString('fr-FR');
};

export const formatDistanceToNow = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return "aujourd'hui";
  } else if (diffInDays === 1) {
    return "il y a 1 jour";
  } else if (diffInDays < 30) {
    return `il y a ${diffInDays} jours`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `il y a ${months} mois`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDateForInput = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
};

export const getTimeForInput = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toTimeString().slice(0, 5);
};