import { Anak, COTA, MatchingResult, Verification, AdoptionProcess, ActivityLog, ChartDataPoint, VerificationItem, TrackingActivity, SystemUser, SystemAuditLog, AHPWeight } from '../types';

const generateBaseAnak = (idNum: number, nama: string, gender: 'L' | 'P', status: 'Tersedia' | 'Proses Matching' | 'Diadopsi', year: number, month: number, health: string): Anak => ({
  id: `A${idNum.toString().padStart(3, '0')}`,
  nama,
  tanggalLahir: `${year}-${month.toString().padStart(2, '0')}-15`,
  jenisKelamin: gender,
  status,
  kondisiFisik: health,
  fotoUrl: `https://i.pravatar.cc/150?u=${idNum}`,
  agama: 'Islam',
  informasiKesehatan: {
    golonganDarah: ['A', 'B', 'O', 'AB'][idNum % 4],
    tinggiBadan: 100 + (idNum % 30),
    beratBadan: 20 + (idNum % 15),
    riwayatPenyakit: health === 'Sehat' ? 'Tidak ada riwayat serius' : 'Membutuhkan observasi medis berkala',
    alergi: idNum % 5 === 0 ? 'Debu, Dingin' : 'Tidak ada',
  },
  pendidikan: {
    tingkat: year > 2018 ? 'Belum Sekolah' : (year > 2014 ? 'SD' : 'TK'),
    namaSekolah: year > 2018 ? '-' : 'SDN Sidoarjo 1',
    catatan: 'Aktif bersosialisasi dan suka menggambar.',
  },
  latarBelakangSosial: {
    asalUsul: 'Dinas Sosial Kabupaten Sidoarjo',
    alasanMasuk: idNum % 3 === 0 ? 'Ditemukan warga' : 'Diserahkan oleh keluarga jauh',
  },
  kebutuhanKhusus: idNum % 7 === 0 ? 'Terapi wicara ringan' : 'Tidak ada',
  informasiPenempatan: {
    wisma: ['Matahari', 'Melati', 'Anggrek'][idNum % 3],
    pengasuh: ['Ibu Retno', 'Ibu Siti', 'Ibu Nur'][idNum % 3],
    tanggalMasuk: `2023-${(idNum % 12) + 1}-10`,
  },
  catatanPekerjaSosial: 'Anak yang sangat ceria, mudah beradaptasi dengan lingkungan baru. Sangat menyukai kegiatan luar ruangan.',
  dokumen: [
    { id: `D${idNum}1`, name: 'Akta Kelahiran.pdf', type: 'pdf', url: '#', uploadDate: '2023-01-10' },
    { id: `D${idNum}2`, name: 'Rekam Medis Awal.pdf', type: 'pdf', url: '#', uploadDate: '2023-01-12' },
  ],
  timeline: [
    { id: `T${idNum}1`, date: '2023-01-10', title: 'Penerimaan Anak', description: 'Diterima di UPT PPSAB', type: 'entry' },
    { id: `T${idNum}2`, date: '2023-01-12', title: 'Pemeriksaan Kesehatan Awal', description: 'Diperiksa oleh dr. Andi', type: 'health' },
    { id: `T${idNum}3`, date: '2023-02-01', title: 'Penempatan Wisma', description: 'Dipindahkan ke Wisma Matahari', type: 'social' },
  ],
  createdAt: '2023-01-10T08:00:00Z',
  updatedAt: '2023-06-15T08:00:00Z',
});

// Generating 20 mock children
export const mockAnak: Anak[] = [
  generateBaseAnak(1, 'Budi Santoso', 'L', 'Tersedia', 2022, 5, 'Sehat'),
  generateBaseAnak(2, 'Siti Aminah', 'P', 'Proses Matching', 2023, 2, 'Sehat'),
  generateBaseAnak(3, 'Ahmad Fadil', 'L', 'Tersedia', 2021, 8, 'Sehat'),
  generateBaseAnak(4, 'Rina Permata', 'P', 'Tersedia', 2020, 11, 'Asma Ringan'),
  generateBaseAnak(5, 'Doni Pratama', 'L', 'Diadopsi', 2019, 3, 'Sehat'),
  generateBaseAnak(6, 'Dewi Lestari', 'P', 'Tersedia', 2022, 1, 'Sehat'),
  generateBaseAnak(7, 'Gilang Ramadhan', 'L', 'Proses Matching', 2021, 10, 'Alergi Susu Sapi'),
  generateBaseAnak(8, 'Tari Ayu', 'P', 'Tersedia', 2023, 7, 'Sehat'),
  generateBaseAnak(9, 'Bagas Putra', 'L', 'Tersedia', 2020, 4, 'Sehat'),
  generateBaseAnak(10, 'Sinta Maharani', 'P', 'Diadopsi', 2018, 12, 'Sehat'),
  generateBaseAnak(11, 'Rizal Akbar', 'L', 'Tersedia', 2022, 9, 'Sehat'),
  generateBaseAnak(12, 'Maya Sari', 'P', 'Proses Matching', 2023, 3, 'Sehat'),
  generateBaseAnak(13, 'Hadi Kusuma', 'L', 'Tersedia', 2021, 6, 'Sehat'),
  generateBaseAnak(14, 'Dinda Aulia', 'P', 'Tersedia', 2019, 2, 'Kebutuhan Khusus Ringan'),
  generateBaseAnak(15, 'Putra Bangsa', 'L', 'Tersedia', 2022, 8, 'Sehat'),
  generateBaseAnak(16, 'Nia Kurnia', 'P', 'Proses Matching', 2020, 5, 'Sehat'),
  generateBaseAnak(17, 'Faisal Riza', 'L', 'Tersedia', 2021, 1, 'Sehat'),
  generateBaseAnak(18, 'Lala Nabila', 'P', 'Diadopsi', 2022, 10, 'Sehat'),
  generateBaseAnak(19, 'Eka Saputra', 'L', 'Tersedia', 2023, 4, 'Sehat'),
  generateBaseAnak(20, 'Vina Oktavia', 'P', 'Tersedia', 2018, 9, 'Sehat'),
];

const generateBaseCOTA = (idNum: number): COTA => {
  const domisiliList = ['Surabaya', 'Sidoarjo', 'Malang', 'Gresik', 'Mojokerto'];
  const statusList: ('Belum Diverifikasi' | 'Proses' | 'Terverifikasi' | 'Ditolak')[] = ['Belum Diverifikasi', 'Proses', 'Terverifikasi', 'Ditolak'];
  
  const status = statusList[idNum % 4];
  const domisili = domisiliList[idNum % 5];
  const score = status === 'Terverifikasi' ? 85 + (idNum % 15) : (status === 'Ditolak' ? 40 + (idNum % 20) : 60 + (idNum % 20));

  return {
    id: `C${idNum.toString().padStart(3, '0')}`,
    namaSuami: `Suami ${idNum}`,
    namaIstri: `Istri ${idNum}`,
    nikSuami: `3578012345678${idNum.toString().padStart(3, '0')}`,
    nikIstri: `3578012345679${idNum.toString().padStart(3, '0')}`,
    domisili,
    alamatLengkap: `Jl. Pahlawan No. ${idNum}, ${domisili}`,
    telepon: `081234567${idNum.toString().padStart(3, '0')}`,
    email: `cota${idNum}@example.com`,
    pekerjaanSuami: idNum % 2 === 0 ? 'Wiraswasta' : 'Pegawai Swasta',
    pekerjaanIstri: idNum % 3 === 0 ? 'PNS' : 'Ibu Rumah Tangga',
    kemampuanFinansial: {
      penghasilanGabungan: 10000000 + (idNum * 500000),
      rataRataPengeluaran: 5000000 + (idNum * 200000),
      kepemilikanRumah: idNum % 4 === 0 ? 'Sewa / Kontrak' : 'Milik Sendiri',
    },
    statusPernikahan: 'Menikah',
    lamaPernikahan: 5 + (idNum % 10),
    jumlahAnakKandung: idNum % 3 === 0 ? 1 : 0,
    motivasiAdopsi: 'Kami sangat mendambakan kehadiran anak dalam keluarga kami untuk melengkapi kebahagiaan dan memberikan masa depan yang lebih baik bagi anak yang membutuhkan.',
    eligibilityScore: score,
    penilaianPekerjaSosial: status === 'Terverifikasi' ? 'Keluarga harmonis, kondisi finansial sangat memadai, lingkungan rumah aman untuk tumbuh kembang anak.' : 'Menunggu hasil asesmen lanjutan dari tim survei lapangan.',
    statusVerifikasi: status,
    dokumen: [
      { id: `DC${idNum}1`, name: 'KTP Suami & Istri.pdf', type: 'pdf', url: '#', uploadDate: '2023-01-10', verified: true },
      { id: `DC${idNum}2`, name: 'Kartu Keluarga.pdf', type: 'pdf', url: '#', uploadDate: '2023-01-10', verified: true },
      { id: `DC${idNum}3`, name: 'Slip Gaji / Keterangan Penghasilan.pdf', type: 'pdf', url: '#', uploadDate: '2023-01-11', verified: status !== 'Belum Diverifikasi' },
    ],
    riwayatVerifikasi: [
      { date: '2023-01-10', status: 'Belum Diverifikasi', note: 'Pendaftaran awal dan unggah dokumen' },
      ...(status !== 'Belum Diverifikasi' ? [{ date: '2023-01-15', status: 'Proses' as const, note: 'Pemeriksaan berkas administrasi' }] : []),
      ...(status === 'Terverifikasi' || status === 'Ditolak' ? [{ date: '2023-02-01', status, note: `Hasil sidang tim pertimbangan: ${status}` }] : []),
    ],
    createdAt: '2023-01-10T08:00:00Z',
    updatedAt: '2023-02-01T08:00:00Z',
  };
};

export const mockCOTA: COTA[] = Array.from({ length: 30 }, (_, i) => generateBaseCOTA(i + 1));

export const mockMatching: MatchingResult[] = [
  {
    id: 'M001',
    cotaId: 'C001',
    anakId: 'A002',
    cotaNames: 'Agus & Rina',
    anakName: 'Siti Aminah',
    skor: 95,
    status: 'Rekomendasi',
    catatan: 'Kecocokan profil yang sangat baik.',
    createdAt: '2023-04-05T09:00:00Z',
    updatedAt: '2023-04-06T10:00:00Z',
  },
  {
    id: 'M002',
    cotaId: 'C002',
    anakId: 'A001',
    cotaNames: 'Hendro & Yulia',
    anakName: 'Budi Santoso',
    skor: 88,
    status: 'Rekomendasi',
    catatan: 'Memenuhi syarat administratif.',
    createdAt: '2023-04-08T09:00:00Z',
    updatedAt: '2023-04-08T10:00:00Z',
  }
];

const generateDokumen = (baseId: string, progress: number): VerificationItem[] => {
  const docs = [
    { name: 'KTP Suami & Istri', id: `${baseId}-1` },
    { name: 'Kartu Keluarga', id: `${baseId}-2` },
    { name: 'Akta Nikah', id: `${baseId}-3` },
    { name: 'SKCK', id: `${baseId}-4` },
    { name: 'Surat Keterangan Sehat Jasmani & Rohani', id: `${baseId}-5` },
    { name: 'Slip Gaji / Keterangan Penghasilan', id: `${baseId}-6` },
  ];

  const validCount = Math.floor((progress / 100) * 6);
  
  return docs.map((doc, idx) => ({
    id: doc.id,
    name: doc.name,
    status: idx < validCount ? 'Valid' : (idx === validCount && progress > 0 && progress < 100 ? 'Revisi' : 'Menunggu'),
    fileUrl: '#',
    notes: idx === validCount && progress > 0 && progress < 100 ? 'Dokumen buram, harap unggah ulang dengan resolusi lebih tinggi.' : '',
  }));
};

export const mockVerification: Verification[] = mockCOTA.slice(0, 15).map((cota, idx) => {
  let status: 'Selesai' | 'Proses' | 'Menunggu' = 'Menunggu';
  let progress = 0;

  if (idx < 5) {
    status = 'Selesai';
    progress = 100;
  } else if (idx < 10) {
    status = 'Proses';
    progress = 33 + (idx % 3) * 16; // Random progress like 33%, 49%, etc.
  }

  return {
    id: `V${(idx + 1).toString().padStart(3, '0')}`,
    cotaId: cota.id,
    cotaNames: `${cota.namaSuami} & ${cota.namaIstri}`,
    status,
    progress,
    dokumen: generateDokumen(`V${(idx + 1).toString().padStart(3, '0')}`, progress),
    keterangan: status === 'Selesai' ? 'Semua dokumen valid dan memenuhi syarat administrasi.' : 'Menunggu pengecekan tim verifikator.',
    verifiedBy: status === 'Selesai' ? 'Admin Verifikator 1' : '-',
    verifiedAt: status === 'Selesai' ? '2023-02-15T14:00:00Z' : '-',
  };
});

export const STAGES = [
  'Registrasi', 
  'Pengumpulan Dokumen', 
  'Verifikasi', 
  'Assessment', 
  'Matching', 
  'Rekomendasi', 
  'Proses Hukum', 
  'Adopsi Selesai'
];

export const mockAdoptionProcess: AdoptionProcess[] = mockCOTA.slice(0, 10).map((cota, idx) => {
  const isFinished = idx === 0;
  const isPendingDoc = idx === 1;
  const isMatching = idx === 2;
  const isCourt = idx === 3;
  
  let currentStage: any = 'Assessment';
  let progressPercentage = 50;
  let status: any = 'Aktif';
  
  if (isFinished) {
    currentStage = 'Adopsi Selesai';
    progressPercentage = 100;
    status = 'Selesai';
  } else if (isPendingDoc) {
    currentStage = 'Pengumpulan Dokumen';
    progressPercentage = 25;
  } else if (isMatching) {
    currentStage = 'Matching';
    progressPercentage = 62;
  } else if (isCourt) {
    currentStage = 'Proses Hukum';
    progressPercentage = 87;
  } else {
    currentStage = ['Registrasi', 'Verifikasi', 'Assessment'][idx % 3];
    progressPercentage = currentStage === 'Registrasi' ? 12 : currentStage === 'Verifikasi' ? 37 : 50;
  }

  const timeline: TrackingActivity[] = [
    {
      id: `TL-${idx}-1`,
      date: '2023-01-10T09:00:00Z',
      stage: 'Registrasi',
      title: 'Pendaftaran COTA',
      description: 'COTA berhasil mendaftarkan diri pada sistem SIPA dan melengkapi formulir dasar.',
      actor: 'Sistem'
    }
  ];

  if (progressPercentage >= 25) {
    timeline.unshift({
      id: `TL-${idx}-2`,
      date: '2023-01-15T14:30:00Z',
      stage: 'Pengumpulan Dokumen',
      title: 'Unggah Berkas Awal',
      description: 'COTA mengunggah berkas identitas dan dokumen finansial tahap pertama.',
      actor: 'Sistem'
    });
  }

  if (progressPercentage >= 37) {
    timeline.unshift({
      id: `TL-${idx}-3`,
      date: '2023-02-01T10:15:00Z',
      stage: 'Verifikasi',
      title: 'Verifikasi Berkas Disetujui',
      description: 'Tim Dinas Sosial menyatakan berkas administrasi COTA sah dan lengkap.',
      actor: 'Admin Verifikator'
    });
  }

  if (progressPercentage >= 50) {
    timeline.unshift({
      id: `TL-${idx}-4`,
      date: '2023-02-20T11:00:00Z',
      stage: 'Assessment',
      title: 'Kunjungan Rumah (Home Visit)',
      description: 'Pekerja sosial melakukan observasi lingkungan dan wawancara motivasi adopsi.',
      actor: 'Pekerja Sosial'
    });
  }
  
  if (progressPercentage >= 62) {
    timeline.unshift({
      id: `TL-${idx}-5`,
      date: '2023-03-10T09:00:00Z',
      stage: 'Matching',
      title: 'Simulasi Pencocokan',
      description: 'Sistem merekomendasikan kecocokan dengan profil anak A001.',
      actor: 'Sistem'
    });
  }

  return {
    id: `P${(idx + 1).toString().padStart(3, '0')}`,
    cotaId: cota.id,
    cotaNames: `${cota.namaSuami} & ${cota.namaIstri}`,
    anakId: progressPercentage >= 62 ? 'A001' : undefined,
    anakName: progressPercentage >= 62 ? 'Budi Santoso' : undefined,
    currentStage,
    progressPercentage,
    status,
    startDate: '2023-01-10T09:00:00Z',
    lastUpdated: timeline[0].date,
    estimatedNextStep: progressPercentage === 100 ? '-' : 'Menunggu penjadwalan dari koordinator provinsi',
    timeline
  };
});

export const mockActivities: ActivityLog[] = [
  {
    id: 'ACT001',
    action: 'Verifikasi Dokumen COTA',
    description: 'Dokumen Bapak Agus & Ibu Rina telah berhasil diverifikasi.',
    timestamp: '2 Jam yang lalu',
    iconType: 'document',
  },
  {
    id: 'ACT002',
    action: 'Pendaftaran COTA Baru',
    description: 'Keluarga Bapak Hendro mendaftar sebagai COTA.',
    timestamp: '5 Jam yang lalu',
    iconType: 'user',
  },
  {
    id: 'ACT003',
    action: 'Smart Matching Berhasil',
    description: 'Pencocokan sistem merekomendasikan Siti Aminah dengan COTA C001.',
    timestamp: '1 Hari yang lalu',
    iconType: 'match',
  },
  {
    id: 'ACT004',
    action: 'Pembaruan Sistem',
    description: 'Update versi SIPA v2.1.0 selesai dilakukan.',
    timestamp: '2 Hari yang lalu',
    iconType: 'system',
  }
];

export const mockChartData: ChartDataPoint[] = [
  { month: 'Jan', anakMasuk: 12, adopsiSelesai: 4 },
  { month: 'Feb', anakMasuk: 8, adopsiSelesai: 6 },
  { month: 'Mar', anakMasuk: 15, adopsiSelesai: 8 },
  { month: 'Apr', anakMasuk: 10, adopsiSelesai: 12 },
  { month: 'May', anakMasuk: 9, adopsiSelesai: 9 },
  { month: 'Jun', anakMasuk: 14, adopsiSelesai: 11 },
];

export const mockSystemUsers: SystemUser[] = [
  { id: 'U001', name: 'Dr. Hendra Wijaya', email: 'hendra.w@sipa.jatimprov.go.id', role: 'Kepala UPT', status: 'Aktif', lastLogin: '2023-06-16T08:30:00Z' },
  { id: 'U002', name: 'Admin SIPA Pusat', email: 'admin@sipa.jatimprov.go.id', role: 'Super Admin', status: 'Aktif', lastLogin: '2023-06-16T09:15:00Z' },
  { id: 'U003', name: 'Siti Rahmawati, S.Sos', email: 'siti.rahma@sipa.jatimprov.go.id', role: 'Pekerja Sosial', status: 'Aktif', lastLogin: '2023-06-15T14:20:00Z' },
  { id: 'U004', name: 'Budi Santoso', email: 'budi.s@sipa.jatimprov.go.id', role: 'Verifikator', status: 'Aktif', lastLogin: '2023-06-16T07:45:00Z' },
  { id: 'U005', name: 'Rina Kusuma', email: 'rina.k@sipa.jatimprov.go.id', role: 'Pekerja Sosial', status: 'Nonaktif', lastLogin: '2023-05-10T11:00:00Z' },
];

export const mockAuditLogs: SystemAuditLog[] = [
  { id: 'LOG-1001', timestamp: '2023-06-16T09:15:00Z', actor: 'Admin SIPA Pusat', action: 'LOGIN', target: 'Sistem Inti', ipAddress: '192.168.1.105' },
  { id: 'LOG-1002', timestamp: '2023-06-16T08:45:00Z', actor: 'Budi Santoso', action: 'VERIFY_DOC', target: 'COTA C005', ipAddress: '192.168.1.112' },
  { id: 'LOG-1003', timestamp: '2023-06-15T15:30:00Z', actor: 'Dr. Hendra Wijaya', action: 'APPROVE_MATCHING', target: 'Matching M001', ipAddress: '192.168.1.200' },
  { id: 'LOG-1004', timestamp: '2023-06-15T14:20:00Z', actor: 'Siti Rahmawati, S.Sos', action: 'UPLOAD_ASSESSMENT', target: 'COTA C002', ipAddress: '192.168.1.154' },
  { id: 'LOG-1005', timestamp: '2023-06-14T10:00:00Z', actor: 'Admin SIPA Pusat', action: 'CHANGE_ROLE', target: 'User U005', ipAddress: '192.168.1.105' },
];

export const mockAHPWeights: AHPWeight[] = [
  { id: 'W001', criteria: 'Kesehatan Fisik & Mental', weightPercentage: 25, description: 'Bobot prioritas untuk kecocokan rekam medis.' },
  { id: 'W002', criteria: 'Stabilitas Finansial', weightPercentage: 20, description: 'Kemampuan ekonomi COTA menghidupi anak.' },
  { id: 'W003', criteria: 'Lingkungan Tempat Tinggal', weightPercentage: 15, description: 'Kondisi sanitasi dan kelayakan rumah.' },
  { id: 'W004', criteria: 'Motivasi Adopsi', weightPercentage: 15, description: 'Niat tulus dan persiapan psikologis.' },
  { id: 'W005', criteria: 'Dukungan Keluarga', weightPercentage: 15, description: 'Persetujuan dari keluarga besar COTA.' },
  { id: 'W006', criteria: 'Stabilitas Pernikahan', weightPercentage: 10, description: 'Keharmonisan rumah tangga COTA.' },
];
