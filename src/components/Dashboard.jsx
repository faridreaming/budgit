import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import CountUp from 'react-countup'
import ToggleTheme from './ToggleTheme'
import formatNumber from '../functions/formatNumber'

export default function Dashboard({
  sisaSaldo,
  totalPengeluaran,
  totalPenghasilan,
  totalTransaksi,
}) {
  const [isSaldoVisible, setIsSaldoVisible] = useState(() => {
    return localStorage.getItem('isSaldoVisible') === 'true'
  })

  const getPesanWaktu = () => {
    const waktu = new Date()
    const jam = waktu.getHours()
    if (jam >= 0 && jam < 12) {
      return 'pagi! 🌄'
    } else if (jam >= 12 && jam < 15) {
      return 'siang! ☀️'
    } else if (jam >= 15 && jam < 18) {
      return 'sore! 🌅'
    } else {
      return 'malam! 🌙'
    }
  }

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible((prev) => !prev)
  }

  useEffect(() => {
    localStorage.setItem('isSaldoVisible', isSaldoVisible)
  }, [isSaldoVisible])

  return (
    <div className="bg-base-100 rounded-box dark:border-base-300 relative mt-4 p-4 dark:border">
      <h2 className="text-lg font-bold">Halo 👋 Selamat {getPesanWaktu()}</h2>
      <div className="mt-2 flex items-center gap-2">
        <span>Saldo:</span>
        <span id="sisa-saldo">
          {isSaldoVisible ? (
            <CountUp
              prefix="Rp"
              end={sisaSaldo}
              separator="."
              decimal=","
              duration={2}
              formattingFn={formatNumber}
            />
          ) : (
            '********'
          )}
        </span>
        <label className="swap">
          <input type="checkbox" checked={isSaldoVisible} onChange={toggleSaldoVisibility} />
          <div className="swap-on">
            <Eye className="size-4" />
          </div>
          <div className="swap-off">
            <EyeOff className="size-4" />
          </div>
        </label>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-2 text-center sm:grid-cols-2">
        <div className="bg-error/8 text-error rounded-field p-4 font-semibold">
          <h2>Total Pengeluaran</h2>
          <p>
            <CountUp
              prefix="Rp"
              end={totalPengeluaran}
              separator="."
              decimal=","
              duration={2}
              formattingFn={formatNumber}
            />
          </p>
        </div>
        <div className="bg-success/8 text-success rounded-field p-4 font-semibold">
          <h2>Total Penghasilan</h2>
          <p>
            <CountUp
              prefix="Rp"
              end={totalPenghasilan}
              separator="."
              decimal=","
              duration={2}
              formattingFn={formatNumber}
            />
          </p>
        </div>
        <div className="bg-accent/8 text-accent rounded-field p-4 font-semibold sm:col-span-2">
          <h2>Kamu sudah melakukan transaksi sebanyak</h2>
          <p>
            <CountUp
              prefix="Rp"
              end={totalTransaksi}
              separator="."
              decimal=","
              duration={2}
              formattingFn={formatNumber}
            />
          </p>
        </div>
      </div>
      <ToggleTheme />
    </div>
  )
}
