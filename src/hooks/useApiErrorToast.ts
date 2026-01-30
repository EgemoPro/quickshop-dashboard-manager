import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ApiErrorDetail {
  message: string;
  status?: number;
  url?: string;
}

/**
 * Hook that listens to global API errors and shows toast notifications
 * Place this in your root App component or a top-level provider
 */
export const useApiErrorToast = () => {
  const { toast } = useToast();

  useEffect(() => {
    const handleApiError = (event: CustomEvent<ApiErrorDetail>) => {
      const { message, status } = event.detail;

      // Don't show toast for 401 errors (handled by auth redirect)
      if (status === 401) {
        return;
      }

      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: message,
      });
    };

    window.addEventListener('api-error', handleApiError as EventListener);

    return () => {
      window.removeEventListener('api-error', handleApiError as EventListener);
    };
  }, [toast]);
};

export default useApiErrorToast;
