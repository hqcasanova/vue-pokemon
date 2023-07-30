import axios from 'axios';
import Stats from '@/models/Stats';

export type Resource = {
  name: string;
  url: string;
};
export type Paginated = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Resource[];
};

const HOST = JSON.parse(import.meta.env.VITE_API_HOST);
const PAGE_SIZE = JSON.parse(import.meta.env.VITE_PAGE_SIZE);
const IMG_HOST = JSON.parse(import.meta.env.VITE_IMG_HOST);
const IMG_PATHS = JSON.parse(import.meta.env.VITE_IMG_PATHS);
const ID_REGEX = /\/(\d+)\/$/;

export default {
  fetchPokemons(url: string | null): Promise<Paginated> {
    let params = {};

    if (!url) {
      url = `${HOST}/pokemon`;
      params = {
        limit: PAGE_SIZE,
        offset: 0,
      };
    }
    return axios.get(url, { params }).then((response) => response.data);
  },

  getId(url: string): string {
    const idFragment = url.match(ID_REGEX);
    return idFragment ? idFragment[1] : '';
  },

  getImg(id: string): string[] {
    return IMG_PATHS.map((path: string) => `${IMG_HOST}${path}/${id}.png`);
  },

  // TODO: not sure I understand the API
  fetchPokemon(id: string): Promise<any> {
    return axios.get(`${HOST}/pokemon/${id}`);
  },
};
