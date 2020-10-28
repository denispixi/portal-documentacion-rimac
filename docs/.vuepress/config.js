module.exports = {
  title: "",
  description: "Prueba de documentacion",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/logo-rimac.svg',
    nav: [
      { text: "Inicio", link: "/" },
      { text: "Docs", link: "/docs/" }
    ],
    displayAllHeaders: true,
    sidebar: {
      '/docs/': [
        ['/', 'Intro'],
        ['/docs/guide', 'APIs'],
        ['/docs/theme-reco', 'Microservicios'],
        // ['/docs/page-b', 'Explicit link text'],
      ]
    }
  },
  // theme: 'reco',
};