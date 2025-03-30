
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductImage } from '@/store/slices/productsSlice';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onImagesChange }) => {
  const [previewImages, setPreviewImages] = useState<ProductImage[]>(images || []);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => {
      const previewUrl = URL.createObjectURL(file);
      return {
        id: Math.random().toString(36).substring(2, 9),
        url: previewUrl,
        name: file.name
      };
    });

    const updatedImages = [...previewImages, ...newImages];
    setPreviewImages(updatedImages);
    onImagesChange(updatedImages);
    
    toast({
      title: "Images ajoutées",
      description: `${acceptedFiles.length} image(s) ajoutée(s) avec succès.`,
    });
  }, [previewImages, onImagesChange, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = (id: string) => {
    const updatedImages = previewImages.filter(image => image.id !== id);
    setPreviewImages(updatedImages);
    onImagesChange(updatedImages);
    
    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée avec succès.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 cursor-pointer text-center transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-10 w-10 text-gray-400" />
          {isDragActive ? (
            <p className="text-primary">Déposez les images ici ...</p>
          ) : (
            <>
              <p className="text-gray-600">Glissez-déposez des images ici, ou cliquez pour sélectionner</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF jusqu'à 5MB</p>
            </>
          )}
          <Button type="button" variant="outline" size="sm" className="mt-2">
            Parcourir
          </Button>
        </div>
      </div>
      
      {previewImages.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 mt-4">
          {previewImages.map((image) => (
            <div key={image.id} className="relative group rounded-md overflow-hidden border border-gray-200">
              <img 
                src={image.url} 
                alt={image.name} 
                className="h-32 w-full object-cover" 
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  size="icon" 
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(image.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1 text-xs truncate">
                {image.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
