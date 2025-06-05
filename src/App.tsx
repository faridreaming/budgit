import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import RiwayatTransaksi from '@/components/riwayat-transaksi/page'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import TambahTransaksi from '@/components/TambahTransaksi'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Kategori } from '@/data/kategori'

type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori_id: Kategori['id']
  deskripsi: string | null
}

const transaksi: Transaksi[] = [
  {
    id: 1,
    tanggal: new Date('2025-05-04'),
    jumlah: 100000,
    keterangan: 'Belanja bulanan',
    kategori_id: 10,
    deskripsi: null,
  },
  {
    id: 2,
    tanggal: new Date('2025-05-02'),
    jumlah: 150000,
    keterangan: 'Gaji freelance',
    deskripsi: 'Project desain UI',
    kategori_id: 3,
  },
  {
    id: 3,
    tanggal: new Date('2025-05-03'),
    jumlah: 30000,
    keterangan: 'Ngopi di kafe',
    deskripsi: null,
    kategori_id: 9,
  },
  {
    id: 4,
    tanggal: new Date('2025-05-04'),
    jumlah: 50000,
    keterangan: 'Top-up e-wallet',
    deskripsi: 'Top-up OVO',
    kategori_id: 1,
  },
  {
    id: 5,
    tanggal: new Date('2025-05-05'),
    jumlah: 25_000_000,
    keterangan: 'Gaji bulanan',
    deskripsi: 'Gaji bulanan dari perusahaan',
    kategori_id: 3,
  },
  {
    id: 6,
    tanggal: new Date('2025-05-06'),
    jumlah: 45000,
    keterangan: 'Beli buku',
    deskripsi: 'Buku Pemrograman',
    kategori_id: 6,
  },
  {
    id: 7,
    tanggal: new Date('2025-05-07'),
    jumlah: 120000,
    keterangan: 'Project front-end',
    deskripsi: null,
    kategori_id: 3,
  },
  {
    id: 8,
    tanggal: new Date('2025-05-08'),
    jumlah: 20000,
    keterangan: 'Parkir kampus',
    deskripsi: null,
    kategori_id: 1,
  },
  {
    id: 9,
    tanggal: new Date('2025-05-09'),
    jumlah: 80000,
    keterangan: 'Beli kuota internet',
    deskripsi: '20GB untuk kuliah online',
    kategori_id: 6,
  },
  {
    id: 10,
    tanggal: new Date('2025-05-10'),
    jumlah: 100000,
    keterangan: 'Bantu orang tua',
    deskripsi: 'Transfer uang bulanan',
    kategori_id: 5,
  },
  {
    id: 11,
    tanggal: new Date('2025-05-11'),
    jumlah: 250000,
    keterangan: 'Project design',
    deskripsi: 'Logo design for client',
    kategori_id: 3,
  },
  {
    id: 12,
    tanggal: new Date('2025-05-12'),
    jumlah: 35000,
    keterangan: 'Ojek online',
    deskripsi: 'Pergi ke kampus',
    kategori_id: 1,
  },
  {
    id: 13,
    tanggal: new Date('2025-05-13'),
    jumlah: 150000,
    keterangan: 'Paket data',
    deskripsi: 'Unlimited 30 hari',
    kategori_id: 6,
  },
  {
    id: 14,
    tanggal: new Date('2025-05-14'),
    jumlah: 500000,
    keterangan: 'Uang sekolah adik',
    deskripsi: 'SPP bulan Mei',
    kategori_id: 5,
  },
  {
    id: 15,
    tanggal: new Date('2025-05-15'),
    jumlah: 300000,
    keterangan: 'Freelance project',
    deskripsi: 'Website maintenance',
    kategori_id: 3,
  },
]

function App() {
  return (
    <ThemeProvider>
      <div className="bg-background min-h-screen">
        <ScrollArea className="hidden h-screen sm:block">
          <div className="container mx-auto w-full max-w-xl px-4 py-6 sm:px-6">
            <Card className="relative">
              <CardHeader>
                <CardTitle>💰 BUDGIT</CardTitle>
                <CardDescription>Aplikasi Catatan Keuangan Pribadi</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3">
                <Card>
                  <CardHeader>
                    <CardDescription className="relative flex items-center justify-between gap-2">
                      Total Transaksi
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">Rp100.000</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">+Rp100.000 transaksi bulan ini</div>
                    <div className="text-muted-foreground">Terakhir transaksi 13 hari yang lalu</div>
                  </CardContent>
                  <CardFooter>
                    <TambahTransaksi />
                  </CardFooter>
                </Card>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardDescription className="flex items-center justify-between gap-2">
                        Total Pengeluaran <ArrowUpRight size={16} className="text-red-500 dark:text-red-400" />
                      </CardDescription>
                      <CardTitle className="text-2xl font-semibold text-red-500 tabular-nums dark:text-red-400">
                        Rp50.000
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardDescription className="flex items-center justify-between gap-2">
                        Total Penghasilan <ArrowDownLeft size={16} className="text-green-500 dark:text-green-400" />
                      </CardDescription>
                      <CardTitle className="text-2xl font-semibold text-green-500 tabular-nums dark:text-green-400">
                        Rp50.000
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <ModeToggle />
              </div>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
              </CardHeader>
              <CardContent>
                <RiwayatTransaksi data={transaksi} />
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
        <div className="container mx-auto w-full max-w-xl px-4 py-6 sm:hidden sm:px-6">
          <Card className="relative">
            <CardHeader>
              <CardTitle>💰 BUDGIT</CardTitle>
              <CardDescription>Aplikasi Catatan Keuangan Pribadi</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Card>
                <CardHeader>
                  <CardDescription className="relative flex items-center justify-between gap-2">
                    Total Transaksi
                  </CardDescription>
                  <CardTitle className="text-2xl font-semibold tabular-nums">Rp100.000</CardTitle>
                </CardHeader>
                <CardContent className="flex-col items-start gap-1 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">+Rp100.000 transaksi bulan ini</div>
                  <div className="text-muted-foreground">Terakhir transaksi 13 hari yang lalu</div>
                </CardContent>
                <CardFooter>
                  <TambahTransaksi />
                </CardFooter>
              </Card>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardDescription className="flex items-center justify-between gap-2">
                      Total Pengeluaran <ArrowUpRight size={16} />
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">Rp50.000</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription className="flex items-center justify-between gap-2">
                      Total Penghasilan <ArrowDownLeft size={16} />
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">Rp50.000</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
              <ModeToggle />
            </div>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Riwayat Transaksi</CardTitle>
            </CardHeader>
            <CardContent>
              <RiwayatTransaksi data={transaksi} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
