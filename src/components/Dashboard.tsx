import { ModeToggle } from '@/components/mode-toggle'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import TambahTransaksi from '@/components/TambahTransaksi'
import type { Kategori } from '@/data/kategori'
import { kategori } from '@/data/kategori'
import icon from '@/assets/icon.png'
import CountUp from 'react-countup'

type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori_id: Kategori['id']
  deskripsi: string | null
}

export default function Dashboard({
  transaksi,
  addTransaksi,
}: {
  transaksi: Transaksi[]
  addTransaksi: (transaksi: Transaksi) => void
}) {
  const totalTransaksi = transaksi.reduce((sum, t) => sum + t.jumlah, 0)
  const totalPengeluaran = transaksi
    .filter((t) => {
      const kategoriObj = kategori.find((k) => k.id === t.kategori_id)
      return kategoriObj?.jenis === 'pengeluaran'
    })
    .reduce((sum, t) => sum + t.jumlah, 0)
  const totalPenghasilan = transaksi
    .filter((t) => {
      const kategoriObj = kategori.find((k) => k.id === t.kategori_id)
      return kategoriObj?.jenis === 'penghasilan'
    })
    .reduce((sum, t) => sum + t.jumlah, 0)

  const lastTransactionDate =
    transaksi.length > 0 ? new Date(Math.max(...transaksi.map((t) => t.tanggal.getTime()))) : null
  const daysSinceLastTransaction = lastTransactionDate
    ? Math.floor((new Date().getTime() - lastTransactionDate.getTime()) / (1000 * 60 * 60 * 24))
    : null

  const now = new Date()
  const firstDayOfWeek = new Date(now)
  firstDayOfWeek.setDate(now.getDate() - now.getDay())
  firstDayOfWeek.setHours(0, 0, 0, 0)
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
  lastDayOfWeek.setHours(23, 59, 59, 999)

  const currentWeekTransactions = transaksi.filter((t) => t.tanggal >= firstDayOfWeek && t.tanggal <= lastDayOfWeek)
  const currentWeekTotal = currentWeekTransactions.reduce((sum, t) => sum + t.jumlah, 0)

  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <img src={icon} alt="Budgit" className="size-4" />
          BUDGIT
        </CardTitle>
        <CardDescription>Aplikasi Catatan Keuangan Pribadi</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3">
        <Card>
          <CardHeader>
            <CardDescription className="relative flex items-center justify-between gap-2">
              Total Transaksi
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums">
              Rp
              <CountUp end={totalTransaksi} duration={1.2} separator="." preserveValue={true} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {currentWeekTotal > 0 ? '+' : ''}Rp{currentWeekTotal.toLocaleString('id-ID')} transaksi minggu ini
            </div>
            <div className="text-muted-foreground">
              {daysSinceLastTransaction !== null
                ? daysSinceLastTransaction === 0
                  ? 'Terakhir transaksi hari ini'
                  : `Terakhir transaksi ${daysSinceLastTransaction} hari yang lalu`
                : 'Belum ada transaksi'}
            </div>
          </CardContent>
          <CardFooter>
            <TambahTransaksi onAddTransaksi={addTransaksi} transaksi={transaksi} />
          </CardFooter>
        </Card>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardDescription className="flex items-center justify-between gap-2">
                Total Pengeluaran <ArrowUpRight size={16} className="text-red-500 dark:text-red-400" />
              </CardDescription>
              <CardTitle className="text-2xl font-semibold text-red-500 tabular-nums dark:text-red-400">
                Rp
                <CountUp end={totalPengeluaran} duration={1.2} separator="." preserveValue={true} />
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription className="flex items-center justify-between gap-2">
                Total Penghasilan <ArrowDownLeft size={16} className="text-green-500 dark:text-green-400" />
              </CardDescription>
              <CardTitle className="text-2xl font-semibold text-green-500 tabular-nums dark:text-green-400">
                Rp
                <CountUp end={totalPenghasilan} duration={1.2} separator="." preserveValue={true} />
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ModeToggle />
      </div>
    </Card>
  )
}
