<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="max-w-7xl p-5 md:p-10 m-auto w-full">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
