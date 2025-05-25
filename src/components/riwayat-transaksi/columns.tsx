import type { ColumnDef } from '@tanstack/react-table'
import type { Transaksi } from '@/data/transaksi'
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Transaksi>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tanggal
          <ChevronsUpDown size={16} />
        </Button>
      )
    },
    accessorKey: 'tanggal',
    cell: ({ row }) => {
      const date = row.original.tanggal
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Jumlah
          <ChevronsUpDown size={16} />
        </Button>
      )
    },
    accessorKey: 'jumlah',
    cell: ({ row }) => {
      const jumlah: number = row.original.jumlah
      const jumlahRp: string = jumlah.toLocaleString('id-ID', { minimumFractionDigits: 0 })

      if (row.original.kategori.jenis === 'pengeluaran') {
        return <div className="text-red-500">-Rp{jumlahRp}</div>
      } else {
        return <div className="text-green-500">+Rp{jumlahRp}</div>
      }
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Keterangan
          <ChevronsUpDown size={16} />
        </Button>
      )
    },
    accessorKey: 'keterangan',
    cell: ({ row }) => {
      const kategori = row.original.kategori
      const keterangan = row.original.keterangan
      return (
        <div className="flex space-x-2">
          <Badge variant="outline">
            {kategori.icon} {kategori.nama}
          </Badge>
          <p>{keterangan}</p>
        </div>
      )
    },
  },
  {
    header: 'Deskripsi',
    accessorKey: 'deskripsi',
    cell: ({ row }) => {
      const deskripsi = row.original.deskripsi
      return deskripsi || '-'
    },
  },
]
