'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import { FileText, Briefcase, Award, TrendingUp } from 'lucide-react';
import { blogApi, portfolioApi, experienceApi } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    portfolios: 0,
    experiences: 0,
    loading: true,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogs, portfolios, experiences] = await Promise.all([
          blogApi.getAll(),
          portfolioApi.getAll(),
          experienceApi.getAll(),
        ]);

        setStats({
          blogs: blogs.length,
          portfolios: portfolios.length,
          experiences: experiences.length,
          loading: false,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening with your portfolio."
      />
      
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={FileText}
            title="Total Blogs"
            value={stats.loading ? '...' : stats.blogs}
            subtitle="Published articles"
            color="blue"
          />
          <StatsCard
            icon={Briefcase}
            title="Total Portfolios"
            value={stats.loading ? '...' : stats.portfolios}
            subtitle="Project showcases"
            color="purple"
          />
          <StatsCard
            icon={Award}
            title="Total Experiences"
            value={stats.loading ? '...' : stats.experiences}
            subtitle="Organizations & work"
            color="indigo"
          />
          <StatsCard
            icon={TrendingUp}
            title="Total Content"
            value={stats.loading ? '...' : stats.blogs + stats.portfolios + stats.experiences}
            subtitle="All items combined"
            color="blue"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 dm_serif_text mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/blogs/create"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#6b8af6] hover:bg-[#6b8af6]/5 transition-all group"
            >
              <div className="p-2 bg-[#6b8af6]/10 rounded-lg group-hover:bg-[#6b8af6] transition-colors">
                <FileText size={20} className="text-[#6b8af6] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New Blog</p>
                <p className="text-sm text-gray-500">Create blog post</p>
              </div>
            </a>

            <a
              href="/admin/portfolios/create"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#483D8B] hover:bg-[#483D8B]/5 transition-all group"
            >
              <div className="p-2 bg-[#483D8B]/10 rounded-lg group-hover:bg-[#483D8B] transition-colors">
                <Briefcase size={20} className="text-[#483D8B] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New Portfolio</p>
                <p className="text-sm text-gray-500">Add project</p>
              </div>
            </a>

            <a
              href="/admin/experiences/create"
              className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#3c45b9] hover:bg-[#3c45b9]/5 transition-all group"
            >
              <div className="p-2 bg-[#3c45b9]/10 rounded-lg group-hover:bg-[#3c45b9] transition-colors">
                <Award size={20} className="text-[#3c45b9] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New Experience</p>
                <p className="text-sm text-gray-500">Add experience</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
