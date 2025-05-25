import { useEffect, useState } from 'react'
import type { Transaksi } from '@/data/transaksi'
import { transaksi } from '@/data/transaksi'
import { columns } from './columns'
import { DataTable } from './data-table'

function getData(): Promise<Transaksi[]> {
  return Promise.resolve(transaksi)
}

export default function RiwayatTransaksi() {
  const [data, setData] = useState<Transaksi[] | null>(null)

  useEffect(() => {
    getData().then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return <DataTable columns={columns} data={data} />
}
