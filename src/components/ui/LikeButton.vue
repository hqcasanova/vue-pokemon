<script setup lang="ts">
import HeartSolid from '../icons/HeartSolid.vue';

export type Props = {
  modelValue: boolean;
};
export type Emits = {
  (e: 'update:modelValue', keyValue: Props['modelValue']): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const onClick = () => emit('update:modelValue', !props.modelValue);
</script>

<template>
  <button
    class="app-btn min-mobile-dims leading-none text-dark-secondary hover:text-liked disabled:text-lightest-grey"
    :class="{ 'text-liked': props.modelValue }"
    @click.stop="onClick"
  >
    <heart-solid
      class="stroke-current"
      :class="props.modelValue ? 'fill-current' : 'fill-none'"
    />
  </button>
</template>

<style scoped></style>
