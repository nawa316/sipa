export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="font-semibold text-gray-700">
        Sistem Informasi Pelayanan Adopsi Anak
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Admin</span>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          A
        </div>
      </div>
    </header>
  );
}
