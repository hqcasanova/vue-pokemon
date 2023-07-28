<script setup lang="ts">
import { type Pokemon } from '@/models/Pokemon';

const props = defineProps<Pokemon>();
</script>

<template>
  <figure>
    <img :src="imgUrl" />
    <figcaption>
      {{ props.name }}
      {{ props.id }}
    </figcaption>
  </figure>
</template>
