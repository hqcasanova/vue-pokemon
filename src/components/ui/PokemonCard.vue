<script setup lang="ts">
import { computed } from 'vue';
import PokemonImg from '@/components/ui/PokemonImg.vue';
import LikeButton from '@/components/ui/LikeButton.vue';

import { type Pokemon } from '@/models/Pokemon';

export type Props = Pokemon & {
  idLength?: number;
  isLikeDisabled?: boolean;
};
export type Emits = {
  (e: 'update:isLiked', keyValue: Props['isLiked']): void;
};

const props = withDefaults(defineProps<Props>(), {
  idLength: 0,
  isLikeDisabled: false,
});
const emit = defineEmits<Emits>();

const paddedId = computed(() => props.id.toString().padStart(props.idLength, '0'));
const readableName = computed(() => props.name.replace('-', ' '));

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
    <slot>
      <pokemon-img
        class="w-[6.2em] h-[6.2em] mx-auto mb-[1.4em]"
        :urls="imgUrls"
      />
    </slot>
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
