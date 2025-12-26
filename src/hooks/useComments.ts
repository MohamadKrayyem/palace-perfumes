import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number | null;
  created_at: string;
}

// Public hook: View and add comments
export const useComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error && data) {
      setComments(data as Comment[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = async (data: {
    name: string;
    message: string;
    rating?: number;
  }) => {
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          name: data.name,
          message: data.message,
          rating: data.rating || null,
        }]);

      if (error) throw error;

      await fetchComments();
      return { success: true };
    } catch (error) {
      console.error('Error adding comment:', error);
      return { success: false, error };
    }
  };

  return {
    comments,
    isLoading,
    addComment,
    refetch: fetchComments,
  };
};

// Admin hook: Moderate comments
export const useAdminComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data as Comment[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const deleteComment = async (id: string) => {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (!error) {
      await fetchComments();
    }
    return { error };
  };

  return {
    comments,
    isLoading,
    deleteComment,
    refetch: fetchComments,
  };
};
