
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductImage } from '@/types/productSlicesTypes';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

type ImageWithFile = {
  file?: File;
  url: string;
  alt: string;
};


const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onImagesChange }) => {
  const [previewImages, setPreviewImages] = useState<ProductImage[]>(images || []);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: ImageWithFile[] = acceptedFiles.map(file => {
      const previewUrl = URL.createObjectURL(file);
      return {
        file,
        url: previewUrl,
        alt: file.name
      };
    });

    const updatedImages = [...previewImages, ...newImages];
    setPreviewImages(updatedImages);
    onImagesChange(updatedImages); // Renvoie aussi les File pour l’upload

    toast({
      title: "Images ajoutées",
      description: `${acceptedFiles.length} image(s) ajoutée(s) avec succès.`,
    });
  }, [previewImages, onImagesChange, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const removeImage = (index: number) => {
    const updatedImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedImages);
    onImagesChange(updatedImages);

    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée avec succès.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-8 cursor-pointer text-center transition-all duration-300 ${
          isDragActive 
            ? 'border-emerald-500 bg-emerald-50/50 scale-[1.02]' 
            : 'border-muted/50 hover:border-emerald-400/60 hover:bg-emerald-50/20'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className={`p-4 rounded-full transition-all duration-300 ${
            isDragActive ? 'bg-emerald-500/20' : 'bg-muted/20'
          }`}>
            <Upload className={`h-12 w-12 transition-colors duration-300 ${
              isDragActive ? 'text-emerald-600' : 'text-muted-foreground'
            }`} />
          </div>
          {isDragActive ? (
            <div className="space-y-2">
              <p className="text-emerald-700 font-semibold text-lg">Déposez les images ici ...</p>
              <p className="text-emerald-600 text-sm">Relâchez pour ajouter les fichiers</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-lg mb-1">
                  Glissez-déposez des images ici
                </p>
                <p className="text-muted-foreground">ou cliquez pour sélectionner des fichiers</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-muted/50 rounded">PNG</span>
                <span className="px-2 py-1 bg-muted/50 rounded">JPG</span>
                <span className="px-2 py-1 bg-muted/50 rounded">GIF</span>
                <span className="text-muted-foreground/60">•</span>
                <span>Max 5MB par fichier</span>
              </div>
              <Button 
                type="button" 
                variant="outline" 
                size="lg" 
                className="mt-4 border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-50/30"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Parcourir les fichiers
              </Button>
            </div>
          )}
        </div>
      </div>

      {previewImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-emerald-600" />
              Images sélectionnées ({previewImages.length})
            </h4>
            {previewImages.length > 0 && (
              <span className="text-sm text-muted-foreground px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                Prêt à uploader
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {previewImages.map((image, index) => (
              <div key={index} className="group relative rounded-xl overflow-hidden border-2 border-muted/30 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt || `Image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8 bg-red-500/90 hover:bg-red-600 shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-2 left-2 right-2">
                    <div className="bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg">
                      <p className="text-xs font-medium truncate">
                        {image.alt || `Image ${index + 1}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
