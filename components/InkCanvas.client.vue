<template>
  <!-- Stamp layer -->
  <div class="stamp-layer" aria-hidden="true">
    <div
      v-for="s in stamps"
      :key="s.id"
      class="stamp-mark"
      :style="{ left: s.x + 'px', top: s.y + 'px', '--r': s.r + 'deg' }"
    >検</div>
  </div>

  <!-- Canvas -->
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
    <div v-if="mode === 'brush'" class="tip" key="brush">Coret-coret di mana saja</div>
    <div v-else-if="mode === 'stamp'" class="tip" key="stamp">Klik untuk cap hanko 検</div>
  </Transition>

  <!-- Toolbar -->
  <div class="bar" role="toolbar">
    <button :class="{ on: mode === 'read' }"  @click="setMode('read')">
      <span class="bk">閲覧</span><span class="bl">{{ labels.read }}</span>
    </button>
    <button :class="{ on: mode === 'brush' }" @click="setMode('brush')">
      <span class="bk">筆</span><span class="bl">{{ labels.brush }}</span>
    </button>
    <button :class="{ on: mode === 'stamp' }" @click="setMode('stamp')">
      <span class="bk">印</span><span class="bl">{{ labels.stamp }}</span>
    </button>
    <button @click="clearAll">
      <span class="bk">消</span><span class="bl">{{ labels.clear }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLang } from '~/composables/useLang'

type Mode = 'read' | 'brush' | 'stamp'

const mode   = ref<Mode>('read')
const stamps = ref<{ id: number; x: number; y: number; r: number }[]>([])
const cv     = ref<HTMLCanvasElement | null>(null)
const { lang } = useLang()

const labels = computed(() => {
  if (lang.value === 'id') return { read: 'Baca', brush: 'Coret', stamp: 'Cap',   clear: 'Hapus' }
  if (lang.value === 'ja') return { read: '読む', brush: '描く',  stamp: '捺す',  clear: '消す'  }
  return                          { read: 'View', brush: 'Draw',  stamp: 'Stamp',  clear: 'Clear' }
})

let ctx:  CanvasRenderingContext2D | null = null
let last: { x: number; y: number; w: number } | null = null
let uid = 0, rafId = 0, frame = 0
let cw = 0, ch = 0  // logical size (CSS px)

const setMode = (m: Mode) => { mode.value = m }

const inkColor = () => {
  const c = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim()
  return c || '#1c1915'
}

// resize tanpa hapus drawing
const resize = () => {
  if (!cv.value) return
  const dpr = Math.max(window.devicePixelRatio || 1, 1)
  const nw = window.innerWidth
  const nh = window.innerHeight
  if (nw === cw && nh === ch) return

  const snap = document.createElement('canvas')
  snap.width  = cv.value.width
  snap.height = cv.value.height
  snap.getContext('2d')?.drawImage(cv.value, 0, 0)

  cw = nw; ch = nh
  cv.value.width  = Math.floor(nw * dpr)
  cv.value.height = Math.floor(nh * dpr)
  ctx = cv.value.getContext('2d')!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  if (snap.width > 0 && snap.height > 0) {
    ctx.drawImage(snap, 0, 0, nw, nh)
  }
}

const down = (e: PointerEvent) => {
  e.preventDefault()
  if (mode.value === 'stamp') {
    stamps.value.push({
      id: uid++,
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
    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.globalAlpha = 1
    ctx.fillStyle = inkColor()
    ctx.beginPath()
    ctx.arc(last.x, last.y, 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

const move = (e: PointerEvent) => {
  if (!last || !ctx || mode.value !== 'brush') return
  e.preventDefault()
  const d = Math.hypot(e.clientX - last.x, e.clientY - last.y)
  if (d < 1) return
  const w = last.w * 0.7 + Math.max(2, Math.min(20, 24 - d * 0.8)) * 0.3
  ctx.save()
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 0.95
  ctx.strokeStyle = inkColor()
  ctx.lineWidth   = w
  ctx.lineCap     = 'round'
  ctx.lineJoin    = 'round'
  ctx.beginPath()
  ctx.moveTo(last.x, last.y)
  ctx.lineTo(e.clientX, e.clientY)
  ctx.stroke()
  ctx.restore()
  last = { x: e.clientX, y: e.clientY, w }
}

const up = () => { last = null }

const clearAll = () => {
  if (ctx) ctx.clearRect(0, 0, cw, ch)
  stamps.value = []
}

const reduced =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const fadeLoop = () => {
  if (++frame % 8 === 0 && !last && ctx) {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.globalAlpha = 0.012
    ctx.fillRect(0, 0, cw, ch)
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
  font: 700 38px "Shippori Mincho", serif;
  line-height: 1;
  background: color-mix(in srgb, var(--red) 8%, transparent);
  filter: url(#rough);
  transform: translate(-50%, -50%) rotate(var(--r, 0deg));
  animation: thud 0.35s cubic-bezier(0.2, 1.4, 0.4, 1) forwards;
}
@keyframes thud {
  0%   { opacity: 0;    transform: translate(-50%,-50%) scale(2)  rotate(var(--r,0deg)); }
  55%  { opacity: 0.95; }
  100% { opacity: 0.92; transform: translate(-50%,-50%) scale(1)  rotate(var(--r,0deg)); }
}

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

.tip {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(80px + env(safe-area-inset-bottom, 0px));
  z-index: 41;
  font-size: 13px;
  color: var(--mute);
  background: var(--paper);
  padding: 3px 14px;
  border-radius: 99px;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,.1);
}
.tip-fade-enter-active, .tip-fade-leave-active { transition: opacity 0.2s; }
.tip-fade-enter-from, .tip-fade-leave-to { opacity: 0; }

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
  box-shadow: 0 6px 24px rgba(0,0,0,.18);
  max-width: calc(100vw - 32px);
}
.bar button {
  border: 0;
  background: none;
  color: var(--ink);
  padding: 7px 14px;
  border-radius: 99px;
  cursor: pointer;
  transition: background .15s, color .15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  min-width: 54px;
  /* pastiin klik button nggak nutup canvas di bawahnya */
  position: relative;
  z-index: 41;
}
.bar button.on { background: var(--ink); color: var(--paper); }
.bk { font: 700 17px "Shippori Mincho", serif; line-height: 1; }
.bl { font: 400 10px "Zen Kaku Gothic New", sans-serif; line-height: 1; opacity: 0.7; }
</style>
