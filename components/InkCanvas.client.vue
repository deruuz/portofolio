<template>
  <!-- Stamp layer — fixed, full viewport, behind canvas -->
  <div class="stamp-layer" aria-hidden="true">
    <div
      v-for="s in stamps"
      :key="s.id"
      class="stamp-mark"
      :style="{ left: s.x + 'px', top: s.y + 'px', '--r': s.r + 'deg' }"
    >検</div>
  </div>

  <!-- Drawing canvas -->
  <canvas
    ref="cv"
    :class="['ink-canvas', mode !== 'read' ? 'on' : '', mode]"
    @pointerdown="down"
    @pointermove="move"
    @pointerup="up"
    @pointercancel="up"
  />

  <!-- Tooltip -->
  <Transition name="tip-fade">
    <div v-if="mode === 'brush'" class="tip" key="brush">Coret-coret di mana saja, tintanya pelan-pelan memudar</div>
    <div v-else-if="mode === 'stamp'" class="tip" key="stamp">Klik untuk cap hanko 検 (kualitas terjamin)</div>
  </Transition>

  <!-- Toolbar -->
  <div class="bar" role="toolbar" aria-label="Ink canvas controls">
    <button :class="{ on: mode === 'read' }"   @click="setMode('read')">
      <span class="btn-kanji">閲覧</span><span class="btn-label">{{ labels.read }}</span>
    </button>
    <button :class="{ on: mode === 'brush' }"  @click="setMode('brush')">
      <span class="btn-kanji">筆</span><span class="btn-label">{{ labels.brush }}</span>
    </button>
    <button :class="{ on: mode === 'stamp' }"  @click="setMode('stamp')">
      <span class="btn-kanji">印</span><span class="btn-label">{{ labels.stamp }}</span>
    </button>
    <button @click="clearAll">
      <span class="btn-kanji">消</span><span class="btn-label">{{ labels.clear }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLang } from '~/composables/useLang'

type Mode = 'read' | 'brush' | 'stamp'

const mode = ref<Mode>('read')
const stamps = ref<{ id: number; x: number; y: number; r: number }[]>([])
const cv = ref<HTMLCanvasElement | null>(null)

const { lang } = useLang()

const labels = computed(() => {
  if (lang.value === 'id') return { read: 'Baca',  brush: 'Coret', stamp: 'Cap',  clear: 'Hapus' }
  if (lang.value === 'ja') return { read: '読む',  brush: '描く',  stamp: '捺す', clear: '消す'  }
  return                          { read: 'View',  brush: 'Draw',  stamp: 'Stamp', clear: 'Clear' }
})

let ctx: CanvasRenderingContext2D | null = null
let last: { x: number; y: number; w: number } | null = null
let n = 0
let rafId = 0
let frame = 0

const setMode = (m: Mode) => { mode.value = m }

// ---- canvas size ----
const resize = () => {
  if (!cv.value) return
  const dpr = devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight

  // snapshot drawing sebelum resize
  const snap = document.createElement('canvas')
  snap.width  = cv.value.width
  snap.height = cv.value.height
  snap.getContext('2d')?.drawImage(cv.value, 0, 0)

  cv.value.width  = Math.floor(w * dpr)
  cv.value.height = Math.floor(h * dpr)
  ctx = cv.value.getContext('2d')!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // restore drawing dengan skala yang benar
  if (snap.width > 0 && snap.height > 0) {
    ctx.drawImage(snap, 0, 0, w, h)
  }
}

// ---- ink color ----
const inkColor = () =>
  getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#1c1915'

// ---- pointer handlers ----
const down = (e: PointerEvent) => {
  if (mode.value === 'stamp') {
    // x/y are viewport coords; stamp layer is fixed so no scroll offset needed
    stamps.value.push({
      id: n++,
      x: e.clientX,
      y: e.clientY,
      r: Math.round(Math.random() * 24 - 12),
    })
    if (stamps.value.length > 40) stamps.value.shift()
    return
  }
  if (mode.value === 'brush' && cv.value && ctx) {
    cv.value.setPointerCapture(e.pointerId)
    last = { x: e.clientX, y: e.clientY, w: 5 }
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 0.92
    ctx.fillStyle = inkColor()
    ctx.beginPath()
    ctx.arc(last.x, last.y, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

const move = (e: PointerEvent) => {
  if (!last || !ctx || mode.value !== 'brush') return
  const d = Math.hypot(e.clientX - last.x, e.clientY - last.y)
  const w = last.w * 0.7 + Math.max(3, Math.min(24, 26 - d * 0.9)) * 0.3
  // reset composite sebelum stroke biar nggak kena efek fade loop
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 0.92
  ctx.strokeStyle = inkColor()
  ctx.lineWidth = w
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(last.x, last.y)
  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  last = { x: e.clientX, y: e.clientY, w }
}

const up = () => { last = null }

const clearAll = () => {
  if (ctx) ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  stamps.value = []
}

// ---- fade loop ----
const reduced =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const fadeLoop = () => {
  if (!ctx) { rafId = requestAnimationFrame(fadeLoop); return }
  if (++frame % 6 === 0 && !last) {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.globalAlpha = 1
    ctx.fillStyle = 'rgba(0,0,0,0.015)'
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.restore()
  }
  rafId = requestAnimationFrame(fadeLoop)
}

onMounted(() => {
  if (!cv.value) return
  ctx = cv.value.getContext('2d')!
  resize()
  window.addEventListener('resize', resize)
  if (!reduced) fadeLoop()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* Stamp layer — fixed so stamps stay at click position regardless of scroll */
.stamp-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 29;
  overflow: hidden;
}

.stamp-mark {
  position: absolute;
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border: 3.5px solid var(--red);
  color: var(--red);
  border-radius: 5px;
  font: 700 38px "Shippori Mincho", "Hiragino Mincho ProN", serif;
  line-height: 1;
  background: color-mix(in srgb, var(--red) 8%, transparent);
  filter: url(#rough);
  transform: translate(-50%, -50%) rotate(var(--r, 0deg));
  animation: thud 0.35s cubic-bezier(0.2, 1.4, 0.4, 1) forwards;
}

@keyframes thud {
  0%   { opacity: 0;    transform: translate(-50%, -50%) scale(2)   rotate(var(--r, 0deg)); }
  55%  { opacity: 0.95; }
  100% { opacity: 0.92; transform: translate(-50%, -50%) scale(1)   rotate(var(--r, 0deg)); }
}

/* Canvas — fixed, covers whole viewport */
.ink-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  pointer-events: none;
}
.ink-canvas.on    { pointer-events: auto; touch-action: none; }
.ink-canvas.brush { cursor: crosshair; }
.ink-canvas.stamp { cursor: cell; }

/* Tooltip */
.tip {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(72px + env(safe-area-inset-bottom, 0px));
  z-index: 40;
  font-size: 13px;
  color: var(--mute);
  background: var(--paper);
  padding: 2px 12px;
  border-radius: 99px;
  pointer-events: none;
  white-space: nowrap;
}
.tip-fade-enter-active, .tip-fade-leave-active { transition: opacity 0.2s; }
.tip-fade-enter-from, .tip-fade-leave-to { opacity: 0; }

/* Toolbar */
.bar {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 40;
  display: flex;
  gap: 2px;
  background: var(--paper);
  border: 1px solid var(--ink);
  border-radius: 99px;
  padding: 5px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
  /* lebar mengikuti konten, max biar nggak meluap layar kecil */
  max-width: calc(100vw - 32px);
}

.bar button {
  border: 0;
  background: none;
  color: var(--ink);
  padding: 6px 12px;
  border-radius: 99px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 52px;
}
.bar button.on {
  background: var(--ink);
  color: var(--paper);
}
.btn-kanji {
  font: 700 16px "Shippori Mincho", serif;
  line-height: 1;
}
.btn-label {
  font: 400 10px "Zen Kaku Gothic New", sans-serif;
  line-height: 1;
  opacity: 0.75;
  letter-spacing: 0.03em;
}
</style>
