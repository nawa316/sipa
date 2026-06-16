export interface AnakDocument {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'word';
  url: string;
  uploadDate: string;
}

export interface AnakTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'entry' | 'health' | 'education' | 'social' | 'matching';
}

export interface Anak {
  id: string;
  nama: string;
  tanggalLahir: string; // YYYY-MM-DD
  jenisKelamin: 'L' | 'P';
  status: 'Tersedia' | 'Proses Matching' | 'Diadopsi';
  kondisiFisik: string;
  fotoUrl?: string;
  agama: string;
  
  // Extended Details
  informasiKesehatan: {
    golonganDarah: string;
    tinggiBadan: number; // cm
    beratBadan: number; // kg
    riwayatPenyakit: string;
    alergi: string;
  };
  pendidikan: {
    tingkat: string;
    namaSekolah: string;
    catatan: string;
  };
  latarBelakangSosial: {
    asalUsul: string;
    namaIbuKandung?: string;
    namaAyahKandung?: string;
    alasanMasuk: string;
  };
  kebutuhanKhusus: string;
  informasiPenempatan: {
    wisma: string;
    pengasuh: string;
    tanggalMasuk: string;
  };
  catatanPekerjaSosial: string;
  
  dokumen: AnakDocument[];
  timeline: AnakTimelineEvent[];
  
  createdAt: string;
  updatedAt: string;
}

export interface COTADocument {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'word';
  url: string;
  uploadDate: string;
  verified: boolean;
}

export interface COTA {
  id: string;
  namaSuami: string;
  namaIstri: string;
  nikSuami: string;
  nikIstri: string;
  
  // Expanded
  domisili: string;
  alamatLengkap: string;
  telepon: string;
  email: string;
  
  pekerjaanSuami: string;
  pekerjaanIstri: string;
  kemampuanFinansial: {
    penghasilanGabungan: number;
    rataRataPengeluaran: number;
    kepemilikanRumah: 'Milik Sendiri' | 'Sewa / Kontrak' | 'Menumpang';
  };
  
  statusPernikahan: 'Menikah' | 'Bercerai' | 'Janda/Duda';
  lamaPernikahan: number; // in years
  jumlahAnakKandung: number;
  
  motivasiAdopsi: string;
  eligibilityScore: number; // 0-100
  penilaianPekerjaSosial: string;
  
  statusVerifikasi: 'Belum Diverifikasi' | 'Proses' | 'Terverifikasi' | 'Ditolak';
  
  dokumen: COTADocument[];
  riwayatVerifikasi: {
    date: string;
    status: 'Belum Diverifikasi' | 'Proses' | 'Terverifikasi' | 'Ditolak';
    note: string;
  }[];
  
  createdAt: string;
  updatedAt: string;
}

export interface MatchingResult {
  id: string;
  cotaId: string;
  anakId: string;
  cotaNames: string;
  anakName: string;
  skor: number;
  status: 'Rekomendasi' | 'Disetujui' | 'Ditolak';
  catatan: string;
  createdAt: string;
  updatedAt: string;
}

export interface VerificationItem {
  id: string;
  name: string;
  status: 'Valid' | 'Revisi' | 'Menunggu';
  fileUrl: string;
  notes: string;
}

export interface Verification {
  id: string;
  cotaId: string;
  cotaNames: string; // added for display
  status: 'Selesai' | 'Proses' | 'Menunggu';
  progress: number; // percentage 0-100
  dokumen: VerificationItem[];
  keterangan: string;
  verifiedBy: string;
  verifiedAt: string;
}

export type AdoptionStage = 
  | 'Registrasi' 
  | 'Pengumpulan Dokumen' 
  | 'Verifikasi' 
  | 'Assessment' 
  | 'Matching' 
  | 'Rekomendasi' 
  | 'Proses Hukum' 
  | 'Adopsi Selesai';

export interface TrackingActivity {
  id: string;
  date: string;
  stage: AdoptionStage;
  title: string;
  description: string;
  actor: string;
}

export interface AdoptionProcess {
  id: string;
  cotaId: string;
  cotaNames: string;
  anakId?: string;
  anakName?: string;
  currentStage: AdoptionStage;
  progressPercentage: number;
  status: 'Aktif' | 'Ditunda' | 'Selesai' | 'Dibatalkan';
  startDate: string;
  lastUpdated: string;
  estimatedNextStep: string;
  timeline: TrackingActivity[];
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  iconType: 'user' | 'document' | 'match' | 'system';
}

export interface ChartDataPoint {
  month: string;
  anakMasuk: number;
  adopsiSelesai: number;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Kepala UPT' | 'Pekerja Sosial' | 'Verifikator';
  status: 'Aktif' | 'Nonaktif';
  lastLogin: string;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target: string;
  ipAddress: string;
}

export interface AHPWeight {
  id: string;
  criteria: string;
  weightPercentage: number;
  description: string;
}
