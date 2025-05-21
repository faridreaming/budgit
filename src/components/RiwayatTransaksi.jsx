import formatNumber from '../functions/formatNumber'
import { Filter, ChevronDown } from 'lucide-react'

export default function RiwayatTransaksi({ transaksi, kategori }) {
  return (
    <>
      <div className="bg-base-100 rounded-box dark:border-base-300 p-4 dark:border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Riwayat Transaksi</h2>
          <div className="btn btn-outline">
            <Filter className="size-4" /> Filter
            <ChevronDown className="size-4" />
          </div>
        </div>
        <div className="mt-2 overflow-x-auto">
          <table className="table-zebra table">
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
    </>
  )
}
