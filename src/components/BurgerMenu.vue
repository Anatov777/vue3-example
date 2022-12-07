<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import type { BurgerMenuItem } from '@/types/BurgerMenuTypes';

import IconBurger from '@/components/icons/IconBurger.vue';
import IconClose from '@/components/icons/IconClose.vue';

interface Props {
  isLoggedIn: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoggedIn: false,
});

const isShowBurgerMenu: Ref<boolean> = ref(false);
const burgerMenu: Ref<HTMLDivElement | null> = ref(null);

const burgerMenuItems = computed<BurgerMenuItem[]>(() => {
  const items = [
    {
      label: 'burger-item-1',
      to: 'Home',
      text: 'Главная',
      isShow: true,
    },
    {
      label: 'burger-item-2',
      to: 'Profile',
      text: 'Профиль',
      isShow: true,
    },
    {
      label: 'burger-item-3',
      to: 'Login',
      text: 'Логин',
      isShow: !props.isLoggedIn,
    },
    {
      label: 'burger-item-4',
      to: 'Register',
      text: 'Регистрация',
      isShow: !props.isLoggedIn,
    },
    {
      label: 'burger-item-5',
      to: 'Logout',
      text: 'Выйти',
      isShow: props.isLoggedIn,
    },
  ];
  return items;
});

const toggleBurgerMenu = (): void => {
  isShowBurgerMenu.value = !isShowBurgerMenu.value;
};

const clickListenerHandler = (event: Event): void => {
  if (
    isShowBurgerMenu.value &&
    (event.target as HTMLElement).closest('.burger-menu') !== burgerMenu.value
  ) {
    toggleBurgerMenu();
  }
};

document.body.addEventListener('click', clickListenerHandler);

onUnmounted((): void =>
  document.body.removeEventListener('click', clickListenerHandler)
);
</script>
<template>
  <div class="burger-menu" ref="burgerMenu">
    <div class="burger-menu__icon-wrap" @click="toggleBurgerMenu">
      <IconBurger class="burger-menu__icon" />
    </div>

    <Transition name="slide-fade">
      <div v-if="isShowBurgerMenu" class="burger-menu__menu">
        <div class="burger-menu__wrap">
          <div class="burger-menu__top">
            <h2>Меню</h2>
            <IconClose
              class="burger-menu__icon-close"
              @click="toggleBurgerMenu"
            />
          </div>
          <div class="burger-menu__content">
            <ul class="burger-menu__list">
              <template v-for="item in burgerMenuItems" :key="item.label">
                <li v-if="item.isShow" class="burger-menu__list-item">
                  <router-link
                    :to="{ name: item.to }"
                    class="burger-menu__link"
                    @click="toggleBurgerMenu"
                  >
                    {{ item.text }}
                  </router-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style scoped lang="postcss">
.burger-menu {
  &__menu {
    @apply fill-gray-200;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  &__icon-wrap {
    @apply cursor-pointer fill-gray-200 p-4;
    height: 100%;
    position: relative;
    z-index: 1;
    &:hover {
      @apply bg-gray-500;
    }
  }
  &__icon {
    @apply cursor-pointer fill-gray-200;
    height: 100%;
  }
  &__icon-close {
    @apply cursor-pointer fill-gray-800;
    width: 40px;
    height: 40px;
    &:hover {
      @apply bg-gray-400 rounded-3xl;
    }
  }
  &__wrap {
    @apply bg-gray-200 text-gray-600 border-2 border-gray-400;
    @apply rounded-r-3xl border-t-0 border-l-0 pb-5 pt-1;
    width: 300px;
    min-height: 300px;
  }
  &__top {
    @apply flex justify-between items-center p-5;
    font-size: 24px;
    font-weight: bold;
  }
  &__link {
    @apply hover:bg-gray-500 hover:text-white;
    @apply transition-all ease-in-out duration-300 p-5;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(-100%);
  }
}
</style>
