'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { profileApi } from '@/lib/api';
import type { Profile, UpdateProfileInput } from '@/lib/types';
import { Save } from 'lucide-react';

export default function ProfileAdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<UpdateProfileInput>();
  
  const currentCvUrl = watch('cv_url');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileApi.get();
      if (data) {
        reset(data);
      }
    } catch (error) {
      console.error('Failed to fetch profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: UpdateProfileInput) => {
    setIsSaving(true);
    try {
      if (cvFile) {
        const uploadData = new FormData();
        uploadData.append('file', cvFile);
        uploadData.append('bucket', 'portfolios'); // You can change this to a specific bucket for CVs if created

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadResult = await res.json();
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || 'Failed to upload CV');
        }
        data.cv_url = uploadResult.url;
      }

      await profileApi.update(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dm_serif_text">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and about text.</p>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#6b8af6] text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <Save size={20} />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form className="p-6 md:p-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline / Title</label>
              <input
                {...register('tagline')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                {...register('email')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                {...register('phone')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                {...register('location')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
              <input
                {...register('github')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn URL</label>
              <input
                {...register('linkedin')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CV PDF Upload</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setCvFile(e.target.files[0]);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
              {currentCvUrl && !cvFile && (
                <p className="mt-2 text-sm text-gray-500">
                  Current CV: <a href={currentCvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View File</a>
                </p>
              )}
              {cvFile && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {cvFile.name}
                </p>
              )}
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">About Text</label>
              <textarea
                {...register('about_text')}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6b8af6] focus:border-[#6b8af6] outline-none transition-all"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
