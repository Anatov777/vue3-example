<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import useCataas from '@/composables/useCataas';
import CatalogList from '@/components/catalog/CatalogList.vue';
import PaginationBar from '@/components/catalog/PaginationBar.vue';

const { getCats } = useCataas();

let cats: Ref<any[]> = ref([]);
let currentPage: Ref<number> = ref(1);

onMounted(async () => {
  cats.value = await getCats();
});
</script>
<template>
  <div>
    <h1 class="text-center mb-10">Каталог</h1>
    <CatalogList v-model:current-page="currentPage" :list="cats" />
    <PaginationBar v-model:current-page="currentPage" :list="cats" />
  </div>
</template>
