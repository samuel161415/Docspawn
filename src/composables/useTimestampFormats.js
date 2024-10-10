import { ref } from 'vue'

export function useTimestampFormats() {
  const timeFormats = ref([
    { name: 'HH:MM:SS XM', label: 'HH:MM:SS XM (12hr)' },
    { name: 'HH:MM:SS', label: 'HH:MM:SS (24hr)' },
    { name: 'HH:MM XM', label: 'HH:MM XM (12hr)' },
    { name: 'HH:MM', label: 'HH:MM (24hr)' },
    { name: 'HH:SS', label: 'HH:SS (24hr)' },
    { name: 'MM:SS', label: 'MM:SS' },
  ])
  const dateFormats = ref([
    { name: 'MM/DD/YYYY' },
    { name: 'MM-DD-YYYY' },
    { name: 'MM-DD-YY' },
    { name: 'DD-MM-YY' },
  ])

  return { timeFormats, dateFormats }
}
