'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import RiwayatTransaksi from '@/components/riwayat-transaksi/page'
import { Check } from 'lucide-react'
import Dashboard from '@/components/Dashboard'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { Kategori } from '@/data/kategori'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { useState, useEffect } from 'react'

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

  return (
    <ThemeProvider>
      <Toaster position="bottom-right" />
      <div className="bg-background min-h-screen">
        {/* Desktop */}
        <ScrollArea className="hidden h-screen sm:block">
          <div className="container mx-auto w-full max-w-xl px-4 py-6 sm:px-6">
            <Dashboard transaksi={transaksi} addTransaksi={addTransaksi} />
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
          <Dashboard transaksi={transaksi} addTransaksi={addTransaksi} />
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
