import { Plus, ChevronsUp, ChevronsDown } from 'lucide-react'

export default function TransaksiButtons() {
  return (
    <div className="order-1 grid grid-cols-1 gap-2 p-4 sm:grid-cols-2">
      <button
        className="btn btn-error btn-lg sm:btn-md"
        onClick={() => {
          document.getElementById('tambah-pengeluaran').showModal()
        }}
      >
        <Plus className="size-4" />
        Tambah Pengeluaran
        <ChevronsUp className="size-4" />
      </button>
      <button
        className="btn btn-success btn-lg sm:btn-md"
        onClick={() => {
          document.getElementById('tambah-penghasilan').showModal()
        }}
      >
        <Plus className="size-4" />
        Tambah Penghasilan
        <ChevronsDown className="size-4" />
      </button>
    </div>
  )
}
