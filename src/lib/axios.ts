import axios, { AxiosError, AxiosRequestConfig } from 'axios';

/**
 * Configuration for retry logic
 */
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // Base delay in ms
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

/**
 * Creates an instance of axios with a predefined configuration.
 */
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  timeout: 30000, // 30 seconds timeout
});

api.defaults.withCredentials = true;

/**
 * Request interceptor - adds JWT token to headers
 */
api.interceptors.request.use((config) => {
  const JWT_TOKEN = localStorage.getItem('jwt');
  if (JWT_TOKEN) {
    config.headers.Authorization = `Bearer ${JWT_TOKEN}`;
  }
  return config;
});

/**
 * Sleep utility for retry delay
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Check if error is retryable
 */
const isRetryableError = (error: AxiosError): boolean => {
  // Retry on network errors
  if (!error.response) {
    return true;
  }
  
  // Retry on specific status codes
  return RETRY_CONFIG.retryableStatuses.includes(error.response.status);
};

/**
 * Response interceptor - handles errors globally and implements retry logic
 */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as AxiosRequestConfig & { _retryCount?: number };
    
    if (!config) {
      return Promise.reject(error);
    }

    // Initialize retry count
    config._retryCount = config._retryCount ?? 0;

    // Check if we should retry
    if (isRetryableError(error) && config._retryCount < RETRY_CONFIG.maxRetries) {
      config._retryCount += 1;
      
      // Exponential backoff
      const delay = RETRY_CONFIG.retryDelay * Math.pow(2, config._retryCount - 1);
      
      console.log(`[Axios] Retrying request (${config._retryCount}/${RETRY_CONFIG.maxRetries}) after ${delay}ms`);
      
      await sleep(delay);
      
      return api(config);
    }

    // Extract error message
    const errorMessage = extractErrorMessage(error);
    
    // Dispatch custom event for global error handling
    const errorEvent = new CustomEvent('api-error', {
      detail: {
        message: errorMessage,
        status: error.response?.status,
        url: config.url,
      }
    });
    window.dispatchEvent(errorEvent);

    console.error('[Axios Error]', {
      url: config.url,
      status: error.response?.status,
      message: errorMessage,
      retries: config._retryCount,
    });

    return Promise.reject(error);
  }
);

/**
 * Extract user-friendly error message from AxiosError
 */
const extractErrorMessage = (error: AxiosError): string => {
  if (!error.response) {
    return 'Erreur de connexion réseau. Vérifiez votre connexion internet.';
  }

  const status = error.response.status;
  const data = error.response.data as { message?: string };

  // Use server message if available
  if (data?.message) {
    return data.message;
  }

  // Default messages by status code
  switch (status) {
    case 400:
      return 'Requête invalide. Vérifiez les données envoyées.';
    case 401:
      return 'Session expirée. Veuillez vous reconnecter.';
    case 403:
      return 'Accès non autorisé.';
    case 404:
      return 'Ressource non trouvée.';
    case 408:
      return 'Délai d\'attente dépassé. Réessayez.';
    case 429:
      return 'Trop de requêtes. Veuillez patienter.';
    case 500:
      return 'Erreur serveur. Réessayez plus tard.';
    case 502:
    case 503:
    case 504:
      return 'Service temporairement indisponible.';
    default:
      return `Erreur inattendue (${status})`;
  }
};

export default api;
