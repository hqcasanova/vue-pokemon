<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';

export type Props = {
  destinationId: number;
  firstId?: number;
  lastId?: number;
  homeRouteName?: string;
  statsRouteName?: string;
};
const props = withDefaults(defineProps<Props>(), {
  firstId: 0,
  lastId: 99999999,
  homeRouteName: 'home',
  statsRouteName: 'stats',
});

const toRoute = computed(() => {
  if (props.destinationId < props.firstId || props.destinationId > props.lastId) {
    return { name: props.homeRouteName };
  }

  return { name: props.statsRouteName, params: { id: props.destinationId } };
});
</script>

<template>
  <router-link
    class="app-button flex justify-center items-center min-mobile-dims bg-primary-states rounded-r-full"
    :to="toRoute"
  >
    <font-awesome-icon :icon="faChevronRight" />
  </router-link>
</template>
