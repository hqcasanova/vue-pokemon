<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { computed } from 'vue';

export type Props = {
  modelValue: boolean;
};
export type Emits = {
  (e: 'update:modelValue', keyValue: Props['modelValue']): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const icon = computed(() => (props.modelValue ? fasHeart : farHeart));

const onClick = () => emit('update:modelValue', !props.modelValue);
</script>

<template>
  <button
    class="app-btn min-mobile-dims leading-none text-dark-secondary hover:text-liked focus:shadow-current focus:shadow-lg disabled:text-lightest-grey rounded-full"
    :class="{ 'text-liked': props.modelValue }"
    @click.stop="onClick"
  >
    <font-awesome-icon
      :icon="icon"
      class="fill-current"
    />
  </button>
</template>

<style scoped></style>
