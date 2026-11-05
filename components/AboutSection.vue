<template>
  <section id="about" aria-labelledby="about-heading" class="scroll-mt-20 pt-[50px] pb-2.5">
    <SectionHeading id="about-heading" v-bind="sections.about" />
    <p class="about-story rv" v-reveal>{{ about.story }}</p>
    <dl class="rv about-grid" v-reveal="90">
      <template v-for="fact in about.facts" :key="fact.label">
        <dt>{{ fact.label }}</dt>
        <dd>{{ fact.value }}</dd>
      </template>
    </dl>
  </section>
</template>

<script setup lang="ts">
const { sections, about } = usePortfolio().value
</script>

<style scoped>
.about-story {
  font-size: 16px;
  line-height: 1.85;
  color: var(--ink);
  max-width: 600px;
  margin-bottom: 28px;
}

.about-grid {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px 24px;
  max-width: 540px;
}

dt {
  color: var(--mute);
  font-size: 13px;
  letter-spacing: 0.06em;
  padding-top: 3px;
  white-space: nowrap;
}

dd {
  color: var(--ink);
  font-size: 15px;
  line-height: 1.6;
}
</style>
