<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import usePokemons from '@/composables/usePokemons';
import LoadingBar from '@/components/ui/LoadingBar.vue';
import ItemList from '@/components/structure/ItemList.vue';
import DetectBottom from '@/components/structure/DetectBottom.vue';
import PokemonCard from '@/components/ui/PokemonCard.vue';

import type Pokemon from '@/models/Pokemon';

const { pokemons, isLoading, countDigits, fetchPokemons, toggleLike } = usePokemons();
const router = useRouter();

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
    <p class="font-bold">{{ description }}</p>

    <loading-bar
      class="z-10 fixed top-0 left-0"
      :is-progress="isLoading"
    />

    <detect-bottom @bottom="fetchPokemons">
      <item-list
        class="grid gap-x-3.5 gap-y-5 grid-cols-[repeat(auto-fill,minmax(9.6rem,1fr))] items-center my-5"
        :items="pokemons"
        item-key="id"
      >
        <template #default="pokemon: any">
          <pokemon-card
            class="app-btn rounded-lg"
            v-bind="pokemon"
            :id-length="countDigits"
            @click="onClick(pokemon)"
            @update:is-liked="toggleLike(pokemon)"
          />
        </template>

        <template #empty>
          <strong>{{ isLoading ? 'Loading pokemons...' : 'No pokemons found' }}</strong>
        </template>
      </item-list>
    </detect-bottom>

    <router-view v-if="pokemons.length" />
  </main>
</template>
