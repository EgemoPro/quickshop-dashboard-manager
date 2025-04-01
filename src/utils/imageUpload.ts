
/**
 * Utility functions for handling image uploads
 */

// Store paths for different image types
export const IMAGE_PATHS = {
  avatars: "/images/avatars/",
  logos: "/images/store-logos/",
  banners: "/images/store-banners/"
};

/**
 * Process an image file to get URL and storage path
 * In a real app, this would upload to a server or cloud storage
 * Here we're simulating the process
 */
export const processImageUpload = (
  file: File, 
  type: 'avatar' | 'logo' | 'banner'
): Promise<{url: string; path: string}> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a blob URL for preview
      const blobUrl = URL.createObjectURL(file);
      
      // In a real app, you would upload the file to a server here
      // For now, we'll simulate a server path
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      let storagePath = '';
      
      // Determine path based on image type
      switch (type) {
        case 'avatar':
          storagePath = `${IMAGE_PATHS.avatars}${fileName}`;
          break;
        case 'logo':
          storagePath = `${IMAGE_PATHS.logos}${fileName}`;
          break;
        case 'banner':
          storagePath = `${IMAGE_PATHS.banners}${fileName}`;
          break;
      }
      
      // Simulate a delay for "uploading"
      setTimeout(() => {
        resolve({
          url: blobUrl,  // In production this would be a CDN URL
          path: storagePath
        });
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Helper to handle file input changes
 */
export const handleImageFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  type: 'avatar' | 'logo' | 'banner',
  callback: (result: {url: string; path: string}) => void
): void => {
  const file = e.target.files?.[0];
  
  if (!file) return;
  
  // Check if file is an image
  if (!file.type.match('image.*')) {
    alert('Veuillez sélectionner une image');
    return;
  }
  
  // Check file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('L\'image ne doit pas dépasser 5MB');
    return;
  }
  
  // Process the upload
  processImageUpload(file, type)
    .then(callback)
    .catch(error => {
      console.error("Error uploading image:", error);
      alert('Erreur lors du téléchargement de l\'image');
    });
};
