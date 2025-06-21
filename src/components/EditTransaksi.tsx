'use client'

import type { Kategori } from '@/data/kategori'

type Transaksi = {
  id: number
  tanggal: Date
  jumlah: number
  keterangan: string
  kategori_id: Kategori['id']
  deskripsi: string | null
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function EditTransaksi() {
  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent className="dark:bg-card sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Transaksi</DialogTitle>
        </DialogHeader>
        <DialogDescription>Edit transaksi Anda.</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
