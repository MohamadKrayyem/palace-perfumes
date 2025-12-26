import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, X, Save, Search, ToggleLeft, ToggleRight, Package, Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { useAdminPerfumes } from '@/hooks/usePerfumes';
import { useImageUpload } from '@/hooks/useImageUpload';

type ModalMode = 'add' | 'edit' | null;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading, signOut } = useAuth();
  const { perfumes, isLoading, createPerfume, updatePerfume, deletePerfume, toggleActive } = useAdminPerfumes();
  const { uploadImage, isUploading } = useImageUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedPerfume, setSelectedPerfume] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '', brand: '', category: 'Men',
    price: 0, description: '', image_url: '',
    notes_top: '', notes_middle: '', notes_base: ''
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const filteredPerfumes = perfumes.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setFormData({ name: '', brand: '', category: 'Men', price: 0, description: '', image_url: '', notes_top: '', notes_middle: '', notes_base: '' });
    setModalMode('add');
  };

  const openEditModal = (p: any) => {
    setSelectedPerfume(p);
    setFormData({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      description: p.description || '',
      image_url: p.image_url || '',
      notes_top: p.notes_top || '',
      notes_middle: p.notes_middle || '',
      notes_base: p.notes_base || ''
    });
    setModalMode('edit');
  };

  const closeModal = () => { setModalMode(null); setSelectedPerfume(null); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const { url, error } = await uploadImage(file);
    if (url) {
      setFormData(p => ({ ...p, image_url: url }));
      toast.success('Image uploaded successfully');
    } else {
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    if (modalMode === 'add') {
      const { error } = await createPerfume(formData);
      if (!error) toast.success('Perfume added');
      else toast.error('Failed to add perfume');
    } else if (selectedPerfume) {
      const { error } = await updatePerfume(selectedPerfume.id, formData);
      if (!error) toast.success('Perfume updated');
      else toast.error('Failed to update perfume');
    }
    closeModal();
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this perfume?')) return;
    const { error } = await deletePerfume(id);
    if (!error) toast.success('Deleted');
    else toast.error('Failed to delete');
  };

  const handleToggleActive = async (id: string, currentState: boolean) => {
    await toggleActive(id, !currentState);
    toast.success(currentState ? 'Perfume deactivated' : 'Perfume activated');
  };

  if (authLoading || isLoading) {
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
      <Helmet><title>Admin Dashboard — Palace Perfumes</title></Helmet>
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h1 className="font-display text-3xl text-foreground">Admin Dashboard</h1>
            <div className="flex gap-3 flex-wrap">
              <motion.button onClick={() => navigate('/admin/orders')} className="flex items-center gap-2 px-4 py-2 text-sm border border-primary/30 rounded text-primary hover:bg-primary/10 transition-colors" whileTap={{ scale: 0.98 }}><Package className="w-4 h-4" />Orders</motion.button>
              <motion.button onClick={openAddModal} className="btn-gold flex items-center gap-2 px-6" whileTap={{ scale: 0.98 }}><Plus className="w-4 h-4" />Add Perfume</motion.button>
              <button onClick={handleLogout} className="p-3 text-muted-foreground hover:text-primary border border-primary/20 rounded-lg"><LogOut className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" /><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-luxury w-full pl-12" /></div>
            <div className="flex gap-2">{['all', 'men', 'women', 'unisex'].map(cat => (<button key={cat} onClick={() => setFilterCategory(cat)} className={`filter-pill ${filterCategory === cat ? 'active' : ''}`}>{cat}</button>))}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPerfumes.map((perfume) => (
              <div key={perfume.id} className={`p-4 rounded-lg bg-card border transition-colors group ${perfume.is_active ? 'border-primary/10 hover:border-primary/30' : 'border-red-500/20 opacity-60'}`}>
                <div className="flex gap-4">
                  <img src={perfume.image_url || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=100'} alt={perfume.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] tracking-[0.2em] uppercase text-primary/60">{perfume.brand}</p>
                    <h3 className="font-display text-sm text-foreground truncate">{perfume.name}</h3>
                    <p className="text-primary text-sm">${perfume.price}</p>
                    {!perfume.is_active && <p className="text-[9px] text-red-400 uppercase">Inactive</p>}
                  </div>
                </div>
                <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleToggleActive(perfume.id, perfume.is_active)} className="flex-1 py-2 text-xs border border-primary/30 rounded hover:bg-primary/10 flex items-center justify-center gap-1">
                    {perfume.is_active ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
                    {perfume.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => openEditModal(perfume)} className="flex-1 py-2 text-xs text-primary border border-primary/30 rounded hover:bg-primary/10 flex items-center justify-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
                  <button onClick={() => handleDelete(perfume.id)} className="py-2 px-3 text-xs text-red-400 border border-red-400/30 rounded hover:bg-red-400/10"><Trash2 className="w-3 h-3" /></button>
                </div>
              </div>
            ))}
          </div>

          {filteredPerfumes.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No perfumes found. Add your first perfume!</p>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {modalMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md" onClick={closeModal}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-primary/20 rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6"><h2 className="font-display text-2xl text-foreground">{modalMode === 'add' ? 'Add Perfume' : 'Edit Perfume'}</h2><button onClick={closeModal} className="p-2 text-muted-foreground hover:text-primary"><X className="w-5 h-5" /></button></div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[10px] uppercase text-primary/70 mb-2">Brand</label><input type="text" value={formData.brand} onChange={(e) => setFormData(p => ({ ...p, brand: e.target.value }))} className="input-luxury w-full" /></div>
                  <div><label className="block text-[10px] uppercase text-primary/70 mb-2">Name</label><input type="text" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="input-luxury w-full" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[10px] uppercase text-primary/70 mb-2">Category</label><select value={formData.category} onChange={(e) => setFormData(p => ({ ...p, category: e.target.value }))} className="input-luxury w-full"><option value="Men">Men</option><option value="Women">Women</option><option value="Unisex">Unisex</option></select></div>
                  <div><label className="block text-[10px] uppercase text-primary/70 mb-2">Price ($)</label><input type="number" value={formData.price} onChange={(e) => setFormData(p => ({ ...p, price: Number(e.target.value) }))} className="input-luxury w-full" /></div>
                </div>
                <div><label className="block text-[10px] uppercase text-primary/70 mb-2">Description</label><textarea value={formData.description} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} className="input-luxury w-full h-20 resize-none" /></div>
                
                {/* Image Upload Section */}
                <div>
                  <label className="block text-[10px] uppercase text-primary/70 mb-2">Image</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input type="text" value={formData.image_url} onChange={(e) => setFormData(p => ({ ...p, image_url: e.target.value }))} className="input-luxury flex-1" placeholder="Image URL or upload" />
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
                      <motion.button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="px-4 py-2 border border-primary/30 rounded text-primary hover:bg-primary/10 transition-colors flex items-center gap-2 disabled:opacity-50"
                        whileTap={{ scale: 0.98 }}
                      >
                        {isUploading ? (
                          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full" />
                        ) : (
                          <Upload className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                    {formData.image_url && (
                      <div className="flex items-center gap-3 p-3 bg-background/50 border border-primary/10 rounded">
                        <img src={formData.image_url} alt="Preview" className="w-12 h-12 object-cover rounded" />
                        <span className="text-xs text-muted-foreground flex-1 truncate">{formData.image_url}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div><label className="block text-[10px] uppercase text-primary/70 mb-2">Notes (comma separated)</label><div className="grid grid-cols-3 gap-2"><input type="text" value={formData.notes_top} onChange={(e) => setFormData(p => ({ ...p, notes_top: e.target.value }))} className="input-luxury w-full text-sm" placeholder="Top" /><input type="text" value={formData.notes_middle} onChange={(e) => setFormData(p => ({ ...p, notes_middle: e.target.value }))} className="input-luxury w-full text-sm" placeholder="Middle" /><input type="text" value={formData.notes_base} onChange={(e) => setFormData(p => ({ ...p, notes_base: e.target.value }))} className="input-luxury w-full text-sm" placeholder="Base" /></div></div>
                <motion.button onClick={handleSubmit} disabled={isSaving} className="btn-gold w-full flex items-center justify-center gap-2" whileTap={{ scale: 0.98 }}><Save className="w-4 h-4" />{isSaving ? 'Saving...' : modalMode === 'add' ? 'Add Perfume' : 'Save Changes'}</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default AdminDashboard;
