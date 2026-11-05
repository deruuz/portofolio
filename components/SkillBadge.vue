<template>
  <span class="inline-block border border-line rounded-full px-3 py-1 text-[13px] text-ink transition-colors hover:border-vermilion hover:text-vermilion">
    {{ name }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ name: string }>()
</script>
