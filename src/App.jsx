import Dashboard from './components/Dashboard'
import Transaksi from './components/Transaksi'
import { useState } from 'react'

export default function App() {
  const [transaksi, setTransaksi] = useState([])
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
  ]

  const getSisaSaldo = () => {
    return 100000
  }

  const getTotalPengeluaran = () => {
    return 100000
  }

  const getTotalPenghasilan = () => {
    return 100000
  }

  const getTotalTransaksi = () => {
    return 100000
  }

  const onAddPengeluaran = (newPengeluaran) => {
    setTransaksi([...transaksi, newPengeluaran])
    console.log(transaksi)
    console.log(transaksi)
  }

  return (
    <div className="container mx-auto h-screen max-w-md p-4">
      <h1 className="text-center text-2xl font-bold">💰 BUDGIT</h1>
      <p className="text-center">Catatan Keuangan Pribadi</p>
      <Dashboard
        sisaSaldo={getSisaSaldo()}
        totalPengeluaran={getTotalPengeluaran()}
        totalPenghasilan={getTotalPenghasilan()}
        totalTransaksi={getTotalTransaksi()}
      />
      <Transaksi transaksi={transaksi} kategori={kategori} onAddPengeluaran={onAddPengeluaran} />
    </div>
  )
}
