'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Briefcase, Award, LogOut, User, GraduationCap, BadgeCheck, Trophy } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: User, label: 'Profile Settings', href: '/admin/profile' },
    { icon: FileText, label: 'Blogs', href: '/admin/blogs' },
    { icon: Briefcase, label: 'Portfolios', href: '/admin/portfolios' },
    { icon: GraduationCap, label: 'Educations', href: '/admin/educations' },
    { icon: BadgeCheck, label: 'Certifications', href: '/admin/certifications' },
    { icon: Award, label: 'Experiences', href: '/admin/experiences' },
    { icon: Trophy, label: 'Achievements', href: '/admin/achievements' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/login');
  };

  return (
    <aside className="w-64 bg-[#3c45b9] text-white min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-white/10">
        <h1 className="text-2xl font-bold dm_serif_text">Admin Panel</h1>
        <p className="text-sm text-white/70 mt-1">Profile Web</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#6b8af6] text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
