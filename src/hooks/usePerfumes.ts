import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { perfumes as localPerfumes, Perfume } from '@/data/perfumes';

// Map database perfume to local format
interface DbPerfume {
  id: string;
  brand: string;
  name: string;
  category: string;
  price: number;
  image_url: string | null;
  notes_top: string | null;
  notes_middle: string | null;
  notes_base: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

const mapDbPerfumeToLocal = (dbPerfume: DbPerfume): Perfume => ({
  id: dbPerfume.id as unknown as number, // Keep id for compatibility
  brand: dbPerfume.brand,
  name: dbPerfume.name,
  category: dbPerfume.category.toLowerCase() as 'men' | 'women' | 'unisex',
  price: dbPerfume.price,
  imageUrl: dbPerfume.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop',
  notes: {
    top: dbPerfume.notes_top?.split(',').map(s => s.trim()) || [],
    middle: dbPerfume.notes_middle?.split(',').map(s => s.trim()) || [],
    base: dbPerfume.notes_base?.split(',').map(s => s.trim()) || [],
  },
  description: dbPerfume.description || '',
});

export const usePerfumes = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>(localPerfumes);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerfumes = async () => {
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('perfumes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        setPerfumes(data.map(mapDbPerfumeToLocal));
      } else {
        // Fallback to local data if no DB data
        setPerfumes(localPerfumes);
      }
    } catch (err) {
      console.error('Error fetching perfumes:', err);
      setError('Failed to load perfumes');
      // Fallback to local data on error
      setPerfumes(localPerfumes);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfumes();
  }, []);

  // Filter function compatible with existing code
  const filterPerfumes = (category: string): Perfume[] => {
    if (category === 'all') return perfumes;
    return perfumes.filter(p => p.category === category);
  };

  return {
    perfumes,
    isLoading,
    error,
    filterPerfumes,
    refetch: fetchPerfumes,
  };
};

// Admin hook with full CRUD operations
export const useAdminPerfumes = () => {
  const [perfumes, setPerfumes] = useState<DbPerfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllPerfumes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('perfumes')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPerfumes(data as DbPerfume[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllPerfumes();
  }, []);

  const createPerfume = async (perfumeData: {
    brand: string;
    name: string;
    category: string;
    price: number;
    description?: string;
    image_url?: string;
    notes_top?: string;
    notes_middle?: string;
    notes_base?: string;
  }) => {
    const { data, error } = await supabase
      .from('perfumes')
      .insert([{
        ...perfumeData,
        category: perfumeData.category.charAt(0).toUpperCase() + perfumeData.category.slice(1),
      }])
      .select()
      .single();

    if (!error) {
      await fetchAllPerfumes();
    }
    return { data, error };
  };

  const updatePerfume = async (id: string, perfumeData: Partial<DbPerfume>) => {
    const { data, error } = await supabase
      .from('perfumes')
      .update({
        ...perfumeData,
        category: perfumeData.category 
          ? perfumeData.category.charAt(0).toUpperCase() + perfumeData.category.slice(1)
          : undefined,
      })
      .eq('id', id)
      .select()
      .single();

    if (!error) {
      await fetchAllPerfumes();
    }
    return { data, error };
  };

  const deletePerfume = async (id: string) => {
    const { error } = await supabase
      .from('perfumes')
      .delete()
      .eq('id', id);

    if (!error) {
      await fetchAllPerfumes();
    }
    return { error };
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    return updatePerfume(id, { is_active: isActive });
  };

  return {
    perfumes,
    isLoading,
    createPerfume,
    updatePerfume,
    deletePerfume,
    toggleActive,
    refetch: fetchAllPerfumes,
  };
};
