// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      title: 'Deruu — Web Developer & QA',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap' },
      ],
      script: [
        {
          // Runs before hydration: sets data-theme from localStorage('theme')
          // (validated to 'light'|'dark'), else prefers-color-scheme, else 'light'.
          tagPosition: 'head',
          innerHTML: `(function(){document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}else if(matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark')}else{document.documentElement.setAttribute('data-theme','light')}}catch(e){document.documentElement.setAttribute('data-theme','light')}})();`,
        },
      ],
    },
  },
})
