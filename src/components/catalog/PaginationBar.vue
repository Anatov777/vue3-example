<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  currentPage: number;
  perPage?: number;
  list: any[];
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  perPage: 10,
  list: [] as any,
});

const emit = defineEmits<{
  (event: 'update:currentPage', value: number): void;
}>();

const pages = computed<number>(() => {
  return Math.ceil(props.list.length / props.perPage);
});

const onPageClick = (page: number) => {
  emit('update:currentPage', page);
};
</script>
<template>
  <div class="pagination-bar">
    <div
      v-for="page in pages"
      class="pagination-bar__item"
      :class="{ active: currentPage === page }"
      @click="onPageClick(page)"
    >
      {{ page }}
    </div>
  </div>
</template>

<style scoped lang="postcss">
.pagination-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
  &__item {
    padding: 5px;
    border: 2px solid gray;
    background-color: #fff;
    min-width: 40px;
    display: flex;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: gray;
    }
    &.active {
      background-color: green;
    }
  }
}
</style>
