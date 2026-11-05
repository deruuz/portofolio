<template>
  <section id="experience" aria-labelledby="experience-heading" class="scroll-mt-20 pt-[70px] pb-2.5">
    <SectionHeading id="experience-heading" v-bind="sections.experience" />
    <div class="tl rv" v-reveal>
      <div v-for="item in experience" :key="item.role">
        <small>{{ item.when }}</small>
        <h3>{{ item.role }} · {{ item.org }}</h3>
        <p>{{ item.note }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { sections, experience } = usePortfolio().value
</script>
