<template>
  <section id="projects" aria-labelledby="projects-heading" class="scroll-mt-20 pt-[70px] pb-2.5">
    <SectionHeading id="projects-heading" v-bind="sections.projects" />
    <ProjectCard
      v-for="(project, index) in projects"
      :key="project.name"
      :project="project"
      :index="index"
    />
  </section>
</template>

<script setup lang="ts">
const { sections, projects } = usePortfolio().value
</script>
