import { Plus, Filter, Minus, ArrowUp, ArrowDown } from 'lucide-react'

export default function TransaksiButtons() {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      <button className="btn btn-neutral btn-xs join-item">
        <Filter className="size-4" /> Filter
      </button>
      <div className="join join-horizontal justify-end">
        <button
          className="btn btn-error btn-xs join-item"
          onClick={() => {
            document.getElementById('tambah-pengeluaran').showModal()
          }}
        >
          <ArrowUp className="size-4" /> Pengeluaran
        </button>
        <button
          className="btn btn-success btn-xs join-item"
          onClick={() => {
            document.getElementById('tambah-penghasilan').showModal()
          }}
        >
          <ArrowDown className="size-4" /> Penghasilan
        </button>
      </div>
    </div>
  )
}
