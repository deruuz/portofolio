<template>
  <footer class="py-8 flex items-center justify-center gap-2 text-sm text-mute">
    <div class="logo serif">
      <span>{{ logoParts[0] }}</span><i>·</i><span>{{ logoParts[1] }}</span>
    </div>
    <span>·</span>
    <span>© {{ year }}</span>
  </footer>
</template>

<script setup lang="ts">
const { me } = usePortfolio().value
const logoParts = me.logo.split('·')
const year = new Date().getFullYear()
</script>
