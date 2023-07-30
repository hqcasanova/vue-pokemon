import { computed, ref, type ComputedRef, type Ref } from 'vue';
import { useStorage } from '@vueuse/core';
import Api from '@/api';

import Pokemon from '@/models/Pokemon';

const pokemons = ref<Pokemon[]>([]);
const storedLikes = useStorage<string[]>('likes', []);
const error = ref<string | Error>('');
const isLoading = ref<boolean>(false);
const count = ref<number>(0);
let nextUrl: string | null = null;

type UseTasks = {
  pokemons: Ref<Pokemon[]>;
  isLoading: Ref<boolean>;
  error: Ref<string | Error>;
  countDigits: ComputedRef<number>;
  isLiked: (id: Pokemon['id']) => boolean;
  fetchPokemons: () => Promise<void>;
  fetchPokemon: (id: Pokemon['id']) => Promise<Pokemon>;
  toggleLike: (id: Pokemon['id']) => void;
};

export default function (): UseTasks {
  const isLiked = (id: Pokemon['id']) => {
    return storedLikes.value.indexOf(id) !== -1;
  };

  const countDigits = computed(() => {
    return count.value.toString().length;
  });

  const hydrateResources = (results: any[]) => {
    return results.map((res) => {
      const pok = Pokemon.fromResource(res);
      pok.isLiked = isLiked(pok.id);
      return pok;
    });
  };

  const fetchPokemons = async () => {
    isLoading.value = true;

    try {
      error.value = '';

      const data = await Api.fetchPokemons(nextUrl);
      count.value = data.count;
      nextUrl = data.next;

      const hydrated = hydrateResources(data.results);
      pokemons.value.push(...hydrated);
    } catch (exception) {
      error.value = exception as string | Error;
      pokemons.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const fetchPokemon = async (id: Pokemon['id']) => {
    isLoading.value = true;

    try {
      return await Api.fetchPokemon(id);
    } finally {
      isLoading.value = false;
    }
  };

  const toggleLike = (id: Pokemon['id']) => {
    const pokemon = pokemons.value.find((pok) => pok.id === id);

    if (pokemon) {
      pokemon.isLiked = !pokemon.isLiked;
      const likeIndex = storedLikes.value.indexOf(id);

      if (likeIndex === -1) {
        storedLikes.value.push(id);
      } else {
        storedLikes.value.splice(likeIndex, 1);
      }
    }
  };

  return {
    pokemons,
    isLoading,
    error,
    countDigits,
    isLiked,
    fetchPokemons,
    fetchPokemon,
    toggleLike,
  };
}
