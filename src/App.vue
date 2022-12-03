<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';

import { vResize } from '@/directives/vResize';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

import { provide } from 'vue';

const clientWidth: Ref<number | null> = ref(null);
const clientHeight: Ref<number | null> = ref(null);

provide('clientWidth', clientWidth);

onMounted(() => {
  clientWidth.value = document.body.clientWidth;
  clientHeight.value = document.body.clientHeight;
});

const setDimensions = function ({ width, height }: any) {
  clientWidth.value = width;
  clientHeight.value = height;
};
</script>

<template>
  <div v-resize="setDimensions" class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="max-w-7xl p-5 md:p-10 mx-auto w-full flex-grow justify-center">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>
