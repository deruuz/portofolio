<template>
  <h2>
    <span v-if="number" class="n">{{ number }}</span>{{ title }} <small>{{ label }}</small>
  </h2>
</template>

<script setup lang="ts">
defineProps<{ number?: string; title: string; label?: string }>()
</script>
