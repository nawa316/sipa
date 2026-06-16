import { CheckCircle2, FileSignature } from "lucide-react";

export function RecommendationSummary({ score }: { score: number }) {
  const getVerdict = () => {
    if (score >= 85) return {
      title: "Sangat Direkomendasikan",
      color: "emerald",
      desc: "Kandidat ini memiliki profil yang sangat selaras dengan kebutuhan spesifik anak. Kapasitas finansial, stabilitas, dan motivasi dinilai sangat memadai untuk mendukung proses tumbuh kembang anak secara optimal."
    };
    if (score >= 70) return {
      title: "Direkomendasikan dengan Catatan",
      color: "amber",
      desc: "Secara umum memenuhi kriteria minimal kelayakan adopsi. Namun, diperlukan bimbingan atau observasi khusus pasca-adopsi terkait beberapa kesenjangan profil yang terdeteksi."
    };
    return {
      title: "Tidak Direkomendasikan",
      color: "rose",
      desc: "Kandidat memiliki kesenjangan kapasitas yang terlalu jauh dari kebutuhan spesifik anak ini. Disarankan untuk memprioritaskan kandidat lain."
    };
  };

  const verdict = getVerdict();

  return (
    <div className={`bg-${verdict.color}-50 border border-${verdict.color}-200 rounded-2xl p-8`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 bg-${verdict.color}-100 rounded-xl shrink-0 text-${verdict.color}-600`}>
          {score >= 70 ? <CheckCircle2 className="w-8 h-8" /> : <FileSignature className="w-8 h-8" />}
        </div>
        <div>
          <h2 className={`text-xl font-bold text-${verdict.color}-900 mb-2`}>
            Kesimpulan: {verdict.title}
          </h2>
          <p className={`text-${verdict.color}-800 leading-relaxed`}>
            {verdict.desc}
          </p>
          
          <div className="mt-6 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm">
              <span className="text-black/50 block mb-1">Disetujui Oleh Tim Pertimbangan</span>
              <span className={`font-bold text-${verdict.color}-900`}>Kepala UPT PPSAB Jawa Timur</span>
            </div>
            <div className="w-48 h-16 border-2 border-dashed border-black/10 rounded-lg flex items-center justify-center text-xs font-medium text-black/30">
              Tempat Tanda Tangan
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
