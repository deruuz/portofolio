// v-reveal: scroll-reveal directive (client only).
// Bound value = per-element stagger delay in ms; a falsy/absent value = delay 0.
// Feature-detect: if IntersectionObserver is unavailable or the user prefers
// reduced motion, add the "in" class immediately (content visible, no observer).
// Otherwise set the inline transition-delay, observe once, and reveal on intersect.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding: { value?: number | string }) {
      const reduced =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const delay = binding.value

      if (typeof IntersectionObserver === 'undefined' || reduced) {
        el.classList.add('in')
        return
      }

      if (delay) {
        el.style.transitionDelay = `${delay}ms`
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('in')
              io.unobserve(el)
            }
          }
        },
        { threshold: 0.15 },
      )
      io.observe(el)
    },
  })
})
