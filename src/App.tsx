'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import RiwayatTransaksi from '@/components/riwayat-transaksi/page'
import { ArrowDownLeft, ArrowUpRight, Check } from 'lucide-react'
import TambahTransaksi from '@/components/TambahTransaksi'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Kategori } from '@/data/kategori'
import { kategori } from '@/data/kategori'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { useState, useEffect } from 'react'
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

function App() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>(() => {
    const savedTransaksi = localStorage.getItem('transaksi')
    if (savedTransaksi) {
      return JSON.parse(savedTransaksi).map((t: Omit<Transaksi, 'tanggal'> & { tanggal: string }) => ({
        ...t,
        tanggal: new Date(t.tanggal),
      }))
    }
    return []
  })

  useEffect(() => {
    localStorage.setItem('transaksi', JSON.stringify(transaksi))
  }, [transaksi])

  const addTransaksi = (newTransaksi: Transaksi) => {
    setTransaksi([...transaksi, newTransaksi])
    toast(`Berhasil! ${newTransaksi.keterangan} sebesar Rp${newTransaksi.jumlah.toLocaleString('id-ID')}`, {
      icon: <Check size={16} className="text-green-500 dark:text-green-400" />,
    })
  }

  const deleteTransaksi = (id: number) => {
    setTransaksi(transaksi.filter((t) => t.id !== id))
    toast('Transaksi berhasil dihapus!', {
      icon: <Check size={16} className="text-green-500 dark:text-green-400" />,
    })
  }

  const updateTransaksi = (updatedTransaksi: Transaksi) => {
    setTransaksi(transaksi.map((t) => (t.id === updatedTransaksi.id ? updatedTransaksi : t)))
    toast('Transaksi berhasil diubah!', {
      icon: <Check size={16} className="text-green-500 dark:text-green-400" />,
    })
  }

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
    <ThemeProvider>
      <Toaster position="bottom-right" />
      <div className="bg-background min-h-screen">
        {/* Desktop */}
        <ScrollArea className="hidden h-screen sm:block">
          <div className="container mx-auto w-full max-w-xl px-4 py-6 sm:px-6">
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
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
              </CardHeader>
              <CardContent>
                <RiwayatTransaksi
                  data={transaksi}
                  onDeleteTransaksi={deleteTransaksi}
                  onUpdateTransaksi={updateTransaksi}
                />
              </CardContent>
            </Card>
            <footer className="text-muted-foreground mt-6 text-center text-sm">
              Made with 🍞 by{' '}
              <a href="https://github.com/faridreaming" target="_blank" rel="noopener noreferrer" className="underline">
                @faridreaming
              </a>
            </footer>
          </div>
        </ScrollArea>
        {/* Mobile */}
        <div className="container mx-auto block w-full max-w-xl px-4 py-6 sm:hidden sm:px-6">
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
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Riwayat Transaksi</CardTitle>
            </CardHeader>
            <CardContent>
              <RiwayatTransaksi
                data={transaksi}
                onDeleteTransaksi={deleteTransaksi}
                onUpdateTransaksi={updateTransaksi}
              />
            </CardContent>
          </Card>
          <footer className="text-muted-foreground mt-6 text-center text-sm">
            Made with 🍞 by{' '}
            <a href="https://github.com/faridreaming" target="_blank" rel="noopener noreferrer" className="underline">
              @faridreaming
            </a>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
