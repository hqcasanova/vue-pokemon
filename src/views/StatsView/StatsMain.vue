<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSwipe, type UseSwipeReturn } from '@vueuse/core';

import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import usePokemons from '@/composables/usePokemons';
import ActionModal from '@/components/structure/ActionModal.vue';
import PokemonImg from '@/components/ui/PokemonImg.vue';
import PokemonCard from '@/components/ui/PokemonCard.vue';
import NextButton from '@/components/ui/NextButton.vue';
import StatsDetails from '@/views/StatsView/StatsDetails.vue';

import Pokemon from '@/models/Pokemon';

export type Props = {
  id: Pokemon['id'];
};
const props = defineProps<Props>();

const pokemon = ref<Pokemon>(new Pokemon(props.id));
const modal = ref<typeof ActionModal | null>(null);
const next = ref<typeof NextButton | null>(null);
const prev = ref<typeof NextButton | null>(null);

const router = useRouter();
const { isLoading, countDigits, lastId, error, fetchPokemon, toggleLike } = usePokemons();
let swipeObj: UseSwipeReturn;

onMounted(() => {
  swipeObj = useSwipe(modal.value?.container);

  watch(swipeObj.isSwiping, (isSwipe) => {
    if (!isSwipe) {
      const dir = swipeObj.direction.value;

      if (dir === 'left') {
        router.replace(next.value?.toRoute);
      } else if (dir === 'right') {
        router.replace(prev.value?.toRoute);
      }
    }

    modal.value = modal.value?.container;
  });
});
watchEffect(async () => {
  const data = await fetchPokemon(props.id);
  if (data) {
    pokemon.value = data;
  }
});
onUnmounted(stop);

const onCancelAction = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <action-modal
    ref="modal"
    class="flex flex-col lg:flex-row w-full text-[calc(1vh+1rem)] bg-secondary lg:w-[85%] lg:max-w-[75rem] lg:m-auto lg:landscape:text-[6vh] lg:rounded-md"
    @cancel="onCancelAction"
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
      <stats-details
        v-bind="pokemon"
        :is-loading="isLoading"
        :error="error"
      />
    </template>

    <template #navigation>
      <nav
        class="flex min-mobile-dims p-[0.5em] lg:min-h-0 lg:min-w-0 lg:p-0 items-center justify-center"
      >
        <next-button
          ref="prev"
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
          ref="next"
          class="lg:absolute right-[-0.78em] w-[1.56em] h-[1.56em]"
          :destinationId="id + 1"
          :last-id="lastId"
          replace
        />
      </nav>
    </template>
  </action-modal>
</template>
