import axios from 'axios';
import Stats from '@/models/Stats';

type rawPokemon = {
  name: string;
  url: string;
};

const HOST = JSON.parse(import.meta.env.VITE_API_HOST);
const PAGE_SIZE = JSON.parse(import.meta.env.VITE_PAGE_SIZE);
const IMG_HOST = JSON.parse(import.meta.env.VITE_IMG_HOST);
const IMG_PATHS = JSON.parse(import.meta.env.VITE_IMG_PATHS);
const ID_REGEX = /\/(\d+)\/$/;

export default {
  fetchPokemons(): Promise<rawPokemon[]> {
    return axios
      .get(`${HOST}/pokemon`, {
        params: {
          limit: PAGE_SIZE,
          offset: 0,
        },
      })
      .then((response) => response.data.results);
  },

  getId(url: string): string {
    const idFragment = url.match(ID_REGEX);
    return idFragment ? idFragment[1] : '';
  },

  getImg(id: string): string[] {
    return IMG_PATHS.map((path: string) => `${IMG_HOST}${path}/${id}.png`);
  },

  // TODO: not sure I understand the API
  fetchStats(id: string): Promise<Stats> {
    return axios.get(`${HOST}/stats`);
  },
};
