<script setup lang="ts">
import { computed, ref } from 'vue';
import brokenImg from '@/assets/broken.png';

import { type Pokemon } from '@/models/Pokemon';

export type Props = Pokemon & {
  idLength?: number;
  noImgPath?: string;
};
const props = withDefaults(defineProps<Props>(), {
  idLength: 4,
  noImgPath: brokenImg,
});

const imgIndex = ref<number>(0);
const paddedId = computed(() => props.id.padStart(props.idLength, '0'));
const url = computed(() => props.imgUrls[imgIndex.value] || props.noImgPath);
</script>

<template>
  <figure class="bg-white pt-[1.4em] pb-[1.1em] text-center">
    <img
      class="w-[6.2em] h-auto mx-auto mb-[1.4em]"
      :src="url"
      @error="imgIndex++"
    />
    <figcaption class="leading-[1.25em] font-bold">
      <span class="block first-letter:uppercase">{{ props.name }}</span>
      <span class="text-dark-secondary">{{ paddedId }}</span>
    </figcaption>
  </figure>
</template>
