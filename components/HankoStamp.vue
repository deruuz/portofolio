<template>
  <div
    class="hanko"
    :class="[
      variant === 'big' ? 'w-[110px] h-[110px] text-[64px]' : 'w-[62px] h-[62px] text-[38px]',
      variant === 'static' ? 'rotate-[-7deg]' : '',
    ]"
  >検</div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'static' | 'big' }>(), { variant: 'static' })
</script>
