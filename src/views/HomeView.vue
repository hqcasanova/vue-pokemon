<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import usePokemons from '@/composables/usePokemons';
import LoadingBar from '@/components/ui/LoadingBar.vue';
import ItemList from '@/components/structure/ItemList.vue';
import PokemonCard from '@/components/ui/PokemonCard.vue';

import type Pokemon from '@/models/Pokemon';

const { pokemons, isLoading, fetchPokemons } = usePokemons();
const router = useRouter();

onMounted(fetchPokemons);

const onClick = (pokemon: Pokemon) => {
  router.push({ name: 'stats', params: { id: pokemon.id } });
};

const mainTitle = import.meta.env.VITE_META_TITLE;
</script>

<template>
  <header class="m-6">
    <h1 class="text-black">
      <router-link :to="{ path: '/' }">
        {{ mainTitle }}
      </router-link>
    </h1>
  </header>

  <main class="task-list">
    <loading-bar
      class="z-10 fixed top-0 left-0"
      :is-progress="isLoading"
    />

    <item-list
      class="my-6"
      :items="pokemons"
      item-key="id"
    >
      <template #default="pokemon">
        <pokemon-card
          v-bind="(pokemon as any)"
          @click="onClick"
        />
      </template>

      <template #empty>
        <strong>{{ isLoading ? 'Loading pokemons...' : 'No pokemons found' }}</strong>
      </template>
    </item-list>

    <router-view />
  </main>
</template>
