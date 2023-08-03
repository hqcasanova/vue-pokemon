<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import {
  useIntersectionObserver,
  type MaybeElement,
  type UseIntersectionObserverOptions,
} from '@vueuse/core';

export type Props = {
  root?: Element | null;
  rootMargin?: string;
};
export type Emits = {
  (e: 'bottom'): void;
};

const props = withDefaults(defineProps<Props>(), {
  root: null,
  rootMargin: '',
});
const emit = defineEmits<Emits>();

const bottomEl = ref<MaybeElement>(null);

const { stop } = useIntersectionObserver(
  bottomEl,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      emit('bottom');
    }
  },
  props as UseIntersectionObserverOptions
);

onUnmounted(stop);
</script>

<template>
  <slot></slot>
  <div ref="bottomEl" />
</template>
