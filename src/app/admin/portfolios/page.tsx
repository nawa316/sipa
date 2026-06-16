'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import DeleteModal from '../components/DeleteModal';
import { portfolioApi } from '@/lib/api';
import { Plus, Edit2, Trash2, Search, Filter, ExternalLink } from 'lucide-react';

export default function PortfoliosPage() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; title: string }>({
    isOpen: false,
    id: null,
    title: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPortfolios();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = portfolios;
    
    if (searchTerm) {
      filtered = filtered.filter(portfolio =>
        portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(portfolio => portfolio.category === selectedCategory);
    }
    
    setFilteredPortfolios(filtered);
  }, [portfolios, searchTerm, selectedCategory]);

  const fetchPortfolios = async () => {
    try {
      const data = await portfolioApi.getAll();
      setPortfolios(data);
      setFilteredPortfolios(data);
    } catch (error) {
      console.error('Failed to fetch portfolios:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await portfolioApi.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    
    setIsDeleting(true);
    try {
      await portfolioApi.delete(deleteModal.id);
      await fetchPortfolios();
      setDeleteModal({ isOpen: false, id: null, title: '' });
    } catch (error) {
      console.error('Failed to delete portfolio:', error);
      alert('Failed to delete portfolio');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Header title="Portfolios" subtitle="Manage your portfolio projects" />
      
      <div className="p-8">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search portfolios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none"
              />
            </div>
            
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none appearance-none cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/admin/portfolios/create')}
            className="flex items-center gap-2 px-4 py-2 bg-[#483D8B] text-white rounded-lg hover:bg-[#3c45b9] transition-colors"
          >
            <Plus size={20} />
            <span>New Portfolio</span>
          </button>
        </div>

        {/* Grid View */}
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : filteredPortfolios.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {searchTerm || selectedCategory ? 'No portfolios found matching your filters' : 'No portfolios yet. Create your first one!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolios.map((portfolio) => (
              <div key={portfolio.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {portfolio.image && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img 
                      src={portfolio.image} 
                      alt={portfolio.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{portfolio.title}</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#483D8B]/10 text-[#483D8B]">
                      {portfolio.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {portfolio.description}
                  </p>
                  
                  {portfolio.technologies && portfolio.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {portfolio.technologies.slice(0, 3).map((tech: string, idx: number) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {tech}
                        </span>
                      ))}
                      {portfolio.technologies.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          +{portfolio.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => router.push(`/admin/portfolios/${portfolio.id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-[#483D8B] text-[#483D8B] rounded-lg hover:bg-[#483D8B]/5 transition-colors"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: portfolio.id, title: portfolio.title })}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredPortfolios.length} of {portfolios.length} portfolios
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: '' })}
        onConfirm={handleDelete}
        title="Delete Portfolio"
        message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
