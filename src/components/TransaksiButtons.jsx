import { Plus, ChevronsUp, ChevronsDown } from 'lucide-react'

export default function TransaksiButtons() {
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      <button
        className="btn btn-error btn-lg sm:btn-md"
        onClick={() => {
          document.getElementById('tambah-pengeluaran').showModal()
        }}
      >
        <Plus className="size-4" />
        <span className="hidden sm:inline">Tambah </span>
        <span>Pengeluaran</span>
        <ChevronsUp className="hidden size-4 sm:inline" />
      </button>
      <button
        className="btn btn-success btn-lg sm:btn-md"
        onClick={() => {
          document.getElementById('tambah-penghasilan').showModal()
        }}
      >
        <Plus className="size-4" />
        <span className="hidden sm:inline">Tambah </span>
        <span>Penghasilan</span>
        <ChevronsDown className="hidden size-4 sm:inline" />
      </button>
    </div>
  )
}
