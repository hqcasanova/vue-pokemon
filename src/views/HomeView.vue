<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import usePokemons from '@/composables/usePokemons';
import LoadingBar from '@/components/ui/LoadingBar.vue';
import ItemGrid from '@/components/structure/ItemGrid.vue';
import PokemonCard from '@/components/ui/PokemonCard.vue';

import type Pokemon from '@/models/Pokemon';

const { pokemons, isLoading, fetchPokemons } = usePokemons();
const router = useRouter();

onMounted(fetchPokemons);

const onClick = (pokemon: Pokemon) => {
  router.push({ name: 'stats', params: { id: pokemon.id } });
};

const mainTitle = import.meta.env.VITE_META_TITLE;
const description = import.meta.env.VITE_META_DESCRIPTION;
</script>

<template>
  <header>
    <h1 class="title-text">
      <router-link :to="{ path: '/' }">
        {{ mainTitle }}
      </router-link>
    </h1>
  </header>

  <main>
    <p class="hidden font-bold">{{ description }}</p>

    <loading-bar
      class="z-10 fixed top-0 left-0"
      :is-progress="isLoading"
    />

    <item-grid
      class="max-w-[62rem] my-5"
      :items="pokemons"
      item-key="id"
    >
      <template #default="pokemon">
        <pokemon-card
          class="rounded-lg"
          v-bind="(pokemon as any)"
          @click="onClick(pokemon)"
        />
      </template>

      <template #empty>
        <strong>{{ isLoading ? 'Loading pokemons...' : 'No pokemons found' }}</strong>
      </template>
    </item-grid>

    <router-view />
  </main>
</template>
