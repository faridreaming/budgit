import { columns } from './columns'
import { DataTable } from './data-table'
import type { Kategori } from '@/data/kategori'

type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori_id: Kategori['id']
  deskripsi: string | null
}

export default function RiwayatTransaksi({ data }: { data: Transaksi[] }) {
  return <DataTable columns={columns} data={data} />
}
