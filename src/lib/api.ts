// This file is kept for backwards compatibility
// All API calls now use Supabase directly via hooks
// See: src/hooks/usePerfumes.ts, src/hooks/useOrders.ts, src/hooks/useContactMessages.ts

import { supabase } from '@/integrations/supabase/client';

export interface OrderData {
  name: string;
  phone: string;
  email: string;
  address: string;
  cityCountry: string;
  notes: string;
  totalPrice: string;
  cartItems: {
    name: string;
    category: string;
    quantity: string;
    price: string;
  }[];
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export interface PerfumeData {
  name: string;
  brand: string;
  category: 'men' | 'women' | 'unisex';
  price: number;
  description: string;
  imageUrl: string;
  notes: { top: string[]; middle: string[]; base: string[] };
}

// ORDER ENDPOINTS - Now uses Supabase
export const createOrder = async (orderData: OrderData): Promise<{ success: boolean; message: string }> => {
  try {
    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_name: orderData.name,
        phone: orderData.phone,
        email: orderData.email || null,
        address: orderData.address,
        city_country: orderData.cityCountry,
        notes: orderData.notes || null,
        total_price: parseFloat(orderData.totalPrice),
      }])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = orderData.cartItems.map(item => ({
      order_id: order.id,
      perfume_name: item.name,
      category: item.category || null,
      quantity: parseInt(item.quantity),
      price: parseFloat(item.price),
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { success: true, message: 'Order placed successfully' };
  } catch (error) {
    console.error('Order creation error:', error);
    return { success: false, message: 'Failed to create order' };
  }
};

// CONTACT ENDPOINTS - Now uses Supabase
export const sendContactMessage = async (contactData: ContactData): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .insert([contactData]);

    if (error) throw error;

    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Contact message error:', error);
    return { success: false, message: 'Failed to send message' };
  }
};

// ADMIN - PERFUME ENDPOINTS - Now uses Supabase
export const getPerfumes = async (): Promise<{ success: boolean; data?: any[] }> => {
  try {
    const { data, error } = await supabase
      .from('perfumes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Fetch perfumes error:', error);
    return { success: false, data: [] };
  }
};

export const createPerfume = async (perfumeData: PerfumeData): Promise<{ success: boolean; message: string; id?: string }> => {
  try {
    const { data, error } = await supabase
      .from('perfumes')
      .insert([{
        brand: perfumeData.brand,
        name: perfumeData.name,
        category: perfumeData.category.charAt(0).toUpperCase() + perfumeData.category.slice(1),
        price: perfumeData.price,
        description: perfumeData.description,
        image_url: perfumeData.imageUrl,
        notes_top: perfumeData.notes.top.join(', '),
        notes_middle: perfumeData.notes.middle.join(', '),
        notes_base: perfumeData.notes.base.join(', '),
      }])
      .select()
      .single();

    if (error) throw error;

    return { success: true, message: 'Perfume created successfully', id: data.id };
  } catch (error) {
    console.error('Create perfume error:', error);
    return { success: false, message: 'Failed to create perfume' };
  }
};

export const updatePerfume = async (id: number | string, perfumeData: PerfumeData): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from('perfumes')
      .update({
        brand: perfumeData.brand,
        name: perfumeData.name,
        category: perfumeData.category.charAt(0).toUpperCase() + perfumeData.category.slice(1),
        price: perfumeData.price,
        description: perfumeData.description,
        image_url: perfumeData.imageUrl,
        notes_top: perfumeData.notes.top.join(', '),
        notes_middle: perfumeData.notes.middle.join(', '),
        notes_base: perfumeData.notes.base.join(', '),
      })
      .eq('id', id.toString());

    if (error) throw error;

    return { success: true, message: 'Perfume updated successfully' };
  } catch (error) {
    console.error('Update perfume error:', error);
    return { success: false, message: 'Failed to update perfume' };
  }
};

export const deletePerfume = async (id: number | string): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from('perfumes')
      .delete()
      .eq('id', id.toString());

    if (error) throw error;

    return { success: true, message: 'Perfume deleted successfully' };
  } catch (error) {
    console.error('Delete perfume error:', error);
    return { success: false, message: 'Failed to delete perfume' };
  }
};

export const uploadImage = async (file: File): Promise<{ success: boolean; imageUrl?: string; message?: string }> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `perfumes/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('perfume-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('perfume-images')
      .getPublicUrl(filePath);

    return { success: true, imageUrl: publicUrl };
  } catch (error) {
    console.error('Upload image error:', error);
    return { success: false, message: 'Failed to upload image' };
  }
};
