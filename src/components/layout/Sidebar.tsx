import Link from 'next/link';

export default function Sidebar() {
  const menus = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Manajemen Anak', href: '/anak' },
    { name: 'Manajemen COTA', href: '/cota' },
    { name: 'Verifikasi Dokumen', href: '/verifikasi' },
    { name: 'Smart Matching', href: '/matching' },
    { name: 'Tracking Proses', href: '/tracking' },
    { name: 'Laporan & Analitik', href: '/laporan' },
    { name: 'Pengaturan Sistem', href: '/pengaturan' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">SIPA</h1>
        <p className="text-sm text-gray-400">UPT PPSAB Jawa Timur</p>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {menus.map((menu) => (
            <li key={menu.name}>
              <Link
                href={menu.href}
                className="block px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
