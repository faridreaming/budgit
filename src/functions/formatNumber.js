export default function formatNumber(value) {
  const stringValue = value.toString()
  const number = stringValue.replace(/\D/g, '')
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
