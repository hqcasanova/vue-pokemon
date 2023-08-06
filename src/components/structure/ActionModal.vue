<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

export type Props = {
  actionName?: string;
  actionType?: 'standard' | 'destructive' | '';
  isDisabledAction?: boolean;
};
export type Emits = {
  (e: 'cancel'): void;
  (e: 'ok'): void;
};

withDefaults(defineProps<Props>(), {
  actionName: 'Ok',
  actionType: '',
  isDisabledAction: false,
});
const emit = defineEmits<Emits>();

defineOptions({
  inheritAttrs: false,
});

const container = ref<HTMLElement | null>(null);
onClickOutside(container, () => emit('cancel'));
useFocusTrap(container, { immediate: true });

onMounted(() => {
  document.body.classList.add('overflow-hidden');
});
onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
});

defineExpose({ container });
</script>

<template>
  <teleport to="body">
    <div class="fixed top-0 bottom-0 left-0 right-0 flex bg-black/40">
      <div
        ref="container"
        v-bind="$attrs"
        class="relative"
        role="dialog"
        aria-modal="true"
      >
        <slot name="before-content"></slot>

        <div class="content relative flex-1">
          <slot></slot>

          <slot name="actions">
            <div
              v-if="actionType"
              class="flex justify-center 2xs:justify-end"
            >
              <button
                class="app-button py-2 px-4 text-secondary-states font-normal border border-darker-grey rounded-xl bg-secondary-states"
                type="button"
                @click="$emit('cancel')"
              >
                Cancel
              </button>

              <button
                class="app-btn ml-4 py-2 px-4 text-black font-bold first-letter:uppercase rounded-xl bg-primary-states"
                :class="{ 'bg-danger-states': actionType === 'destructive' }"
                type="button"
                :disabled="isDisabledAction"
                @click="$emit('ok')"
              >
                {{ actionName }}
              </button>
            </div>
          </slot>
        </div>

        <slot name="navigation">
          <button
            class="app-btn absolute top-0 right-0 min-mobile-dims text-secondary-states text-4.5xl font-normal"
            type="button"
            @click="$emit('cancel')"
          >
            &times;
          </button>
        </slot>
      </div>
    </div>
  </teleport>
</template>
