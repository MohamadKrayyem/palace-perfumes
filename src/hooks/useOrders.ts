import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface OrderItem {
  id: string;
  order_id: string;
  perfume_id: string | null;
  perfume_name: string;
  category: string | null;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  city_country: string;
  notes: string | null;
  total_price: number;
  status: string;
  created_at: string;
  order_items?: OrderItem[];
}

// Public hook: Create orders (anyone can use)
export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (orderData: {
    customer_name: string;
    phone: string;
    email?: string;
    address: string;
    city_country: string;
    notes?: string;
    total_price: number;
    items: {
      perfume_id?: string;
      perfume_name: string;
      category?: string;
      quantity: number;
      price: number;
    }[];
  }) => {
    setIsLoading(true);
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          customer_name: orderData.customer_name,
          phone: orderData.phone,
          email: orderData.email || null,
          address: orderData.address,
          city_country: orderData.city_country,
          notes: orderData.notes || null,
          total_price: orderData.total_price,
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        perfume_id: item.perfume_id || null,
        perfume_name: item.perfume_name,
        category: item.category || null,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return { success: true, orderId: order.id };
    } catch (error) {
      console.error('Error creating order:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading };
};

// Admin hook: View and manage orders
export const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (!error) {
      await fetchOrders();
    }
    return { error };
  };

  return {
    orders,
    isLoading,
    updateOrderStatus,
    refetch: fetchOrders,
  };
};
