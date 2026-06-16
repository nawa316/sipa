'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import DeleteModal from '../components/DeleteModal';
import { experienceApi } from '@/lib/api';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

export default function ExperiencesPage() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null; title: string }>({
    isOpen: false,
    id: null,
    title: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    let filtered = experiences;
    
    if (searchTerm) {
      filtered = filtered.filter(exp =>
        exp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedType) {
      filtered = filtered.filter(exp => exp.type === selectedType);
    }
    
    setFilteredExperiences(filtered);
  }, [experiences, searchTerm, selectedType]);

  const fetchExperiences = async () => {
    try {
      const data = await experienceApi.getAll();
      setExperiences(data);
      setFilteredExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;
    
    setIsDeleting(true);
    try {
      await experienceApi.delete(deleteModal.id);
      await fetchExperiences();
      setDeleteModal({ isOpen: false, id: null, title: '' });
    } catch (error) {
      console.error('Failed to delete experience:', error);
      alert('Failed to delete experience');
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

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'work':
        return 'bg-green-100 text-green-800';
      case 'organization':
        return 'bg-blue-100 text-blue-800';
      case 'volunteer':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Header title="Experiences" subtitle="Manage your work and organizational experiences" />
      
      <div className="p-8">
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none"
              />
            </div>
            
            <div className="relative">
              <Filter size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none appearance-none cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="work">Work</option>
                <option value="organization">Organization</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/admin/experiences/create')}
            className="flex items-center gap-2 px-4 py-2 bg-[#3c45b9] text-white rounded-lg hover:bg-[#483D8B] transition-colors"
          >
            <Plus size={20} />
            <span>New Experience</span>
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : filteredExperiences.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            {searchTerm || selectedType ? 'No experiences found matching your filters' : 'No experiences yet. Create your first one!'}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExperiences.map((exp) => (
                    <tr key={exp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{exp.organization}</p>
                          {exp.location && (
                            <p className="text-sm text-gray-500">{exp.location}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {exp.role}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(exp.type)}`}>
                          {exp.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => router.push(`/admin/experiences/${exp.id}/edit`)}
                          className="text-[#3c45b9] hover:text-[#483D8B] mr-4 inline-flex items-center gap-1"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, id: exp.id, title: exp.organization })}
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
          Showing {filteredExperiences.length} of {experiences.length} experiences
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: '' })}
        onConfirm={handleDelete}
        title="Delete Experience"
        message={`Are you sure you want to delete experience at "${deleteModal.title}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
}
