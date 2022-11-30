<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';

interface Props {
  list: any[];
  id?: string;
  currentPage?: number;
  itemsPerPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  list: [] as any,
  id: '_id',
  currentPage: 1,
  itemsPerPage: 10,
});

const catalogElement: Ref<HTMLDivElement | null> = ref(null);

watch(
  () => props.currentPage,
  () => {
    if (catalogElement.value) {
      catalogElement.value.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
);

const currentList = computed<any[]>(() => {
  if (!props.list.length) {
    return [];
  }
  const newList: any[] = [];
  const startIndex: number = (props.currentPage - 1) * props.itemsPerPage;
  const finalIndex: number = startIndex + props.itemsPerPage;

  for (let i: number = startIndex; i < finalIndex; i++) {
    if (!props.list[i]) {
      break;
    }
    newList.push(props.list[i]);
  }
  return newList;
});
</script>
<template>
  <div v-if="currentList.length" class="catalog-list" ref="catalogElement">
    <div v-for="item in currentList" :key="item[id]" class="catalog-list__item">
      <img
        :src="`https://cataas.com/cat/${item[id]}`"
        width="300"
        height="400"
        class="preloader"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.catalog-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  @media (min-width: 768px) {
    justify-content: space-between;
  }

  &__item {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid gray;
    @apply border-solid border-2 rounded-3xl border-lime-400 bg-stone-200 p-5;

    @media (min-width: 768px) {
      flex: 0 0 calc(50% - 20px);
      max-width: none;
    }

    img {
      object-fit: contain;
      width: 300px;
      height: 400px;
    }
  }
}
</style>