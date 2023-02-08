<script setup lang="ts">
interface Props {
  itemData: any;
}

const props = withDefaults(defineProps<Props>(), {
  itemData: () => {},
});
</script>
<template>
  <div class="catalog-card">
    <div class="catalog-card__top">
      <img
        :src="`https://cataas.com/cat/${itemData._id}`"
        width="300"
        height="400"
        class="preloader"
      />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.catalog-card {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid gray;
  @apply border-solid border-2 rounded-3xl border-lime-400 bg-stone-200 p-5;

  @media (min-width: 768px) {
    flex: 0 0 calc(50% - 20px);
    max-width: none;
  }

  .catalog-card__top {
    height: 400px;
    align-self: center;
    img {
      object-fit: contain;
      width: 300px;
      height: 100%;
    }
  }
}
</style>
