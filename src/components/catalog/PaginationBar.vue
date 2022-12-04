<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  activePage: number;
  perPage?: number;
  lastPage?: number;
}

const props = withDefaults(defineProps<Props>(), {
  activePage: 1,
  perPage: 10,
  lastPage: 1,
});

const emit = defineEmits<{
  (event: 'update:activePage', value: number): void;
}>();

const middlePageNumber = computed<number>(() => {
  if (props.lastPage < 40) {
    return Math.ceil((props.lastPage - 5) / 2) + 5;
  } else {
    return Math.ceil((props.lastPage - 5) / 2);
  }
});

const visiblePages = computed<number[]>(() => {
  const pages = [];

  if (props.lastPage < 8) {
    for (let i = 1; i <= props.lastPage; i++) {
      pages.push(i);
    }
  } else if (props.activePage < 5) {
    for (let i = 1; i <= 5; i++) {
      pages.push(i);
    }
    pages.push(middlePageNumber.value);
    pages.push(props.lastPage);
  } else if (props.activePage >= props.lastPage - 4) {
    pages.push(1);
    if (props.lastPage >= 40) {
      pages.push(middlePageNumber.value);
    }

    if (props.activePage === props.lastPage - 4) {
      pages.push(props.activePage - 2);
      pages.push(props.activePage - 1);
    }
    for (let i = props.lastPage - 4; i <= props.lastPage; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (props.activePage === 5) {
      pages.push(2);
    }
    if (props.activePage < middlePageNumber.value + 2) {
      pages.push(...getActualPages());
    }
    if (
      !(
        middlePageNumber.value >= props.activePage - 2 &&
        middlePageNumber.value <= props.activePage + 2
      )
    ) {
      pages.push(middlePageNumber.value);
    }
    if (props.activePage >= middlePageNumber.value + 2) {
      pages.push(...getActualPages());
    }

    pages.push(props.lastPage);
  }
  return pages;
});

const getActualPages = () => {
  const pages = [];
  for (let i = props.activePage - 2; i <= props.activePage + 2; i++) {
    pages.push(i);
  }
  return pages;
};

const hasMarginRight = (pageNumber: number) => {
  return (
    props.lastPage >= 8 &&
    ((pageNumber === 1 && props.activePage > 5) ||
      (pageNumber === middlePageNumber.value &&
        props.activePage > middlePageNumber.value + 2 &&
        middlePageNumber.value < props.lastPage - 4))
  );
};
const hasMarginLeft = (pageNumber: number) => {
  return (
    props.lastPage >= 8 &&
    ((pageNumber === props.lastPage &&
      props.activePage <= props.lastPage - 5) ||
      (pageNumber === middlePageNumber.value &&
        props.activePage < middlePageNumber.value - 2))
  );
};
const isHidden = (pageNumber: number) => {
  return (
    isLeftActualPageNumber(pageNumber) ||
    isRightActualPageNumber(pageNumber) ||
    isMiddlePageNumber(pageNumber) ||
    isFirstPageNumber(pageNumber) ||
    isPageNumberMoreThanThree(pageNumber) ||
    isPageNumberBeforeLastThree(pageNumber) ||
    isPageNumberNotActual(pageNumber)
  );
};
const isLeftActualPageNumber = (pageNumber: number) => {
  return (
    pageNumber === props.activePage - 2 && props.activePage !== props.lastPage
  );
};
const isRightActualPageNumber = (pageNumber: number) => {
  return (
    pageNumber === props.activePage + 2 &&
    pageNumber !== props.lastPage &&
    props.activePage !== 1
  );
};
const isMiddlePageNumber = (pageNumber: number) => {
  return (
    pageNumber === middlePageNumber.value &&
    props.activePage - 1 !== middlePageNumber.value &&
    props.activePage + 1 !== middlePageNumber.value &&
    props.activePage !== middlePageNumber.value &&
    props.lastPage > 5
  );
};
const isFirstPageNumber = (pageNumber: number) => {
  return (
    pageNumber === 1 &&
    props.activePage > 2 &&
    props.activePage !== props.lastPage
  );
};
const isPageNumberMoreThanThree = (pageNumber: number) => {
  return (
    props.activePage < 3 && pageNumber > 3 && pageNumber !== props.lastPage
  );
};
const isPageNumberBeforeLastThree = (pageNumber: number) => {
  return (
    props.activePage === props.lastPage &&
    pageNumber < props.lastPage - 2 &&
    pageNumber !== 1
  );
};
const isPageNumberNotActual = (pageNumber: number) => {
  return (
    (pageNumber < props.activePage - 1 || pageNumber > props.activePage + 1) &&
    pageNumber !== props.lastPage &&
    props.activePage !== props.lastPage &&
    props.activePage !== 1
  );
};

const onPageClick = (page: number) => {
  emit('update:activePage', page);
};
const setActivePage = (page: number) => {
  emit('update:activePage', page);
};
</script>

<template>
  <ul class="pagination-bar">
    <li
      v-if="activePage !== 1"
      class="pagination-bar__arrow pagination-bar__arrow--left"
      @click="setActivePage(activePage - 1)"
    >
      &lt;
    </li>
    <li
      v-for="page in visiblePages"
      :key="page"
      class="pagination-bar__page"
      :class="{
        'active-page': page === activePage,
        'page-mr': hasMarginRight(page),
        'page-ml': hasMarginLeft(page),
        'mobile-hidden-link': isHidden(page),
      }"
      @click="onPageClick(page)"
    >
      <router-link :to="`/?page=${page}`" class="pagination-bar__page-link">
        {{ page }}
      </router-link>
    </li>
    <li
      v-if="activePage !== lastPage"
      class="pagination-bar__arrow pagination-bar__arrow--right"
      @click="setActivePage(activePage + 1)"
    >
      &gt;
    </li>
  </ul>
</template>

<style scoped lang="postcss">
.pagination-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
  &__page {
    background-color: #f0f4f9;
    cursor: pointer;
    border-radius: 8px;
    width: 48px;
    height: 48px;
    min-width: 48px;
    margin-left: 8px;
    margin-right: 8px;
    &:hover {
      background-color: #e5e9ee;
    }

    @media (max-width: 768px) {
      min-width: 32px;
      min-height: 32px;
      width: 32px;
      height: 32px;
    }

    &-link {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }

    &.active-page {
      @apply bg-cyan-400 text-cyan-50 border-cyan-600;
    }

    &.page-mr {
      margin-right: 24px;
      @media (max-width: 600px) {
        margin-right: 8px;
      }
    }
    &.page-ml {
      margin-left: 24px;
      @media (max-width: 600px) {
        margin-left: 8px;
      }
    }

    &.mobile-hidden-link {
      @media (max-width: 670px) {
        display: none;
      }
    }
  }

  &__arrow {
    width: 48px;
    height: 48px;
    min-width: 48px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
    color: #333;
    &:hover {
      background-color: #e5e9ee;
    }
    @media (max-width: 768px) {
      min-width: 32px;
      min-height: 32px;
      width: 32px;
      height: 32px;
    }
    &--left {
      margin-right: 16px;
      @media (max-width: 420px) {
        margin-right: 14px;
      }
    }
    &--right {
      margin-left: 16px;
      @media (max-width: 420px) {
        margin-left: 14px;
      }
    }
  }
}
</style>
