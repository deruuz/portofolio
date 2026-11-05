<template>
  <button
    class="mini theme-btn"
    :aria-pressed="isDark"
    :aria-label="isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'"
    @click="toggle"
  >
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <!-- sun -->
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2"  x2="12" y2="5"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2"  y1="12" x2="5"  y2="12"/>
      <line x1="19" y1="12" x2="22" y2="12"/>
      <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"/>
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
      <line x1="4.22"  y1="19.78" x2="6.34"  y2="17.66"/>
      <line x1="17.66" y1="6.34"  x2="19.78" y2="4.22"/>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <!-- moon -->
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>

<style scoped>
.theme-btn {
  display: grid;
  place-items: center;
  padding: 5px 8px;
  line-height: 1;
}
</style>
