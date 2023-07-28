import axios from 'axios';
import Pokemon from '@/models/Pokemon';
import Stats from '@/models/Stats';

const HOST = JSON.parse(import.meta.env.VITE_API_HOST);
const PAGE_SIZE = JSON.parse(import.meta.env.VITE_PAGE_SIZE);

export default {
  fetchPokemons(): Promise<Pokemon[]> {
    return axios
      .get(`${HOST}/pokemon`, {
        params: {
          limit: PAGE_SIZE,
          offset: 0,
        },
      })
      .then((response) => response.data.results);
  },

  // TODO: not sure I understand the API
  fetchStats(id: string): Promise<Stats> {
    return axios.get(`${HOST}/stats`);
  },
};
