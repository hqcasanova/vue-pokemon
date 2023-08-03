<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import usePokemons from '@/composables/usePokemons';
import ActionModal from '@/components/structure/ActionModal.vue';
import PokemonCard from '@/components/ui/PokemonCard.vue';
import ItemList from '@/components/structure/ItemList.vue';

import Pokemon from '@/models/Pokemon';

export type Props = {
  id: Pokemon['id'];
};
const props = defineProps<Props>();

const router = useRouter();
const { isLoading, countDigits, fetchPokemon, toggleLike } = usePokemons();

const pokemon = ref<Pokemon>(new Pokemon(props.id));
const isNotFound = ref<boolean>(false);

onMounted(async () => {
  const data = await fetchPokemon(props.id);

  if (!data) {
    isNotFound.value = true;
  } else {
    pokemon.value = data;
  }
});

const onCancelAction = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <action-modal
    class="w-[85%] max-w-[75rem] flex m-auto text-[6vh] bg-secondary rounded-md"
    :is-disabled-action="isLoading || isNotFound"
    @cancel="onCancelAction"
  >
    <template #before-content>
      <pokemon-card
        class="w-[9.6em] rounded-l-md"
        v-bind="pokemon"
        :id-length="countDigits"
        :is-like-disabled="isNotFound"
        @update:is-liked="toggleLike(pokemon)"
      />
    </template>

    <template #default>
      <div class="overflow-y-auto absolute top-0 bottom-0 left-0 right-0 p-11 text-base">
        <div
          v-if="isLoading || isNotFound"
          class="absolute top-11 bottom-11 left-11 right-11 flex items-center justify-center text-center bg-lighter-grey/60 backdrop-blur-sm"
          :class="{ 'text-danger font-normal': isNotFound }"
        >
          {{ isNotFound ? 'Pokemon could not be found' : 'Loading stats...' }}
        </div>

        <h2 class="mb-5 title-text leading-none">Stats</h2>

        <item-list
          v-if="pokemon.stats"
          class="grid grid-cols-3 gap-2"
          :items="pokemon.stats"
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
      </div>
    </template>
  </action-modal>
</template>

<styles scoped lang="scss">
.stat-row {
  @apply h-full px-5 py-2 font-bold;
}
</styles>
