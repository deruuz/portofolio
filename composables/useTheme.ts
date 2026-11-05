// Dark mode via data-theme attribute on <html> + CSS-variable swaps.
// The inline pre-paint script in nuxt.config.ts owns reading localStorage and
// setting data-theme before first paint (no FOUC). useTheme only reads the
// resulting attribute on mount and writes future changes via guarded setItem.
export function useTheme() {
  const isDark = useState<boolean>('theme-dark', () => false)

  const apply = () => {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
      try {
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      } catch (_) {
        // private/restricted mode — ignore
      }
    }
  }

  const toggle = () => {
    isDark.value = !isDark.value
    apply()
  }

  // On client mount, sync state from the data-theme attribute (NOT localStorage).
  if (import.meta.client) {
    const attr = document.documentElement.getAttribute('data-theme')
    isDark.value = attr === 'dark'
  }

  return { isDark, toggle }
}
