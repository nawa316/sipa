import { Users, FileText, CheckCircle, TrendingUp } from "lucide-react";

export function KPIGrid() {
  const metrics = [
    {
      title: "Anak Tersedia",
      value: "145",
      trend: "+12% dari bulan lalu",
      isPositive: true,
      icon: Users,
      color: "blue"
    },
    {
      title: "COTA Terverifikasi",
      value: "84",
      trend: "+5% dari bulan lalu",
      isPositive: true,
      icon: CheckCircle,
      color: "emerald"
    },
    {
      title: "Proses Adopsi Berjalan",
      value: "32",
      trend: "-2% dari bulan lalu",
      isPositive: false,
      icon: FileText,
      color: "amber"
    },
    {
      title: "Keberhasilan Matching",
      value: "92%",
      trend: "+8% dari kuartal lalu",
      isPositive: true,
      icon: TrendingUp,
      color: "indigo"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl bg-${metric.color}-50 text-${metric.color}-600`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{metric.title}</p>
              <h3 className="text-3xl font-black text-slate-900">{metric.value}</h3>
              <p className={`text-xs font-semibold mt-2 ${metric.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metric.trend}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
