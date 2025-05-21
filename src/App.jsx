import { nanoid } from 'nanoid'
import Dashboard from './components/Dashboard'
import RiwayatTransaksi from './components/RiwayatTransaksi'
import TransaksiButtons from './components/TransaksiButtons'
import TambahPengeluaran from './components/TambahPengeluaran'
import TambahPenghasilan from './components/TambahPenghasilan'
import { useState, useEffect } from 'react'
import formatNumber from './functions/formatNumber'

// 0: Pengeluaran
// 1: Penghasilan
const kategori = [
  {
    id: 1,
    nama: 'Hobi',
    jenis: 1,
    icon: '⚽',
  },
  {
    id: 2,
    nama: 'Makanan',
    jenis: 0,
    icon: '🍔',
  },
  {
    id: 3,
    nama: 'Transportasi',
    jenis: 0,
    icon: '🚗',
  },
  {
    id: 4,
    nama: 'Pendidikan',
    jenis: 0,
    icon: '🎓',
  },
  {
    id: 5,
    nama: 'Kesehatan',
    jenis: 0,
    icon: '🏥',
  },
  {
    id: 6,
    nama: 'Pekerjaan',
    jenis: 1,
    icon: '💼',
  },
  {
    id: 7,
    nama: 'Kebutuhan',
    jenis: 0,
    icon: '🛍️',
  },
  {
    id: 8,
    nama: 'Lainnya',
    jenis: 0,
    icon: '💸',
  },
  {
    id: 9,
    nama: 'Lainnya',
    jenis: 1,
    icon: '💸',
  },
]

export default function App() {
  const [transaksi, setTransaksi] = useState(() => {
    const savedTransaksi = JSON.parse(localStorage.getItem('transaksi'))
    if (savedTransaksi && savedTransaksi.length > 0) {
      return savedTransaksi
    }
    return [
      {
        id: nanoid(),
        tanggal: new Date(),
        jumlah: 50000,
        keterangan: 'Saldo Awal',
        idKategori: 9,
        deskripsi: 'Saldo Awal',
      },
    ]
  })

  const [sisaSaldo, setSisaSaldo] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('sisaSaldo'))
    return saved || 50000
  })
  const [totalPengeluaran, setTotalPengeluaran] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('totalPengeluaran'))
    return saved || 0
  })
  const [totalPenghasilan, setTotalPenghasilan] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('totalPenghasilan'))
    return saved || 50000
  })
  const [totalTransaksi, setTotalTransaksi] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('totalTransaksi'))
    return saved || 50000
  })

  useEffect(() => {
    localStorage.setItem('transaksi', JSON.stringify(transaksi))
    localStorage.setItem('sisaSaldo', JSON.stringify(sisaSaldo))
    localStorage.setItem('totalPengeluaran', JSON.stringify(totalPengeluaran))
    localStorage.setItem('totalPenghasilan', JSON.stringify(totalPenghasilan))
    localStorage.setItem('totalTransaksi', JSON.stringify(totalTransaksi))
  }, [transaksi, sisaSaldo, totalPengeluaran, totalPenghasilan, totalTransaksi])

  const onAddPengeluaran = (newPengeluaran) => {
    setTransaksi([...transaksi, newPengeluaran])
    setSisaSaldo(sisaSaldo - newPengeluaran.jumlah)
    setTotalPengeluaran(totalPengeluaran + newPengeluaran.jumlah)
    setTotalTransaksi(totalTransaksi + newPengeluaran.jumlah)
  }

  const onAddPenghasilan = (newPenghasilan) => {
    setTransaksi([...transaksi, newPenghasilan])
    setSisaSaldo(sisaSaldo + newPenghasilan.jumlah)
    setTotalPenghasilan(totalPenghasilan + newPenghasilan.jumlah)
    setTotalTransaksi(totalTransaksi + newPenghasilan.jumlah)
  }

  const handleJumlahChange = (e) => {
    const formattedValue = formatNumber(e.target.value)
    e.target.value = formattedValue
  }

  return (
    <div className="container mx-auto flex max-w-xl flex-col p-4">
      <h1 className="text-center text-2xl font-bold">💰 BUDGIT</h1>
      <p className="text-center">Catatan Keuangan Pribadi</p>
      <Dashboard
        sisaSaldo={sisaSaldo}
        totalPengeluaran={totalPengeluaran}
        totalPenghasilan={totalPenghasilan}
        totalTransaksi={totalTransaksi}
      />
      <TransaksiButtons />
      <div className="flex-1">
        <RiwayatTransaksi
          transaksi={transaksi}
          kategori={kategori}
          onAddPengeluaran={onAddPengeluaran}
          onAddPenghasilan={onAddPenghasilan}
        />
      </div>
      <TambahPengeluaran
        kategori={kategori}
        onAddPengeluaran={onAddPengeluaran}
        handleJumlahChange={handleJumlahChange}
      />
      <TambahPenghasilan
        kategori={kategori}
        onAddPenghasilan={onAddPenghasilan}
        handleJumlahChange={handleJumlahChange}
      />
      <div className="toast toast-center">
        <div className="alert alert-success hidden" id="toast-success">
          <span>Transaksi berhasil ditambahkan!</span>
        </div>
      </div>
    </div>
  )
}
