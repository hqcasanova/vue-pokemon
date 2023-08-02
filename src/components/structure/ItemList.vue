<script setup lang="ts" generic="T extends Object">
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue';

type Props = {
  items: T[] | T;
  itemKey?: keyof T;
};
const props = defineProps<Props>();

defineOptions({
  inheritAttrs: false,
});

const isEmpty = computed(() => {
  const items = props.items;

  if (Array.isArray(items)) {
    return items.length === 0;
  }
  return Object.keys(items).length === 0;
});

const getId = (item?: any) => {
  if (typeof item === 'undefined') {
    return uuidv4();
  } else {
    return item[props.itemKey];
  }
};
</script>

<template>
  <slot
    v-if="isEmpty"
    name="empty"
  >
    No list items
  </slot>

  <div
    v-else
    class="item-list"
    v-bind="$attrs"
    role="list"
  >
    <template v-if="Array.isArray(items)">
      <slot
        v-for="item in items"
        v-bind="item"
        :key="getId(item)"
      ></slot>
    </template>

    <!-- eslint-disable vue/valid-v-for -->
    <template v-else>
      <slot
        v-for="(value, valueKey) in items"
        v-bind="{ value, valueKey }"
        :key="getId()"
      ></slot>
    </template>
    <!-- enable -->

    <slot name="last"></slot>
  </div>
</template>
