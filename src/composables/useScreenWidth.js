import { onMounted, onUnmounted, ref } from 'vue'

export function useScreenWidth() {
  const screenWidth = ref(null) // Initialize with null to handle SSR safely

  const updateScreenWidth = () => {
    if (typeof window !== 'undefined')
      screenWidth.value = window.innerWidth
  }

  onMounted(() => {
    updateScreenWidth() // Set the initial value on client-side mounting
    window.addEventListener('resize', updateScreenWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth)
  })

  return { screenWidth }
}
