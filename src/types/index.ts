export interface Anak {
  id: string;
  nama: string;
  tanggalLahir: string;
  jenisKelamin: 'L' | 'P';
  status: 'Tersedia' | 'Proses Matching' | 'Diadopsi';
  kondisiFisik: string;
  fotoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface COTA {
  id: string;
  namaSuami: string;
  namaIstri: string;
  nikSuami: string;
  nikIstri: string;
  alamat: string;
  pekerjaanSuami: string;
  pekerjaanIstri: string;
  penghasilan: number;
  statusPernikahan: string;
  lamaPernikahan: number;
  statusVerifikasi: 'Belum Diverifikasi' | 'Proses' | 'Terverifikasi' | 'Ditolak';
  createdAt: string;
  updatedAt: string;
}

export interface MatchingResult {
  id: string;
  cotaId: string;
  anakId: string;
  skor: number;
  status: 'Rekomendasi' | 'Disetujui' | 'Ditolak';
  catatan: string;
  createdAt: string;
  updatedAt: string;
}

export interface Verification {
  id: string;
  cotaId: string;
  dokumen: string;
  status: 'Valid' | 'Tidak Valid' | 'Menunggu';
  keterangan: string;
  verifiedBy: string;
  verifiedAt: string;
}

export interface AdoptionProcess {
  id: string;
  cotaId: string;
  anakId: string;
  tahap: 'Pengajuan' | 'Bimbingan' | 'Penyerahan Sementara' | 'Sidang Pengadilan' | 'Selesai';
  status: 'Proses' | 'Selesai' | 'Batal';
  startDate: string;
  endDate?: string;
}
