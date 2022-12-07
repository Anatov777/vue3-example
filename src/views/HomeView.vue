<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// @ts-ignore
import useCataas from '@/composables/useCataas';
import CatalogList from '@/components/catalog/CatalogList.vue';
import PaginationBar from '@/components/catalog/PaginationBar.vue';

import type { Ref } from 'vue';
import type { CatModel } from '@/models/CataasModel';
import type { RouteLocationNormalizedLoaded  } from 'vue-router';

const route: RouteLocationNormalizedLoaded = useRoute();

const { getCats } = useCataas();

const cats: Ref<CatModel[] | undefined> = ref([]);
const currentPage: Ref<number> = ref(1);
const perPage: Ref<number> = ref(10);

const lastPage = computed<number>(() => {
  if (cats.value) {
    return Math.ceil(cats.value.length / perPage.value);
  }
  return 1;
});

onMounted(async (): Promise<void> => {
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
