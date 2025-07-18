// Simple date formatting utilities without date-fns dependency issues

// Enhanced date formatting utilities compatible with native JS Date
export const formatDate = (date: Date | string, formatType: 'short' | 'long' | 'time' | 'datetime' = 'short'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Validate date
  if (!dateObj || isNaN(dateObj.getTime())) {
    return 'Date invalide';
  }
  
  try {
    switch (formatType) {
      case 'short':
        return dateObj.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      case 'long':
        return dateObj.toLocaleDateString('fr-FR', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      case 'time':
        return dateObj.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        });
      case 'datetime':
        return `${dateObj.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })} ${dateObj.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit'
        })}`;
      default:
        return dateObj.toLocaleDateString('fr-FR');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date invalide';
  }
};

export const formatDistanceToNow = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!dateObj || isNaN(dateObj.getTime())) {
    return 'Date invalide';
  }
  
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
  if (!date || isNaN(date.getTime())) {
    throw new Error('Date invalide');
  }
  
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const getDateForInput = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!dateObj || isNaN(dateObj.getTime())) {
    return '';
  }
  
  try {
    return dateObj.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date for input:', error);
    return '';
  }
};

export const getTimeForInput = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (!dateObj || isNaN(dateObj.getTime())) {
    return '';
  }
  
  try {
    return dateObj.toTimeString().slice(0, 5);
  } catch (error) {
    console.error('Error formatting time for input:', error);
    return '';
  }
};

// Calendar specific formatting functions
export const formatCalendarDate = (date: Date, formatStr: string): string => {
  try {
    // Simple format mapping for basic calendar use
    if (formatStr === 'HH:mm') {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    if (formatStr === 'dd/MM/yyyy') {
      return date.toLocaleDateString('fr-FR');
    }
    return date.toLocaleDateString('fr-FR');
  } catch (error) {
    console.error('Error formatting calendar date:', error);
    return '';
  }
};

// Validation helper
export const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

// Parse date string safely
export const parseDate = (dateString: string): Date | null => {
  try {
    const date = new Date(dateString);
    return isValidDate(date) ? date : null;
  } catch (error) {
    console.error('Error parsing date string:', error);
    return null;
  }
};