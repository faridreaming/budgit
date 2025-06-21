import type { ColumnDef } from '@tanstack/react-table'
import type { Kategori } from '@/data/kategori'
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { kategori as kategoriList } from '@/data/kategori'
import EditTransaksi from '../EditTransaksi'

type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori_id: Kategori['id']
  deskripsi: string | null
}
export const columns: (onDeleteRequest: (id: number) => void) => ColumnDef<Transaksi>[] = (onDeleteRequest) => [
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
      const kategoriObj = kategoriList.find((k) => k.id === row.original.kategori_id)

      if (kategoriObj?.jenis === 'pengeluaran') {
        return <div className="text-red-500 dark:text-red-400">-Rp{jumlahRp}</div>
      } else {
        return <div className="text-green-500 dark:text-green-400">+Rp{jumlahRp}</div>
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
      const kategoriObj = kategoriList.find((k) => k.id === row.original.kategori_id)
      const keterangan = row.original.keterangan
      return (
        <div className="flex space-x-2">
          <Badge variant="outline">
            {kategoriObj?.icon} {kategoriObj?.nama}
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
  {
    id: 'aksi',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Aksi</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem variant="destructive" onClick={() => onDeleteRequest(row.original.id)}>
              Hapus
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditTransaksi />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
