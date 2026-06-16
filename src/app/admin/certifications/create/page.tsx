'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header';
import { certificationApi } from '@/lib/api';

export default function CreateCertificationPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      if (data.date === '') data.date = null;
      await certificationApi.create(data);
      router.push('/admin/certifications');
    } catch (e: any) {
      alert('Failed to create: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Create Certification" subtitle="Add new certification" />
      <div className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block mb-1 capitalize">Name</label>
            <input type="text" required {...register('name')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Issuer</label>
            <input type="text" {...register('issuer')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Date</label>
            <input type="date" required {...register('date')} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block mb-1 capitalize">Credential URL</label>
            <input type="text" {...register('credential_url')} className="w-full p-2 border rounded" />
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
