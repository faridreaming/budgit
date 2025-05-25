import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import RiwayatTransaksi from '@/components/riwayat-transaksi/page'
import { ArrowDownLeft, ArrowUpRight, Sigma } from 'lucide-react'

function App() {
  return (
    <ThemeProvider>
      <div className="container mx-auto my-6 max-w-xl px-6">
        <Card className="relative">
          <CardHeader>
            <CardTitle>💰 BUDGIT</CardTitle>
            <CardDescription>Aplikasi Catatan Keuangan Pribadi</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            <Card>
              <CardHeader>
                <CardDescription className="flex items-center justify-between gap-2">
                  Total Transaksi <Sigma size={16} />
                </CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums">Rp100.000</CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">+Rp100.000 transaksi bulan ini</div>
                <div className="text-muted-foreground">Terakhir transaksi 13 hari yang lalu</div>
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
          <div className="absolute top-6 right-6">
            <ModeToggle />
          </div>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Riwayat Transaksi</CardTitle>
          </CardHeader>
          <CardContent>
            <RiwayatTransaksi />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default App
