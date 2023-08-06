<script setup lang="ts">
import { computed, ref } from 'vue';
import brokenImg from '@/assets/broken.png';

export type Props = {
  urls: string[];
  notFoundUrl?: string;
};
const props = withDefaults(defineProps<Props>(), {
  notFoundUrl: brokenImg,
});

const imgIndex = ref<number>(0);
const url = computed(() => props.urls[imgIndex.value] || props.notFoundUrl);
</script>

<template>
  <img
    :src="url"
    @error="imgIndex++"
  />
</template>
