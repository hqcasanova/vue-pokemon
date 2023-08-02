<script setup lang="ts">
import { computed, ref } from 'vue';
import brokenImg from '@/assets/broken.png';
import LikeButton from '@/components/ui/LikeButton.vue';

import { type Pokemon } from '@/models/Pokemon';

export type Props = Pokemon & {
  idLength?: number;
  noImgPath?: string;
  isLikeDisabled?: boolean;
};
export type Emits = {
  (e: 'update:isLiked', keyValue: Props['isLiked']): void;
};

const props = withDefaults(defineProps<Props>(), {
  idLength: 0,
  noImgPath: brokenImg,
  isLikeDisabled: false,
});
const emit = defineEmits<Emits>();

const imgIndex = ref<number>(0);
const paddedId = computed(() => props.id.toString().padStart(props.idLength, '0'));
const readableName = computed(() => props.name.replace('-', ' '));
const url = computed(() => props.imgUrls[imgIndex.value] || props.noImgPath);
const isLikedModel = computed({
  get() {
    return props.isLiked;
  },

  set(newIsLiked: boolean) {
    emit('update:isLiked', newIsLiked);
  },
});
</script>

<template>
  <figure class="relative pt-[1.4em] pb-[1.1em] text-center bg-white">
    <like-button
      v-model="isLikedModel"
      class="absolute top-0 right-0 w-[2.1em] h-[2.1em]"
      :disabled="isLikeDisabled"
    />
    <img
      class="w-[6.2em] h-[6.2em] mx-auto mb-[1.4em]"
      :src="url"
      @error="imgIndex++"
    />
    <figcaption class="leading-[1.25em] font-bold">
      <span class="block first-letter:uppercase">{{ readableName }}</span>
      <span
        v-show="!isNaN(id)"
        class="text-dark-secondary"
        >{{ paddedId }}</span
      >
    </figcaption>
  </figure>
</template>
