<template>
  <section id="home" aria-labelledby="hero-title" class="scroll-mt-20">
    <div class="hero grid grid-cols-1 md:grid-cols-[1.25fr_1fr] gap-5 items-center pt-6 md:pt-0">
      <div>
        <!-- Nama: typewriter -->
        <div class="kicker rv" v-reveal="0" :aria-label="me.fullName">
          <span>{{ displayed }}<span class="cursor" :class="{ blink: !isTyping }">|</span></span>
        </div>

        <!-- Tagline -->
        <div class="tagline-wrap rv" v-reveal="60">
          <Transition name="lang-fade" mode="out-in">
          <span :key="langKey + '-tag'" class="tagline serif">{{ c.tagline }}</span>
          </Transition>
        </div>

        <!-- Headline -->
        <h1 id="hero-title" class="hero-hl rv" v-reveal="120">
          <Transition name="lang-fade" mode="out-in">
            <span :key="langKey + '-hl'">{{ c.headline }}</span>
          </Transition>
        </h1>

        <div class="rv" v-reveal="180"><Underline /></div>

        <!-- Desc -->
        <Transition name="lang-fade" mode="out-in">
          <p :key="langKey + '-desc'" class="lead rv" v-reveal="240">{{ c.desc }}</p>
        </Transition>

        <!-- CTA -->
        <div class="cta rv" v-reveal="300">
          <a class="btn" :href="hero.ctaPrimary.href" target="_blank" rel="noopener">{{ hero.ctaPrimary.label }}</a>
          <a class="lnk" :href="hero.ctaSecondary.href">{{ hero.ctaSecondary.label }}</a>
        </div>
      </div>

      <EnsoMark class="md:block" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLang } from '~/composables/useLang'

const { me, hero } = usePortfolio().value
const { lang } = useLang()

const c = computed(() => {
  if (lang.value === 'id') return { tagline: hero.taglineId, headline: hero.headlineId, desc: hero.descId }
  if (lang.value === 'ja') return { tagline: hero.taglineJa, headline: hero.headlineJa, desc: hero.descJa }
  return { tagline: hero.taglineEn, headline: hero.headlineEn, desc: hero.descEn }
})

// key untuk transition — plain string biar template nggak perlu .value
const langKey = computed(() => lang.value)

// ── typewriter ──────────────────────────────────────────────────
const NAMES       = [me.fullName, me.fullNameKana]
const TYPE_SPEED  = 55
const DEL_SPEED   = 28
const PAUSE_FULL  = 2400
const PAUSE_EMPTY = 350

const displayed = ref('')
const isTyping  = ref(false)
let timerId: ReturnType<typeof setTimeout> | null = null
let nameIdx = 0, charIdx = 0, deleting = false

const tick = () => {
  const target = NAMES[nameIdx]
  if (!deleting) {
    isTyping.value = true
    displayed.value = target.slice(0, ++charIdx)
    if (charIdx === target.length) {
      isTyping.value = false; deleting = true
      timerId = setTimeout(tick, PAUSE_FULL)
    } else timerId = setTimeout(tick, TYPE_SPEED)
  } else {
    isTyping.value = true
    displayed.value = target.slice(0, --charIdx)
    if (charIdx === 0) {
      deleting = false; nameIdx = (nameIdx + 1) % NAMES.length; isTyping.value = false
      timerId = setTimeout(tick, PAUSE_EMPTY)
    } else timerId = setTimeout(tick, DEL_SPEED)
  }
}

onMounted(() => { timerId = setTimeout(tick, 900) })
onBeforeUnmount(() => { if (timerId) clearTimeout(timerId) })
</script>

<style scoped>
.hero-hl {
  font-size: clamp(20px, 3.2vw, 34px) !important;
  line-height: 1.3 !important;
  letter-spacing: -.01em !important;
  margin: 6px 0 0 !important;
}

.tagline-wrap { margin: 8px 0 2px; }
.tagline { font-size: clamp(28px, 5vw, 48px); line-height: 1.1; }

.cursor { display: inline-block; margin-left: 1px; color: var(--red); }
.cursor.blink { animation: blink 0.8s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.lang-fade-enter-active,
.lang-fade-leave-active { transition: opacity 0.2s ease; }
.lang-fade-enter-from,
.lang-fade-leave-to { opacity: 0; }
</style>
