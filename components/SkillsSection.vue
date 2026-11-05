<template>
  <section id="skills" aria-labelledby="skills-heading" class="scroll-mt-20 pt-[70px] pb-2.5">
    <SectionHeading id="skills-heading" v-bind="sections.skills" />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div v-for="group in skills" :key="group.name" class="rv" v-reveal>
        <h3 class="text-lg border-b-2 border-vermilion inline-block mb-3">{{ group.name }}</h3>
        <div class="flex flex-wrap gap-2">
          <SkillBadge v-for="name in group.items" :key="name" :name="name" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { sections, skills } = usePortfolio().value
</script>
