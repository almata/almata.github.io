import { enableThemeButton, restoreTheme } from './theme.js'

markCurrentPage()
restoreTheme()
enableThemeButton()

// Mark the navigation link that points to the page currently displayed.
function markCurrentPage() {
  const currentPath = normalizePath(window.location.pathname)

  document.querySelectorAll('.site-nav .page-link').forEach((link) => {
    if (normalizePath(new URL(link.href).pathname) === currentPath) {
      link.classList.add('current-page')
      link.setAttribute('aria-current', 'page')
    }
  })
}

function normalizePath(path) {
  const withoutIndex = path.replace(/\/index\.html$/, '/')
  return withoutIndex === '/' ? withoutIndex : withoutIndex.replace(/\/$/, '')
}
