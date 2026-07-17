import { enableThemeButton, restoreTheme } from './theme.js'

await fetchTemplate('header')
markCurrentPage()
await fetchTemplate('footer')
restoreTheme()
enableThemeButton()

// Fetch and insert template into the DOM.
// It assumes that the template is wrapped in a <template> tag and that it is stored in
// /assets/templates/<name>.html. It also assumes that there is a div with the id of
// <name> in the DOM where the template will be inserted.
async function fetchTemplate(name) {
  const response = await fetch(`/assets/templates/${name}.html`, {
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(`Unable to load ${name} template: ${response.status}`)
  }

  const inMemory = document.createElement('div')
  inMemory.innerHTML = await response.text()

  const element = inMemory.querySelector('template').content
  document.querySelector(`#${name}`).appendChild(element)
}

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
