'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import { achievementApi } from '@/lib/api';

export default function EditAchievementPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    achievementApi.getById(parseInt(resolvedParams.id)).then((data) => {
      reset(data);
    });
  }, [resolvedParams.id, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await achievementApi.update(parseInt(resolvedParams.id), {
        ...data,
        year: parseInt(data.year, 10)
      });
      router.push('/admin/achievements');
    } catch (e: any) {
      alert('Failed to update: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Edit Achievement" subtitle="Update achievement" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block mb-1 capitalize">Title</label>
            <input type="text" required {...register('title')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Year</label>
            <input type="number" required {...register('year')} className="w-full p-2 border rounded" />
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
