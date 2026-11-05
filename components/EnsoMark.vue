<template>
  <div class="eno w-full max-w-[180px] md:max-w-[340px] mx-auto md:mx-0 mt-8 md:mt-0 md:justify-self-center" aria-hidden="true">
    <svg viewBox="0 0 300 300">
      <path pathLength="1" d="M150 26 C232 18 290 86 278 160 C266 236 190 288 116 266 C48 246 10 172 36 102 C54 54 100 30 156 30" />
    </svg>
    <div class="tate serif">{{ me.vertical }}</div>
    <div class="absolute right-[2%] bottom-[6%]">
      <HankoStamp variant="static" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { me } = usePortfolio().value
</script>
