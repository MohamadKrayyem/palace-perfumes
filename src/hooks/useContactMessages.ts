import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// Public hook: Send contact message
export const useSendContactMessage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (data: {
    name: string;
    email: string;
    message: string;
  }) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([data]);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('Error sending contact message:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
};

// Admin hook: View messages
export const useAdminContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMessages(data as ContactMessage[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    isLoading,
    refetch: fetchMessages,
  };
};
