import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (file: File): Promise<{ url: string | null; error: Error | null }> => {
    setIsUploading(true);
    setProgress(0);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `perfumes/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('perfume-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      setProgress(100);

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('perfume-images')
        .getPublicUrl(filePath);

      return { url: publicUrl, error: null };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { url: null, error: error as Error };
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (url: string): Promise<{ error: Error | null }> => {
    try {
      // Extract file path from URL
      const urlParts = url.split('/perfume-images/');
      if (urlParts.length < 2) return { error: null };

      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from('perfume-images')
        .remove([filePath]);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { error: error as Error };
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    progress,
  };
};
