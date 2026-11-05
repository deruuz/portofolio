<template>
  <article class="proj rv" v-reveal="index * 90">
    <!-- kanji nomor -->
    <div class="i">{{ kanji }}</div>

    <!-- konten utama -->
    <div class="proj-content">
      <div class="proj-top">
        <div>
          <h3>{{ project.name }}</h3>
          <p>{{ project.desc }}</p>
          <div v-if="project.links && project.links.length" class="proj-links">
            <a
              v-for="link in project.links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="proj-link"
            >{{ link.label }} ↗</a>
          </div>
        </div>
        <!-- stack di kanan atas, hanya desktop -->
        <div class="st hidden md:block text-right">{{ project.stack.join(' / ') }}</div>
      </div>
      <!-- stack di bawah desc, hanya mobile -->
      <div class="st md:hidden mt-2">{{ project.stack.join(' / ') }}</div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/composables/usePortfolio'

const props = defineProps<{ project: Project; index: number }>()

const KANJI = ['一', '二', '三', '四', '五', '六']
const kanji = KANJI[props.index] ?? String(props.index + 1)
</script>

<style scoped>
.proj {
  display: grid;
  grid-template-columns: 54px 1fr;
  gap: 0 18px;
}

.proj-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.proj-top > div:first-child {
  flex: 1;
  min-width: 0;
}

.st {
  font-size: 12.5px;
  color: var(--mute);
  line-height: 1.7;
  flex-shrink: 0;
  max-width: 160px;
}

.proj-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.proj-link {
  font-size: 12.5px;
  color: var(--red);
  text-decoration: none;
  border: 1px solid var(--red);
  padding: 2px 10px;
  border-radius: 99px;
  transition: background 0.15s, color 0.15s;
}

.proj-link:hover {
  background: var(--red);
  color: var(--paper);
}
</style>
