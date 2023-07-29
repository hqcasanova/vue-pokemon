import { ref, type Ref } from 'vue';
import Api from '@/api';

import Pokemon from '@/models/Pokemon';
import Stats from '@/models/Stats';

const pokemons = ref<Pokemon[]>([]);
const error = ref<string | Error>('');
const isLoading = ref<boolean>(false);

type UseTasks = {
  pokemons: Ref<Pokemon[]>;
  isLoading: Ref<boolean>;
  error: Ref<string | Error>;
  fetchPokemons: () => Promise<void>;
  fetchStats: (id: Pokemon['id']) => Promise<Stats>;
  likePokemon: (id: Pokemon['id']) => void;
};

export default function (): UseTasks {
  const fetchPokemons = async () => {
    isLoading.value = true;

    try {
      error.value = '';
      const rawPokemons = await Api.fetchPokemons();
      pokemons.value = rawPokemons.map((raw) => Pokemon.fromRaw(raw.name, raw.url));
    } catch (exception) {
      error.value = exception as string | Error;
      pokemons.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const fetchStats = async (id: Pokemon['id']) => {
    // TODO: combine pokemon properties with stats from various relevant endpoints (they don't seem to be under the "pokemon" endpoint)
    return Api.fetchStats(id);
  };

  const likePokemon = (id: Pokemon['id']) => {
    // TODO: no endpoint for saving likes => use localStorage?
  };

  return {
    pokemons,
    isLoading,
    error,
    fetchPokemons,
    fetchStats,
    likePokemon,
  };
}
