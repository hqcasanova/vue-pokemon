<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import XmarkSolid from '../icons/XmarkSolid.vue';

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
defineEmits<Emits>();

defineOptions({
  inheritAttrs: false,
});

onMounted(() => {
  document.body.classList.add('overflow-hidden');
});
onUnmounted(() => {
  document.body.classList.remove('overflow-hidden');
});
</script>

<template>
  <teleport to="body">
    <div class="fixed top-0 bottom-0 left-0 right-0 flex bg-black/40">
      <div
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

        <button
          class="app-btn absolute top-0 right-0 flex justify-center items-center min-mobile-dims w-[1.56em] h-[1.56em] -mt-[0.72em] -mr-[0.78em] bg-primary-states rounded-full"
          type="button"
          @click="$emit('cancel')"
        >
          <xmark-solid />
        </button>
      </div>
    </div>
  </teleport>
</template>
