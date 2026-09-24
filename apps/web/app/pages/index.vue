<script setup lang="ts">
const { t } = useI18n()

useHead({ title: () => t('app.name') })
</script>

<template>
  <main class="grid min-h-dvh place-content-center gap-2 p-4 text-center">
    <h1 class="text-3xl font-bold">
      {{ t('app.name') }}
    </h1>
    <p>{{ t('home.comingSoon') }}</p>
  </main>
</template>
