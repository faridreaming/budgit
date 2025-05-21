import { X } from 'lucide-react'
import { nanoid } from 'nanoid'

export default function TambahPenghasilan({ kategori, onAddPenghasilan, handleJumlahChange }) {
  kategori = kategori.filter((k) => k.jenis === 1)

  const handleTambahPenghasilan = (e) => {
    e.preventDefault()
    const newPenghasilan = {
      id: nanoid(),
      tanggal: e.target.tanggal.value,
      jumlah: parseInt(e.target.jumlah.value.replace(/,/g, '')),
      keterangan: e.target.keterangan.value,
      idKategori: parseInt(e.target.idKategori.value),
      deskripsi: e.target.deskripsi.value || '',
    }
    onAddPenghasilan(newPenghasilan)
    e.target.reset()
    document.getElementById('tambah-penghasilan').close()

    // Show toast notification
    const toast = document.getElementById('toast-success')
    toast.classList.remove('hidden')
    setTimeout(() => {
      toast.classList.add('hidden')
    }, 3000)
  }

  return (
    <dialog id="tambah-penghasilan" className="modal">
      <div className="modal-box dark:border-base-300 max-w-lg p-4 dark:border">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2 border-0">
            <X className="size-4" />
          </button>
        </form>
        <h3>Tambah Penghasilan</h3>
        <form className="mt-4" onSubmit={handleTambahPenghasilan}>
          <label className="floating-label">
            <span>Jumlah (Rp)</span>
            <input
              type="text"
              placeholder="Jumlah (Rp)"
              className="input input-md w-full"
              name="jumlah"
              onChange={handleJumlahChange}
              required
            />
          </label>
          <label className="floating-label mt-4">
            <span>Keterangan</span>
            <input
              type="text"
              placeholder="Keterangan"
              className="input input-md w-full"
              name="keterangan"
              required
            />
          </label>
          <label className="input mt-4 w-full">
            <span className="label">Tanggal</span>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              name="tanggal"
              required
            />
          </label>
          <label className="select mt-4 w-full">
            <span className="label">Type</span>
            <select name="idKategori" id="idKategori" required defaultValue="">
              <option value="" disabled>
                Pilih Kategori
              </option>
              {kategori.map((k) => (
                <option value={k.id} key={k.id}>
                  {k.nama} {k.icon}
                </option>
              ))}
            </select>
          </label>
          <label className="floating-label mt-4">
            <span>Deskripsi (Opsional)</span>
            <input
              type="text"
              placeholder="Deskripsi (Opsional)"
              className="input input-md w-full"
              name="deskripsi"
            />
          </label>
          <div className="modal-action">
            <button type="submit" className="btn btn-success btn-md w-full">
              Tambah Penghasilan
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
