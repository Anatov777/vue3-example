<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
</script>

<template>
  <AppHeader />
  <div class="max-w-7xl p-10 m-auto">
    <router-view />
  </div>
</template>
