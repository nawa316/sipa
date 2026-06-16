'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import DeleteModal from '../components/DeleteModal';
import { certificationApi } from '@/lib/api';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export default function CertificationsPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; title: string }>({
    isOpen: false,
    id: null,
    title: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = data;
    if (searchTerm) {
      filtered = filtered.filter(item =>
        (item.name && item.name.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.issuer && item.issuer.toString().toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const fetchData = async () => {
    try {
      const res = await certificationApi.getAll();
      setData(res);
      setFilteredData(res);
    } catch (error) {
      console.error('Failed to fetch:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    
    setIsDeleting(true);
    try {
      await certificationApi.delete(deleteModal.id);
      await fetchData();
      setDeleteModal({ isOpen: false, id: null, title: '' });
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <div>
      <Header title="Certifications" subtitle="Manage your certifications" />
      
      <div className="p-8">
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none"
              />
            </div>
          </div>
          
          <button
            onClick={() => router.push('/admin/certifications/create')}
            className="flex items-center gap-2 px-4 py-2 bg-[#3c45b9] text-white rounded-lg hover:bg-[#483D8B] transition-colors"
          >
            <Plus size={20} />
            <span>New Certification</span>
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : filteredData.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {searchTerm ? 'No items found matching your search' : 'No items yet. Create your first one!'}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.issuer}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(item.date)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/admin/certifications/${item.id}`)}
                          className="text-[#3c45b9] hover:text-[#483D8B] mr-4 inline-flex items-center gap-1"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: item.id, title: item.name || 'Item' })}
                          className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredData.length} of {data.length} items
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: '' })}
        onConfirm={handleDelete}
        title="Delete Certification"
        message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
