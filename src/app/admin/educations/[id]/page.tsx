'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import { educationApi } from '@/lib/api';

export default function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    educationApi.getById(parseInt(resolvedParams.id)).then((data) => {
      const formattedData = { ...data };
      if (formattedData.start_date) formattedData.start_date = formattedData.start_date.split('T')[0];
      if (formattedData.end_date) formattedData.end_date = formattedData.end_date.split('T')[0];
      reset(formattedData);
    });
  }, [resolvedParams.id, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (data.start_date === '') data.start_date = null;
      if (data.end_date === '') data.end_date = null;
      await educationApi.update(parseInt(resolvedParams.id), data);
      router.push('/admin/educations');
    } catch (e: any) {
      alert('Failed to update: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Edit Education" subtitle="Update education" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block mb-1 capitalize">Institution</label>
            <input type="text" required {...register('institution')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Degree</label>
            <input type="text" {...register('degree')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Major</label>
            <input type="text" {...register('major')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Start Date</label>
            <input type="date" required {...register('start_date')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">End Date</label>
            <input type="date" {...register('end_date')} className="w-full p-2 border rounded" />
            <p className="text-xs text-gray-500 mt-1">Leave empty if ongoing</p>
          </div>
          <div>
            <label className="block mb-1 capitalize">GPA</label>
            <input type="text" {...register('gpa')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Description</label>
            <textarea {...register('description')} className="w-full p-2 border rounded" rows={4} />
          </div>
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-[#3c45b9] text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
