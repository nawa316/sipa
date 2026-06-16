import { Anak, COTA, MatchingResult, Verification, AdoptionProcess } from '../types';

export const mockAnak: Anak[] = [
  {
    id: 'A001',
    nama: 'Budi Santoso',
    tanggalLahir: '2022-05-10',
    jenisKelamin: 'L',
    status: 'Tersedia',
    kondisiFisik: 'Sehat',
    createdAt: '2023-01-15T08:00:00Z',
    updatedAt: '2023-01-15T08:00:00Z',
  },
  {
    id: 'A002',
    nama: 'Siti Aminah',
    tanggalLahir: '2023-02-20',
    jenisKelamin: 'P',
    status: 'Proses Matching',
    kondisiFisik: 'Sehat',
    createdAt: '2023-03-10T09:30:00Z',
    updatedAt: '2023-04-01T10:00:00Z',
  }
];

export const mockCOTA: COTA[] = [
  {
    id: 'C001',
    namaSuami: 'Agus Pratama',
    namaIstri: 'Rina Wati',
    nikSuami: '3578012345678901',
    nikIstri: '3578012345678902',
    alamat: 'Jl. Mawar No. 10, Surabaya',
    pekerjaanSuami: 'Pegawai Swasta',
    pekerjaanIstri: 'Ibu Rumah Tangga',
    penghasilan: 10000000,
    statusPernikahan: 'Menikah',
    lamaPernikahan: 7,
    statusVerifikasi: 'Terverifikasi',
    createdAt: '2023-02-01T10:00:00Z',
    updatedAt: '2023-02-15T14:00:00Z',
  }
];

export const mockMatching: MatchingResult[] = [
  {
    id: 'M001',
    cotaId: 'C001',
    anakId: 'A002',
    skor: 95,
    status: 'Disetujui',
    catatan: 'Cocok dari segi kesiapan ekonomi dan lingkungan.',
    createdAt: '2023-04-05T09:00:00Z',
    updatedAt: '2023-04-06T10:00:00Z',
  }
];

export const mockVerification: Verification[] = [
  {
    id: 'V001',
    cotaId: 'C001',
    dokumen: 'KTP, KK, Surat Nikah, Slip Gaji',
    status: 'Valid',
    keterangan: 'Dokumen lengkap dan sesuai.',
    verifiedBy: 'Admin1',
    verifiedAt: '2023-02-15T14:00:00Z',
  }
];

export const mockAdoptionProcess: AdoptionProcess[] = [
  {
    id: 'P001',
    cotaId: 'C001',
    anakId: 'A002',
    tahap: 'Penyerahan Sementara',
    status: 'Proses',
    startDate: '2023-04-10T08:00:00Z',
  }
];
