<script setup lang="ts">
import CatalogList from '@/components/catalog/CatalogList.vue';
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';

import PaginationBar from '@/components/catalog/PaginationBar.vue';

let cats: Ref<any[]> = ref([]);
let currentPage: Ref<number> = ref(1);

const getCats = async () => {
  try {
    const url = 'https://cataas.com/api/cats?limit=21';
    let response = await fetch(url);
    response.json().then((res) => {
      console.log(res);
      cats.value = res;
    });
  } catch (error: any) {
    console.log(error.message);
  }
};

onMounted(async () => {
  await getCats();
});
</script>
<template>
  <main>
    <h1 class="text-center mb-10">Каталог</h1>
    <CatalogList v-model:current-page="currentPage" :list="cats" />
    <PaginationBar v-model:current-page="currentPage" :list="cats" />
  </main>
</template>
