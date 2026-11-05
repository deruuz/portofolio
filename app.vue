<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:rounded-md focus:text-ink">Lewati ke konten</a>
  <div class="mx-auto max-w-wrap px-[22px] pb-[140px] relative">
    <div class="relative">
      <TheHeader />
    </div>
    <main id="main">      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <TheFooter />
  </div>
  <InkCanvas />
  <svg width="0" height="0" aria-hidden="true" style="position:absolute">
    <filter id="rough">
      <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" result="t" />
      <feDisplacementMap in="SourceGraphic" in2="t" scale="3" />
    </filter>
  </svg>
</template>
