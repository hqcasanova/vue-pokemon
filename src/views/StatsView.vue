<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import usePokemons from '@/composables/usePokemons';
import ActionModal from '@/components/structure/ActionModal.vue';

import Stats from '@/models/Stats';

export type Props = {
  id: string;
};
const props = withDefaults(defineProps<Props>(), {
  id: '',
});

const router = useRouter();
const { fetchStats, isLoading, likePokemon } = usePokemons();

const stats = ref<Stats>(new Stats({}));
const isNotFound = ref<boolean>(false);

onMounted(async () => {
  if (props.id) {
    const data = await fetchStats(props.id);

    if (!data) {
      isNotFound.value = true;
    } else {
      stats.value = data;
    }
  }
});

const onCancelAction = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <ActionModal
    :is-disabled-action="isLoading || isNotFound"
    @cancel="onCancelAction"
  >
    <template #default>
      <div class="stats relative min-h-[500px]">
        <div
          v-if="isLoading || isNotFound"
          class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-lighter-grey/60 backdrop-blur-sm"
          :class="{ 'text-danger font-normal': isNotFound }"
        >
          {{ isNotFound ? 'Pokemon could not be found' : 'Loading pokemon data...' }}
        </div>

        <heart-solid @click="likePokemon(props.id)" />
        {{ stats }}
      </div>
    </template>
  </ActionModal>
</template>
