import { Plus, Filter, Minus, ArrowUp, ArrowDown } from 'lucide-react'
import TambahPengeluaran from './TambahPengeluaran'
import TambahPenghasilan from './TambahPenghasilan'
import formatNumber from '../functions/formatNumber'

export default function Transaksi({ transaksi, kategori, onAddPengeluaran, onAddPenghasilan }) {
  const handleJumlahChange = (e) => {
    const formattedValue = formatNumber(e.target.value)
    e.target.value = formattedValue
  }

  return (
    <>
      <h2 className="mt-4 mb-2">Transaksi</h2>
      <div className="bg-base-100 rounded-box dark:border-base-300 p-4 dark:border">
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
        <div className="mt-2 overflow-x-auto">
          <table className="table-sm table-zebra table">
            <tbody>
              {transaksi.map((t) => (
                <tr key={t.id}>
                  <td className="whitespace-nowrap">{new Date(t.tanggal).toLocaleDateString()}</td>
                  <td className="whitespace-nowrap">
                    {kategori.find((k) => k.id === t.idKategori)?.icon}{' '}
                    {kategori.find((k) => k.id === t.idKategori)?.nama}
                  </td>
                  <td
                    className={
                      kategori.find((k) => k.id === t.idKategori)?.jenis === 0
                        ? 'text-error whitespace-nowrap'
                        : 'text-success whitespace-nowrap'
                    }
                  >
                    {kategori.find((k) => k.id === t.idKategori)?.jenis === 0 ? '-' : '+'}
                    Rp{formatNumber(t.jumlah)}
                  </td>
                  <td>{t.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TambahPengeluaran
        kategori={kategori}
        onAddPengeluaran={onAddPengeluaran}
        handleJumlahChange={handleJumlahChange}
      />
      <TambahPenghasilan
        kategori={kategori}
        onAddPenghasilan={onAddPenghasilan}
        handleJumlahChange={handleJumlahChange}
      />
    </>
  )
}
