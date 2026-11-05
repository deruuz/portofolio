<template>
  <header class="flex justify-between items-center text-sm py-2">
    <!-- Logo -->
    <div class="logo serif">
      <span>{{ logoParts[0] }}</span><i>·</i><span>{{ logoParts[1] }}</span>
    </div>

    <!-- Desktop nav -->
    <nav aria-label="Utama" class="hidden md:flex gap-5 items-center">
      <a class="lnk" href="#projects">{{ nav.projects }}</a>
      <a class="lnk" href="#experience">{{ nav.experience }}</a>
      <a class="lnk" href="#contact">{{ nav.contact }}</a>
      <div class="lang-switch" role="group">
        <button v-for="l in LANGS" :key="l.key"
          :class="['lang-btn', { on: lang.value === l.key }]"
          @click="setLang(l.key)">{{ l.label }}</button>
      </div>
      <ThemeToggle />
    </nav>

    <!-- Mobile: lang + theme + hamburger -->
    <div class="flex md:hidden items-center gap-2">
      <div class="lang-switch" role="group">
        <button v-for="l in LANGS" :key="l.key"
          :class="['lang-btn', { on: lang.value === l.key }]"
          @click="setLang(l.key)">{{ l.label }}</button>
      </div>
      <ThemeToggle />
      <button class="hamburger" :aria-expanded="menuOpen" aria-label="Menu" @click="menuOpen = !menuOpen">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition name="drawer">
      <div v-if="menuOpen" class="mobile-menu" @click="menuOpen = false">
        <a class="lnk" href="#projects">{{ nav.projects }}</a>
        <a class="lnk" href="#experience">{{ nav.experience }}</a>
        <a class="lnk" href="#contact">{{ nav.contact }}</a>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLang, LANGS } from '~/composables/useLang'

const { me } = usePortfolio().value
const logoParts = me.logo.split('·')
const { lang, setLang } = useLang()
const menuOpen = ref(false)

const nav = computed(() => {
  if (lang.value === 'id') return { projects: 'Project',  experience: 'Pengalaman', contact: 'Kontak'  }
  if (lang.value === 'ja') return { projects: '作品',     experience: '経歴',       contact: '連絡'    }
  return                          { projects: 'Works',    experience: 'Experience', contact: 'Contact' }
})
</script>

<style scoped>
.lang-switch { display: flex; gap: 3px; }
.lang-btn {
  background: none;
  border: 1px solid var(--line);
  color: var(--mute);
  font: 500 11px "Zen Kaku Gothic New", sans-serif;
  padding: 2px 7px;
  border-radius: 99px;
  cursor: pointer;
  transition: border-color .15s, color .15s, background .15s;
  line-height: 1.6;
}
.lang-btn:hover { border-color: var(--ink); color: var(--ink); }
.lang-btn.on { background: var(--ink); border-color: var(--ink); color: var(--paper); }

/* hamburger */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 32px;
  height: 32px;
  background: none;
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 6px 7px;
  cursor: pointer;
}
.hamburger span {
  display: block;
  height: 1.5px;
  background: var(--ink);
  border-radius: 2px;
  transition: opacity .2s;
}

/* mobile drawer — drops below header */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  display: flex;
  flex-direction: column;
  gap: 0;
  z-index: 50;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}
.mobile-menu a {
  padding: 14px 22px;
  font-size: 15px;
  border-bottom: 1px solid var(--line);
}
.mobile-menu a:last-child { border-bottom: none; }

/* drawer animation */
.drawer-enter-active, .drawer-leave-active { transition: opacity .2s, transform .2s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
