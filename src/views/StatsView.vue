<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import usePokemons from '@/composables/usePokemons';
import ActionModal from '@/components/structure/ActionModal.vue';
import PokemonImg from '@/components/ui/PokemonImg.vue';
import PokemonCard from '@/components/ui/PokemonCard.vue';
import NextButton from '@/components/ui/NextButton.vue';
import ItemList from '@/components/structure/ItemList.vue';

import Pokemon from '@/models/Pokemon';

export type Props = {
  id: Pokemon['id'];
};
const props = defineProps<Props>();

const router = useRouter();
const { isLoading, countDigits, lastId, error, fetchPokemon, toggleLike } = usePokemons();

const pokemon = ref<Pokemon>(new Pokemon(props.id));

watchEffect(async () => {
  const data = await fetchPokemon(props.id);
  if (data) {
    pokemon.value = data;
  }
});

const onCancelAction = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <action-modal
    class="flex flex-col lg:flex-row w-full text-[calc(1vh+1rem)] bg-secondary lg:w-[85%] lg:max-w-[75rem] lg:m-auto lg:landscape:text-[6vh] lg:rounded-md"
  >
    <template #before-content>
      <pokemon-card
        class="flex items-center justify-center lg:block lg:w-[9.6em] lg:rounded-l-md"
        v-bind="pokemon"
        :id-length="countDigits"
        :is-like-disabled="!!error"
        @update:is-liked="toggleLike(pokemon)"
      >
        <pokemon-img
          class="h-[3em] w-auto mr-[1em] lg:w-[6.2em] lg:h-[6.2em] lg:mx-auto lg:mb-[1.4em]"
          :urls="pokemon.imgUrls"
        />
      </pokemon-card>
    </template>

    <template #default>
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

    <template #navigation>
      <nav
        class="flex min-mobile-dims p-[0.5em] lg:min-h-0 lg:min-w-0 lg:p-0 items-center justify-center"
      >
        <next-button
          class="lg:absolute left-[-0.78em] w-[1.56em] h-[1.56em] scale-x-[-1]"
          :destinationId="id - 1"
          :first-id="1"
          replace
        />

        <button
          class="app-btn lg:absolute top-[-0.72em] right-[-0.78em] flex justify-center items-center min-mobile-dims w-[1.56em] h-[1.56em] mx-[1.5em] lg:mx-0 bg-primary-states rounded-full"
          type="button"
          @click="onCancelAction"
        >
          <font-awesome-icon :icon="faXmark" />
        </button>

        <next-button
          class="lg:absolute right-[-0.78em] w-[1.56em] h-[1.56em]"
          :destinationId="id + 1"
          :last-id="lastId"
          replace
        />
      </nav>
    </template>
  </action-modal>
</template>

<styles scoped lang="scss">
.stat-row {
  @apply h-full px-5 py-2 font-bold;
}
</styles>
