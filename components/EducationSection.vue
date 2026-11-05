<template>
  <section id="education" aria-labelledby="education-heading" class="scroll-mt-20 pt-[70px] pb-2.5">
    <SectionHeading id="education-heading" v-bind="sections.education" />
    <div class="tl rv" v-reveal>
      <div v-for="item in education" :key="item.org">
        <small>{{ item.when }}</small>
        <h3>{{ item.title }} · {{ item.org }}</h3>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { sections, education } = usePortfolio().value
</script>
