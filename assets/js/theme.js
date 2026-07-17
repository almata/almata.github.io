const THEME_STORAGE_KEY = 'theme'

export function restoreTheme() {
  const root = document.documentElement
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  const theme = savedTheme ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

  root.dataset.theme = theme
  root.style.colorScheme = theme
}

export function enableThemeButton() {
  const button = document.querySelector('.theme-toggle')

  if (!button) return

  updateToggle(button)

  button.addEventListener('click', function () {
    const root = document.documentElement
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark'
    root.dataset.theme = nextTheme
    root.style.colorScheme = nextTheme
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    updateToggle(button)
  })
}

function updateToggle(button) {
  const root = document.documentElement
  const isDark = root.dataset.theme === 'dark'
  button.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme')
  button.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme')
  button.setAttribute('aria-pressed', String(!isDark))
}
