import { useState } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'
import type { Kategori } from '@/data/kategori'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

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
}: {
  data: Transaksi[]
  onDeleteTransaksi: (id: number) => void
}) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDeleteRequest = (id: number) => {
    setDeleteId(id)
    setDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      onDeleteTransaksi(deleteId)
      setDeleteId(null)
      setDialogOpen(false)
    }
  }

  const handleCancel = () => {
    setDeleteId(null)
    setDialogOpen(false)
  }

  return (
    <>
      <DataTable columns={columns(handleDeleteRequest)} data={data} />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="dark:bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <DialogDescription>Apakah Anda yakin ingin menghapus transaksi ini?</DialogDescription>
          <DialogFooter>
            <Button onClick={handleCancel} variant="outline" className="text-foreground">
              Batal
            </Button>
            <Button onClick={handleConfirmDelete} variant="destructive">
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
