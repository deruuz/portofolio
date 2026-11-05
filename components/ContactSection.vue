<template>
  <section id="contact" aria-labelledby="contact-heading" class="contact scroll-mt-20 pt-[90px] pb-2.5 text-center">
    <SectionHeading id="contact-heading" v-bind="sections.contact" />
    <p class="rv text-mute" v-reveal>{{ contact.blurb }}</p>
    <div class="rv flex flex-wrap gap-6 justify-center mt-5" v-reveal>
      <a v-for="link in contact.links" :key="link.label" class="lnk" :href="link.href">{{ link.label }}</a>
    </div>
    <div class="rv flex justify-center mt-10" v-reveal>
      <HankoStamp variant="big" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { sections, contact } = usePortfolio().value
</script>
