'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import TagInput from '../../../components/TagInput';
import { portfolioApi } from '@/lib/api';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditPortfolioPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    imageFile: null as File | null,
    technologies: [] as string[],
    category: '',
    link: '',
    github: '',
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const portfolio = await portfolioApi.getById(id);
      setFormData({
        title: portfolio.title,
        description: portfolio.description,
        image: portfolio.image || '',
        imageFile: null,
        technologies: portfolio.technologies || [],
        category: portfolio.category,
        link: portfolio.link || '',
        github: portfolio.github || '',
      });
    } catch (error) {
      console.error('Failed to fetch portfolio:', error);
      alert('Failed to load portfolio');
      router.push('/admin/portfolios');
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

      const payload = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
        technologies: formData.technologies,
        category: formData.category,
        link: formData.link,
        github: formData.github,
      };

      await portfolioApi.update(id, payload);
      router.push('/admin/portfolios');
    } catch (error) {
      console.error('Failed to update portfolio:', error);
      alert('Failed to update portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div>
        <Header title="Edit Portfolio" subtitle="Loading..." />
        <div className="p-8 text-center text-gray-500">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div>
      <Header title="Edit Portfolio" subtitle={`Editing: ${formData.title}`} />
      
      <div className="p-8">
        <div className="max-w-4xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft size={20} />
            <span>Back to Portfolios</span>
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#483D8B] focus:border-[#483D8B] outline-none"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#483D8B] focus:border-[#483D8B] outline-none"
                  placeholder="Describe your project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormData(prev => ({ ...prev, imageFile: e.target.files![0] }));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#483D8B] focus:border-[#483D8B] outline-none"
                />
                {formData.image && !formData.imageFile && (
                  <p className="mt-2 text-sm text-gray-500">Current image URL: {formData.image}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#483D8B] focus:border-[#483D8B] outline-none"
                  >
                    <option value="" disabled>Select category</option>
                    <option value="web">Web</option>
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#483D8B] focus:border-[#483D8B] outline-none"
                    placeholder="https://project-demo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Repository
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#483D8B] focus:border-[#483D8B] outline-none"
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <TagInput
                label="Technologies/Tools Used"
                value={formData.technologies}
                onChange={(technologies) => setFormData(prev => ({ ...prev, technologies }))}
                placeholder="Add technology (e.g., Next.js, TypeScript)"
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
                  className="flex items-center gap-2 px-6 py-2 bg-[#483D8B] text-white rounded-lg hover:bg-[#3c45b9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  <span>{isLoading ? 'Updating...' : 'Update Portfolio'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
