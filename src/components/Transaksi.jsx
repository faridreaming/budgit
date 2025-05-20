import TambahPengeluaran from './TambahPengeluaran'
import TambahPenghasilan from './TambahPenghasilan'
import formatNumber from '../functions/formatNumber'
import FilterOptions from './FilterOptions'
import TransaksiButtons from './TransaksiButtons'

export default function Transaksi({ transaksi, kategori, onAddPengeluaran, onAddPenghasilan }) {
  const handleJumlahChange = (e) => {
    const formattedValue = formatNumber(e.target.value)
    e.target.value = formattedValue
  }

  return (
    <>
      <h2 className="mt-4 mb-2">Transaksi</h2>
      <div className="bg-base-100 rounded-box dark:border-base-300 p-4 dark:border">
        <TransaksiButtons />
        <div className="mt-2 overflow-x-auto">
          <FilterOptions />
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
