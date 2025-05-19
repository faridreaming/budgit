import { nanoid } from 'nanoid'
import Dashboard from './components/Dashboard'
import Transaksi from './components/Transaksi'
import { useState, useEffect } from 'react'

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
  const [transaksi, setTransaksi] = useState([
    {
      id: nanoid(),
      tanggal: new Date(),
      jumlah: 50000,
      keterangan: 'Saldo Awal',
      idKategori: 9,
      deskripsi: 'Saldo Awal',
    },
  ])

  const [sisaSaldo, setSisaSaldo] = useState(50000)
  const [totalPengeluaran, setTotalPengeluaran] = useState(0)
  const [totalPenghasilan, setTotalPenghasilan] = useState(50000)
  const [totalTransaksi, setTotalTransaksi] = useState(50000)

  useEffect(() => {
    const savedTransaksi = JSON.parse(localStorage.getItem('transaksi'))
    const savedSisaSaldo = JSON.parse(localStorage.getItem('sisaSaldo'))
    const savedTotalPengeluaran = JSON.parse(localStorage.getItem('totalPengeluaran'))
    const savedTotalPenghasilan = JSON.parse(localStorage.getItem('totalPenghasilan'))
    const savedTotalTransaksi = JSON.parse(localStorage.getItem('totalTransaksi'))

    if (savedTransaksi && savedTransaksi.length > 0) {
      setTransaksi(savedTransaksi)
    }
    if (savedSisaSaldo) {
      setSisaSaldo(savedSisaSaldo)
    }
    if (savedTotalPengeluaran) {
      setTotalPengeluaran(savedTotalPengeluaran)
    }
    if (savedTotalPenghasilan) {
      setTotalPenghasilan(savedTotalPenghasilan)
    }
    if (savedTotalTransaksi) {
      setTotalTransaksi(savedTotalTransaksi)
    }
  }, [])

  useEffect(() => {
    if (transaksi.length > 0) {
      localStorage.setItem('transaksi', JSON.stringify(transaksi))
    }
  }, [transaksi])

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

  return (
    <div className="container mx-auto h-screen max-w-lg p-4">
      <h1 className="text-center text-2xl font-bold">💰 BUDGIT</h1>
      <p className="text-center">Catatan Keuangan Pribadi</p>
      <Dashboard
        sisaSaldo={sisaSaldo}
        totalPengeluaran={totalPengeluaran}
        totalPenghasilan={totalPenghasilan}
        totalTransaksi={totalTransaksi}
      />
      <Transaksi
        transaksi={transaksi}
        kategori={kategori}
        onAddPengeluaran={onAddPengeluaran}
        onAddPenghasilan={onAddPenghasilan}
      />
    </div>
  )
}
