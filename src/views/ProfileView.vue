<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Ref } from 'vue';
import useAuthUser from '@/composables/UseAuthUser';
import useCataas from '@/composables/useCataas';

const { user } = useAuthUser();
const { getCatSay } = useCataas();

const catData: Ref<any> = ref(null);

onMounted(async () => {
  const userName: string = user.value?.user_metadata.name;
  catData.value = await getCatSay(`Hello, ${userName}`);
});
</script>

<template>
  <div v-if="user && catData?.url">
    <img
      :src="`https://cataas.com/${catData.url}`"
      width="300"
      height="400"
      class="preloader mx-auto"
    />
  </div>
</template>
