import { computed, ref, type ComputedRef, type Ref } from 'vue';
import useLikes from '@/composables/useLikes';
import Api from '@/api';

import Pokemon from '@/models/Pokemon';

const pokemons = ref<Pokemon[]>([]);
const error = ref<string | Error>('');
const isLoading = ref<boolean>(false);
const count = ref<number>(0);
let nextUrl: string | null = null;

type UseTasks = {
  pokemons: Ref<Pokemon[]>;
  isLoading: Ref<boolean>;
  error: Ref<string | Error>;
  lastId: ComputedRef<number>;
  countDigits: ComputedRef<number>;
  fetchPokemons: () => void;
  fetchPokemon: (id: Pokemon['id']) => Promise<Pokemon | undefined>;
  toggleLike: (pokemon: Pokemon) => void;
};

export default function (): UseTasks {
  const { isLiked, saveLiked } = useLikes();

  const countDigits = computed(() => count.value.toString().length);
  const lastId = computed(() => count.value - 1);

  const hydrateResources = (results: any[]) => {
    return results.map((res) => {
      const pok = Pokemon.fromResource(res);
      pok.isLiked = isLiked(pok.id.toString());
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
    let pokemon = pokemons.value.find((pok) => pok.id === id);

    if (pokemon && pokemon.stats) {
      return pokemon;
    }

    isLoading.value = true;
    try {
      error.value = '';
      const data = await Api.fetchPokemon(id.toString());

      if (pokemon) {
        return pokemon.setStatsFromEndpoint(data);
      }

      pokemon = Pokemon.fromEndpoint(data);
      pokemon.isLiked = isLiked(pokemon.id.toString());
      return pokemon;
    } catch (exception) {
      error.value = exception as string | Error;
    } finally {
      isLoading.value = false;
    }
  };

  const toggleLike = (pokemon: Pokemon) => {
    const collPokemon = pokemons.value.find((pok) => pok.id === pokemon.id);

    if (collPokemon) {
      collPokemon.isLiked = !pokemon.isLiked;
    } else {
      pokemon.isLiked = !pokemon.isLiked;
    }
    saveLiked(pokemon.id.toString());
  };

  return {
    pokemons,
    isLoading,
    error,
    countDigits,
    lastId,
    fetchPokemons,
    fetchPokemon,
    toggleLike,
  };
}
