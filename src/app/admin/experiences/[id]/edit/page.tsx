'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import TagInput from '../../../components/TagInput';
import { experienceApi } from '@/lib/api';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditExperiencePage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    organization: '',
    role: '',
    description: '',
    image: '',
    imageFile: null as File | null,
    start_date: '',
    end_date: '',
    type: 'organization' as 'organization' | 'work' | 'volunteer',
    skills: [] as string[],
    location: '',
    photos: [] as string[],
    photoFiles: [] as File[],
  });

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const exp = await experienceApi.getById(id);
      setFormData({
        organization: exp.organization,
        role: exp.role,
        description: exp.description,
        image: exp.image || '',
        imageFile: null,
        start_date: exp.start_date.split('T')[0],
        end_date: exp.end_date ? exp.end_date.split('T')[0] : '',
        type: exp.type,
        skills: exp.skills || [],
        location: exp.location || '',
        photos: exp.photos || [],
        photoFiles: [],
      });
    } catch (error) {
      console.error('Failed to fetch experience:', error);
      alert('Failed to load experience');
      router.push('/admin/experiences');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.image;

      if (formData.imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', formData.imageFile);
        uploadData.append('bucket', 'experiences');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const data = await res.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to upload image');
        }
        imageUrl = data.url;
      }

      let newPhotoUrls: string[] = [];
      if (formData.photoFiles.length > 0) {
        for (const file of formData.photoFiles) {
          const uploadData = new FormData();
          uploadData.append('file', file);
          uploadData.append('bucket', 'experiences');

          const res = await fetch('/api/upload', {
            method: 'POST',
            body: uploadData,
          });

          const data = await res.json();
          if (data.success) {
            newPhotoUrls.push(data.url);
          }
        }
      }

      const submitData = {
        organization: formData.organization,
        role: formData.role,
        description: formData.description,
        image: imageUrl,
        start_date: formData.start_date,
        end_date: formData.end_date || null,
        type: formData.type,
        skills: formData.skills,
        location: formData.location,
        photos: [...formData.photos, ...newPhotoUrls],
      };

      await experienceApi.update(id, submitData);
      router.push('/admin/experiences');
    } catch (error) {
      console.error('Failed to update experience:', error);
      alert('Failed to update experience');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div>
        <Header title="Edit Experience" subtitle="Loading..." />
        <div className="p-8 text-center text-gray-500">Loading experience...</div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Edit Experience" subtitle={`Editing: ${formData.organization}`} />
      
      <div className="p-8">
        <div className="max-w-4xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Experiences</span>
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                    placeholder="Enter organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                    placeholder="Your role/position"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                  placeholder="Describe your responsibilities and achievements"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                  >
                    <option value="organization">Organization</option>
                    <option value="work">Work</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image/Logo Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                />
                {formData.image && !formData.imageFile && (
                  <p className="mt-2 text-sm text-gray-500">Current image URL: {formData.image}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Photos (Multiple)
                </label>
                
                {formData.photos.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Current Photos:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.photos.map((url, index) => (
                        <div key={index} className="relative group">
                          <img src={url} alt={`Photo ${index}`} className="w-20 h-20 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => {
                              const newPhotos = [...formData.photos];
                              newPhotos.splice(index, 1);
                              setFormData(prev => ({ ...prev, photos: newPhotos }));
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) {
                      setFormData(prev => ({ ...prev, photoFiles: Array.from(e.target.files!) }));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                />
                {formData.photoFiles.length > 0 && (
                  <p className="mt-2 text-sm text-gray-500">{formData.photoFiles.length} new files selected</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3c45b9] focus:border-[#3c45b9] outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty if currently ongoing</p>
                </div>
              </div>

              <TagInput
                label="Skills Acquired"
                value={formData.skills}
                onChange={(skills) => setFormData(prev => ({ ...prev, skills }))}
                placeholder="Add skill (e.g., Leadership, Web Development)"
              />

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-6 py-2 bg-[#3c45b9] text-white rounded-lg hover:bg-[#483D8B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  <span>{isLoading ? 'Updating...' : 'Update Experience'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
