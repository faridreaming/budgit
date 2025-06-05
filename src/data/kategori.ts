export type Kategori = {
  id: number
  jenis: 'pengeluaran' | 'penghasilan'
  nama: string
  icon: string
}

export const kategori: Kategori[] = [
  {
    id: 1,
    jenis: 'pengeluaran',
    nama: 'Transportasi',
    icon: '🚗',
  },
  {
    id: 2,
    jenis: 'pengeluaran',
    nama: 'Kebutuhan',
    icon: '🥣',
  },
  {
    id: 3,
    jenis: 'penghasilan',
    nama: 'Gaji',
    icon: '💼',
  },
  {
    id: 4,
    jenis: 'penghasilan',
    nama: 'Uang saku',
    icon: '💵',
  },
  {
    id: 5,
    jenis: 'pengeluaran',
    nama: 'Keluarga',
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 6,
    jenis: 'pengeluaran',
    nama: 'Pendidikan',
    icon: '🎓',
  },
  {
    id: 7,
    jenis: 'pengeluaran',
    nama: 'Hiburan',
    icon: '🎮',
  },
  {
    id: 8,
    jenis: 'pengeluaran',
    nama: 'Kesehatan',
    icon: '🏥',
  },
  {
    id: 9,
    jenis: 'pengeluaran',
    nama: 'Makanan & Minuman',
    icon: '🍔',
  },
  {
    id: 10,
    jenis: 'pengeluaran',
    nama: 'Belanja',
    icon: '🛍️',
  },
  {
    id: 11,
    jenis: 'pengeluaran',
    nama: 'Donasi',
    icon: '🤲',
  },
  {
    id: 12,
    jenis: 'penghasilan',
    nama: 'Freelance',
    icon: '🧑‍💻',
  },
  {
    id: 13,
    jenis: 'penghasilan',
    nama: 'Bisnis',
    icon: '🏪',
  },
  {
    id: 14,
    jenis: 'penghasilan',
    nama: 'Investasi',
    icon: '📈',
  },
  {
    id: 15,
    jenis: 'pengeluaran',
    nama: 'Langganan',
    icon: '📺',
  },
  {
    id: 16,
    jenis: 'pengeluaran',
    nama: 'Tagihan',
    icon: '🧾',
  },
]
