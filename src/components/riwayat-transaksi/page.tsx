import { useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import type { Kategori } from '@/data/kategori'
import DeleteTransaksi from '../DeleteTransaksi'
import EditTransaksi from '../EditTransaksi'

type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori_id: Kategori['id']
  deskripsi: string | null
}

export default function RiwayatTransaksi({
  data,
  onDeleteTransaksi,
  onUpdateTransaksi,
}: {
  data: Transaksi[]
  onDeleteTransaksi: (id: number) => void
  onUpdateTransaksi: (transaksi: Transaksi) => void
}) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [updateId, setUpdateId] = useState<number | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

  const handleDeleteRequest = (id: number) => {
    setDeleteId(id)
    setDeleteDialogOpen(true)
  }

  const handleUpdateRequest = (id: number) => {
    setUpdateId(id)
    setUpdateDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      onDeleteTransaksi(deleteId)
      setDeleteId(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleCancel = () => {
    setDeleteId(null)
    setUpdateId(null)
    setUpdateDialogOpen(false)
  }

  return (
    <>
      <DataTable columns={columns(handleDeleteRequest, handleUpdateRequest)} data={data} />
      <DeleteTransaksi onDeleteRequest={handleConfirmDelete} onCancel={handleCancel} open={deleteDialogOpen} setOpen={setDeleteDialogOpen} />
      <EditTransaksi open={updateDialogOpen} setOpen={setUpdateDialogOpen} onUpdateRequest={onUpdateTransaksi} onCancel={handleCancel} transaksi={data.find((transaksi) => transaksi.id === updateId) ?? {
        id: 0,
        tanggal: new Date(),
        jumlah: 0,
        keterangan: '',
        kategori_id: 0,
        deskripsi: null,
      }} />
    </>
  )
}
