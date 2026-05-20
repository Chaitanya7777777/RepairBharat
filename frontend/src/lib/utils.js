export function getTrustScoreInfo(score) {
  const s = Number(score) || 0
  if (s >= 80) return { score: s, label: 'Excellent', color: 'text-green-600' }
  if (s >= 60) return { score: s, label: 'Good', color: 'text-yellow-600' }
  if (s >= 40) return { score: s, label: 'Fair', color: 'text-orange-600' }
  return { score: s, label: 'Poor', color: 'text-red-600' }
}

export function getResponseTimeLabel(minutes) {
  const m = Number(minutes) || 0
  if (m <= 15) return { label: 'Very fast', color: 'text-green-600' }
  if (m <= 60) return { label: 'Average', color: 'text-yellow-600' }
  return { label: 'Slow', color: 'text-red-600' }
}

export function formatCurrency(value) {
  if (value == null) return ''
  return typeof value === 'number' ? value.toLocaleString() : value
}

export function formatDuration(minutes) {
  if (!minutes) return ''
  return `${minutes} min`
}

export function formatTimeAgo(iso) {
  try {
    const d = new Date(iso)
    const diff = Math.floor((Date.now() - d.getTime()) / 1000)
    if (diff < 60) return `${diff}s ago`
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  } catch (e) {
    return ''
  }
}

export function formatRating(val) {
  const n = Number(val) || 0
  return n.toFixed(1)
}

export function generateCallLink(phone) {
  return `tel:${phone}`
}

export function generateWhatsAppLink(phone) {
  return `https://wa.me/${phone}`
}

export function generateMapsLink({ lat, lng, address }) {
  if (lat && lng) return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  if (address) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  return '#'
}
