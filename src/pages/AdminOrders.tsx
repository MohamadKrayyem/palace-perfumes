import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MessageSquare, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { useAdminOrders } from '@/hooks/useOrders';
import { useAdminContactMessages } from '@/hooks/useContactMessages';
import { toast } from 'sonner';

const STATUS_OPTIONS = ['NEW', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'NEW': return <Clock className="w-4 h-4" />;
    case 'CONFIRMED': return <CheckCircle className="w-4 h-4" />;
    case 'SHIPPED': return <Truck className="w-4 h-4" />;
    case 'DELIVERED': return <CheckCircle className="w-4 h-4" />;
    case 'CANCELLED': return <XCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'NEW': return 'text-yellow-400 border-yellow-400/30';
    case 'CONFIRMED': return 'text-blue-400 border-blue-400/30';
    case 'SHIPPED': return 'text-purple-400 border-purple-400/30';
    case 'DELIVERED': return 'text-green-400 border-green-400/30';
    case 'CANCELLED': return 'text-red-400 border-red-400/30';
    default: return 'text-primary border-primary/30';
  }
};

const AdminOrders = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { orders, isLoading: ordersLoading, updateOrderStatus } = useAdminOrders();
  const { messages, isLoading: messagesLoading } = useAdminContactMessages();
  const [activeTab, setActiveTab] = useState<'orders' | 'messages'>('orders');

  if (!authLoading && !isAdmin) {
    navigate('/admin');
    return null;
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await updateOrderStatus(orderId, newStatus);
    if (!error) {
      toast.success(`Order status updated to ${newStatus}`);
    } else {
      toast.error('Failed to update status');
    }
  };

  if (authLoading || ordersLoading || messagesLoading) {
    return (
      <PageTransition>
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet><title>Orders & Messages — Palace Perfumes Admin</title></Helmet>
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <button onClick={() => navigate('/admin/dashboard')} className="p-2 text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-display text-3xl text-foreground">Orders & Messages</h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-6 py-3 text-sm tracking-[0.15em] uppercase border rounded-sm transition-all ${
                activeTab === 'orders' 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-primary/30 text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              <Package className="w-4 h-4" />
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-6 py-3 text-sm tracking-[0.15em] uppercase border rounded-sm transition-all ${
                activeTab === 'messages' 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'border-primary/30 text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Messages ({messages.length})
            </button>
          </div>

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet</p>
                </div>
              ) : (
                orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-card border border-primary/10 rounded-lg"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`flex items-center gap-1.5 px-3 py-1 text-xs border rounded ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('en-US', { 
                              year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        
                        <h3 className="font-display text-lg text-foreground mb-2">{order.customer_name}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                          <p><span className="text-primary/60">Phone:</span> {order.phone}</p>
                          {order.email && <p><span className="text-primary/60">Email:</span> {order.email}</p>}
                          <p><span className="text-primary/60">Address:</span> {order.address}</p>
                          <p><span className="text-primary/60">City/Country:</span> {order.city_country}</p>
                        </div>
                        
                        {order.notes && (
                          <p className="text-sm text-muted-foreground mb-4">
                            <span className="text-primary/60">Notes:</span> {order.notes}
                          </p>
                        )}

                        {/* Order Items */}
                        <div className="border-t border-primary/10 pt-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-primary/60 mb-2">Items</p>
                          <div className="space-y-1">
                            {order.order_items?.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-foreground">{item.perfume_name} x{item.quantity}</span>
                                <span className="text-primary">${item.price}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between mt-3 pt-3 border-t border-primary/10">
                            <span className="font-display text-foreground">Total</span>
                            <span className="font-display text-xl text-primary">${order.total_price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Update */}
                      <div className="lg:w-48">
                        <label className="block text-[10px] uppercase text-primary/70 mb-2">Update Status</label>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="input-luxury w-full text-sm py-2"
                        >
                          {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No messages yet</p>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-card border border-primary/10 rounded-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h3 className="font-display text-lg text-foreground">{message.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-primary/70 mb-3">{message.email}</p>
                    <p className="text-foreground/80">{message.message}</p>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
};

export default AdminOrders;
