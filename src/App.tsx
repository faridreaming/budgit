'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import RiwayatTransaksi from '@/components/riwayat-transaksi/page'
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import TambahTransaksi from '@/components/TambahTransaksi'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Kategori } from '@/data/kategori'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { useState, useEffect } from 'react'
import icon from '@/assets/icon.png'

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
    // Load transactions from localStorage on initial render
    const savedTransaksi = localStorage.getItem('transaksi')
    if (savedTransaksi) {
      // Parse the dates back to Date objects
      return JSON.parse(savedTransaksi).map((t: Omit<Transaksi, 'tanggal'> & { tanggal: string }) => ({
        ...t,
        tanggal: new Date(t.tanggal),
      }))
    }
    return []
  })

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transaksi', JSON.stringify(transaksi))
  }, [transaksi])

  const addTransaksi = (newTransaksi: Transaksi) => {
    setTransaksi([...transaksi, newTransaksi])
    toast('Transaksi berhasil ditambahkan', {
      description: `${newTransaksi.keterangan} - Rp${newTransaksi.jumlah.toLocaleString('id-ID')}`,
    })
  }

  // Calculate totals
  const totalTransaksi = transaksi.reduce((sum, t) => sum + t.jumlah, 0)
  const totalPengeluaran = transaksi.filter((t) => t.keterangan === 'Pengeluaran').reduce((sum, t) => sum + t.jumlah, 0)
  const totalPenghasilan = transaksi.filter((t) => t.keterangan === 'Penghasilan').reduce((sum, t) => sum + t.jumlah, 0)

  // Get last transaction date
  const lastTransactionDate =
    transaksi.length > 0 ? new Date(Math.max(...transaksi.map((t) => t.tanggal.getTime()))) : null
  const daysSinceLastTransaction = lastTransactionDate
    ? Math.floor((new Date().getTime() - lastTransactionDate.getTime()) / (1000 * 60 * 60 * 24))
    : null

  // Get current month's transactions
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const currentMonthTransactions = transaksi.filter(
    (t) => t.tanggal.getMonth() === currentMonth && t.tanggal.getFullYear() === currentYear
  )
  const currentMonthTotal = currentMonthTransactions.reduce((sum, t) => sum + t.jumlah, 0)

  return (
    <ThemeProvider>
      <Toaster position="bottom-right" />
      <div className="bg-background min-h-screen">
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
                      Rp{totalTransaksi.toLocaleString('id-ID')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                      {currentMonthTotal > 0 ? '+' : ''}Rp{currentMonthTotal.toLocaleString('id-ID')} transaksi bulan
                      ini
                    </div>
                    <div className="text-muted-foreground">
                      {daysSinceLastTransaction !== null
                        ? `Terakhir transaksi ${daysSinceLastTransaction} hari yang lalu`
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
                        Rp{totalPengeluaran.toLocaleString('id-ID')}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardDescription className="flex items-center justify-between gap-2">
                        Total Penghasilan <ArrowDownLeft size={16} className="text-green-500 dark:text-green-400" />
                      </CardDescription>
                      <CardTitle className="text-2xl font-semibold text-green-500 tabular-nums dark:text-green-400">
                        Rp{totalPenghasilan.toLocaleString('id-ID')}
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
                  <CardTitle className="text-2xl font-semibold tabular-nums">
                    Rp{totalTransaksi.toLocaleString('id-ID')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-col items-start gap-1 text-sm">
                  <div className="line-clamp-1 flex gap-2 font-medium">
                    {currentMonthTotal > 0 ? '+' : ''}Rp{currentMonthTotal.toLocaleString('id-ID')} transaksi bulan ini
                  </div>
                  <div className="text-muted-foreground">
                    {daysSinceLastTransaction !== null
                      ? `Terakhir transaksi ${daysSinceLastTransaction} hari yang lalu`
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
                      Total Pengeluaran <ArrowUpRight size={16} />
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">
                      Rp{totalPengeluaran.toLocaleString('id-ID')}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription className="flex items-center justify-between gap-2">
                      Total Penghasilan <ArrowDownLeft size={16} />
                    </CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums">
                      Rp{totalPenghasilan.toLocaleString('id-ID')}
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
      </div>
    </ThemeProvider>
  )
}

export default App
