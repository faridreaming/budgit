function App() {
  const getPesanWaktu = () => {
    const waktu = new Date()
    const jam = waktu.getHours()
    if (jam >= 0 && jam < 12) {
      return 'pagi! 🌄'
    } else if (jam >= 12 && jam < 15) {
      return 'siang! ☀️'
    } else if (jam >= 15 && jam < 18) {
      return 'sore! 🌅'
    } else {
      return 'malam! 🌙'
    }
  }

  const getSisaSaldo = () => {
    return 100000
  }

  return (
    <div className="container mx-auto max-w-md p-4 h-screen">
      <h1 className="text-center text-2xl font-bold">💰 BUDGIT</h1>
      <p className="text-center">Catatan Keuangan Pribadi</p>
      <div className="card card-border bg-base-100 w-full mt-4">
        <div className="card-body">
          <h2 className="card-title">Halo 👋 Selamat {getPesanWaktu()}</h2>
          <p>Sisa saldo: Rp{getSisaSaldo()}</p>
        </div>
      </div>
    </div>
  )
}

export default App
