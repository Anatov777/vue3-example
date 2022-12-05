<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Ref } from 'vue';
import useCataas from '@/composables/useCataas';
import CatalogList from '@/components/catalog/CatalogList.vue';
import PaginationBar from '@/components/catalog/PaginationBar.vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const { getCats } = useCataas();

const cats: Ref<any[]> = ref([]);
const currentPage: Ref<number> = ref(1);
const perPage: Ref<number> = ref(10);

const lastPage = computed<number>(() => {
  return Math.ceil(cats.value.length / perPage.value);
});

onMounted(async () => {
  if (route.query.page) {
    currentPage.value = Number(route.query.page);
  }
  cats.value = await getCats();
});
</script>
<template>
  <div>
    <h1 class="text-center mb-10">Каталог</h1>
    <CatalogList v-model:current-page="currentPage" :list="cats" />
    <PaginationBar
      v-model:active-page="currentPage"
      :lastPage="lastPage"
      :per-page="perPage"
    />
  </div>
</template>
