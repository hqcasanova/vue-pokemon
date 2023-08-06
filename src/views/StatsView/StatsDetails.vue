<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import ItemList from '@/components/structure/ItemList.vue';
import PokemonImg from '@/components/ui/PokemonImg.vue';

import { type Pokemon } from '@/models/Pokemon';

type Props = Pokemon & { isLoading: boolean; error: string | Error };
defineProps<Props>();
</script>

<template>
  <div class="overflow-y-auto absolute top-0 bottom-0 left-0 right-0 p-11 text-base">
    <div
      v-if="isLoading || error"
      class="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center p-11 text-center bg-lighter-grey/60 backdrop-blur"
    >
      <font-awesome-icon
        v-if="error"
        class="mb-3 title-text"
        :class="{ 'text-danger': error }"
        :icon="faCircleExclamation"
      />
      <p class="text-xl">
        {{ error ? 'Error encountered while retrieving stats' : 'Loading stats...' }}
      </p>
    </div>

    <h2 class="mb-5 title-text leading-none">Stats</h2>

    <item-list
      v-if="stats"
      class="grid grid-cols-3 gap-2"
      :items="stats"
    >
      <template #default="stat: { valueKey: string, value: string }">
        <div
          class="stat-row col-span-2 first-letter:uppercase [&:nth-child(4n+1)]:bg-white [&:nth-child(4n+3)]:bg-light-secondary"
        >
          {{ stat.valueKey.replace('-', ' ') }}
        </div>
        <div
          class="stat-row text-right [&:nth-child(4n+2)]:bg-white [&:nth-child(4n+4)]:bg-light-secondary"
        >
          {{ stat.value }}
        </div>
      </template>
    </item-list>

    <pokemon-img
      class="mt-6 mx-auto lg:hidden"
      :urls="imgUrls"
    />
  </div>
</template>

<styles scoped lang="scss">
.stat-row {
  @apply h-full px-5 py-2 font-bold;
}
</styles>
