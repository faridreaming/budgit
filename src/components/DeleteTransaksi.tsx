import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'
  import { Button } from '@/components/ui/button'

export default function DeleteTransaksi({ onDeleteRequest, onCancel, open, setOpen }: { onDeleteRequest: () => void, onCancel: () => void, open: boolean, setOpen: (open: boolean) => void }) {
    return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dark:bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
          </DialogHeader>
          <DialogDescription>Apakah Anda yakin ingin menghapus transaksi ini?</DialogDescription>
          <DialogFooter>
            <Button onClick={onCancel} variant="outline" className="text-foreground">
              Batal
            </Button>
            <Button onClick={onDeleteRequest} variant="destructive">
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}