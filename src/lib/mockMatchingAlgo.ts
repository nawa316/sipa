import { COTA, Anak } from "@/types";

export interface RadarData {
  subject: string;
  A: number; // Nilai Anak (Kebutuhan/Ekspektasi)
  B: number; // Nilai COTA (Kapasitas/Kondisi)
  fullMark: number;
}

export interface MatchingResultAlgo {
  cota: COTA;
  score: number;
  radarData: RadarData[];
  topFactors: string[];
  explanation: string;
}

// Deterministic random based on ID strings
const seedRandom = (str1: string, str2: string) => {
  let hash = 0;
  const combined = str1 + str2;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }
  const x = Math.sin(hash++) * 10000;
  return x - Math.floor(x);
};

export function simulateMatching(anak: Anak, cotaList: COTA[]): MatchingResultAlgo[] {
  // Hanya ambil COTA yang minimal sudah Terverifikasi
  const verifiedCota = cotaList.filter(c => c.statusVerifikasi === 'Terverifikasi');

  const results: MatchingResultAlgo[] = verifiedCota.map(cota => {
    // Generate pseudo-random metrics based on Anak ID and COTA ID for consistency
    const rand = (offset: number) => seedRandom(anak.id, cota.id + offset);

    const kesehatanMatch = Math.floor(60 + rand(1) * 40);
    const finansialMatch = Math.floor(50 + rand(2) * 50);
    const lingkunganMatch = Math.floor(70 + rand(3) * 30);
    const motivasiMatch = Math.floor(80 + rand(4) * 20);
    const dukunganMatch = Math.floor(65 + rand(5) * 35);
    const pernikahanMatch = Math.floor(75 + rand(6) * 25);

    // Calculate final weighted score
    const finalScore = Math.floor(
      (kesehatanMatch * 0.25) +
      (finansialMatch * 0.20) +
      (lingkunganMatch * 0.15) +
      (motivasiMatch * 0.15) +
      (dukunganMatch * 0.15) +
      (pernikahanMatch * 0.10)
    );

    const radarData: RadarData[] = [
      { subject: 'Kesehatan & Mental', A: 85, B: kesehatanMatch, fullMark: 100 },
      { subject: 'Finansial', A: 70, B: finansialMatch, fullMark: 100 },
      { subject: 'Lingkungan', A: 80, B: lingkunganMatch, fullMark: 100 },
      { subject: 'Motivasi', A: 90, B: motivasiMatch, fullMark: 100 },
      { subject: 'Dukungan Klg.', A: 75, B: dukunganMatch, fullMark: 100 },
      { subject: 'Stab. Pernikahan', A: 80, B: pernikahanMatch, fullMark: 100 },
    ];

    // Determine top factors
    const sortedFactors = [...radarData].sort((a, b) => b.B - a.B);
    const topFactors = [sortedFactors[0].subject, sortedFactors[1].subject];

    // Explainable AI string
    let explanation = `Kandidat ini memiliki tingkat kecocokan keseluruhan sebesar ${finalScore}%. `;
    if (finalScore >= 85) {
      explanation += `Model sangat merekomendasikan keluarga ${cota.namaSuami} & ${cota.namaIstri}. Kapasitas mereka di bidang ${topFactors[0]} sangat menonjol dan sesuai dengan profil kebutuhan spesifik anak. Lingkungan tumbuh kembang dinilai sangat kondusif.`;
    } else if (finalScore >= 70) {
      explanation += `Keluarga ini cukup memenuhi standar kelayakan dasar. Meskipun ada catatan pada bagian ${sortedFactors[sortedFactors.length - 1].subject}, namun kekuatan mereka di aspek ${topFactors[0]} bisa menjadi kompensasi yang baik.`;
    } else {
      explanation += `Tingkat kecocokan tergolong rendah. Terdapat kesenjangan signifikan pada aspek ${sortedFactors[sortedFactors.length - 1].subject} dan ${sortedFactors[sortedFactors.length - 2].subject} yang mungkin kurang optimal bagi perkembangan anak.`;
    }

    return {
      cota,
      score: finalScore,
      radarData,
      topFactors,
      explanation
    };
  });

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score).slice(0, 10); // Return top 10
}
