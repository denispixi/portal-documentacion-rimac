const fs = require("fs")
const path = require("path")
const fm = require('front-matter')

function buildSidebarByFolder(folder, title) {
  const extension = [".md"]
  const files = fs
    .readdirSync(path.join(`${__dirname}/../${folder}`))
    .filter(item => (
      item.toLowerCase() != "readme.md" &&
      fs.statSync(path.join(`${__dirname}/../${folder}`, item)).isFile() &&
      extension.includes(path.extname(item))
    ))

  const filesSort = []

  files.forEach(function (file) {
    const data = fs.readFileSync(path.join(`${__dirname}/../${folder}`) + "/" + file, 'utf8')
    const content = fm(data)
    filesSort.push({ name: file, order: content.attributes.order })
  })

  filesSort.sort((a, b) => (a.order > b.order ? 1 : (a.order < b.order ? -1 : 0)))
  const result = filesSort.map(a => a.name)
  return [{
    title,
    collapsable: false,
    children: [...result]
  }]
}

function buildSidebarsFromConfig() {
  const data = fs.readFileSync(path.join(`${__dirname}/../_index.md`), 'utf8')
  const content = fm(data)

  const sidebar = {}
  for (const { folder, title } of content.attributes.sidebarSections) {
    sidebar[`/${folder}/`] = buildSidebarByFolder(folder, title)
  }
  return sidebar
}

function buildNavbarFromConfig() {
  const data = fs.readFileSync(path.join(`${__dirname}/../_index.md`), 'utf8')
  const content = fm(data)
  return content.attributes.navbarSections.map(
    ({ link, text, items }) => items
      ? { text, items: items.map(({ link, text }) => ({ text, link })) }
      : { text, link }
  )
}

module.exports = {
  title: "",
  serviceWorker: true,
  description: "Documentacion técnica para activos tecnológicos de Rimac",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo-rimac.svg',
    displayAllHeaders: true,
    nav: buildNavbarFromConfig(),
    sidebar: buildSidebarsFromConfig(),
  }
}
