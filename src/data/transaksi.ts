export type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori: Kategori
  deskripsi: string | null
}

export type Kategori = {
  id: number
  jenis: 'pengeluaran' | 'penghasilan'
  nama: string
  icon: string
}

export const transaksi: Transaksi[] = [
  {
    id: 1,
    tanggal: new Date('2025-05-04'),
    jumlah: 100000,
    keterangan: 'Belanja bulanan',
    kategori: {
      id: 1,
      jenis: 'pengeluaran',
      nama: 'Belanja',
      icon: '🛍️',
    },
    deskripsi: null,
  },
  {
    id: 2,
    tanggal: new Date('2025-05-02'),
    jumlah: 150000,
    keterangan: 'Gaji freelance',
    deskripsi: 'Project desain UI',
    kategori: {
      id: 2,
      jenis: 'penghasilan',
      nama: 'Gaji',
      icon: '💼',
    },
  },
  {
    id: 3,
    tanggal: new Date('2025-05-03'),
    jumlah: 30000,
    keterangan: 'Ngopi di kafe',
    deskripsi: null,
    kategori: {
      id: 3,
      jenis: 'pengeluaran',
      nama: 'Makanan & Minuman',
      icon: '☕',
    },
  },
  {
    id: 4,
    tanggal: new Date('2025-05-04'),
    jumlah: 50000,
    keterangan: 'Top-up e-wallet',
    deskripsi: 'Top-up OVO',
    kategori: {
      id: 4,
      jenis: 'pengeluaran',
      nama: 'Transportasi',
      icon: '🚌',
    },
  },
  {
    id: 5,
    tanggal: new Date('2025-05-05'),
    jumlah: 25_000_000,
    keterangan: 'Gaji bulanan',
    deskripsi: 'Gaji bulanan dari perusahaan',
    kategori: {
      id: 2,
      jenis: 'penghasilan',
      nama: 'Gaji',
      icon: '💼',
    },
  },
  {
    id: 6,
    tanggal: new Date('2025-05-06'),
    jumlah: 45000,
    keterangan: 'Beli buku',
    deskripsi: 'Buku Pemrograman',
    kategori: {
      id: 5,
      jenis: 'pengeluaran',
      nama: 'Edukasi',
      icon: '📚',
    },
  },
  {
    id: 7,
    tanggal: new Date('2025-05-07'),
    jumlah: 120000,
    keterangan: 'Project front-end',
    deskripsi: null,
    kategori: {
      id: 2,
      jenis: 'penghasilan',
      nama: 'Gaji',
      icon: '💼',
    },
  },
  {
    id: 8,
    tanggal: new Date('2025-05-08'),
    jumlah: 20000,
    keterangan: 'Parkir kampus',
    deskripsi: null,
    kategori: {
      id: 4,
      jenis: 'pengeluaran',
      nama: 'Transportasi',
      icon: '🚌',
    },
  },
  {
    id: 9,
    tanggal: new Date('2025-05-09'),
    jumlah: 80000,
    keterangan: 'Beli kuota internet',
    deskripsi: '20GB untuk kuliah online',
    kategori: {
      id: 6,
      jenis: 'pengeluaran',
      nama: 'Internet',
      icon: '🌐',
    },
  },
  {
    id: 10,
    tanggal: new Date('2025-05-10'),
    jumlah: 100000,
    keterangan: 'Bantu orang tua',
    deskripsi: 'Transfer uang bulanan',
    kategori: {
      id: 7,
      jenis: 'pengeluaran',
      nama: 'Keluarga',
      icon: '👪',
    },
  },
  {
    id: 11,
    tanggal: new Date('2025-05-11'),
    jumlah: 250000,
    keterangan: 'Project design',
    deskripsi: 'Logo design for client',
    kategori: {
      id: 2,
      jenis: 'penghasilan',
      nama: 'Gaji',
      icon: '💼',
    },
  },
  {
    id: 12,
    tanggal: new Date('2025-05-12'),
    jumlah: 35000,
    keterangan: 'Ojek online',
    deskripsi: 'Pergi ke kampus',
    kategori: {
      id: 4,
      jenis: 'pengeluaran',
      nama: 'Transportasi',
      icon: '🚌',
    },
  },
  {
    id: 13,
    tanggal: new Date('2025-05-13'),
    jumlah: 150000,
    keterangan: 'Paket data',
    deskripsi: 'Unlimited 30 hari',
    kategori: {
      id: 6,
      jenis: 'pengeluaran',
      nama: 'Internet',
      icon: '🌐',
    },
  },
  {
    id: 14,
    tanggal: new Date('2025-05-14'),
    jumlah: 500000,
    keterangan: 'Uang sekolah adik',
    deskripsi: 'SPP bulan Mei',
    kategori: {
      id: 7,
      jenis: 'pengeluaran',
      nama: 'Keluarga',
      icon: '👪',
    },
  },
  {
    id: 15,
    tanggal: new Date('2025-05-15'),
    jumlah: 300000,
    keterangan: 'Freelance project',
    deskripsi: 'Website maintenance',
    kategori: {
      id: 2,
      jenis: 'penghasilan',
      nama: 'Gaji',
      icon: '💼',
    },
  },
]
