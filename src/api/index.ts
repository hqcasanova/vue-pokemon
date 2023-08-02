import axios from 'axios';

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
export type StatData = {
  base_stat: number;
  effort: number;
  stat: Resource;
};

const HOST = JSON.parse(import.meta.env.VITE_API_HOST);
const PAGE_SIZE = JSON.parse(import.meta.env.VITE_PAGE_SIZE);
const IMG_HOST = JSON.parse(import.meta.env.VITE_IMG_HOST);
const IMG_PATHS = JSON.parse(import.meta.env.VITE_IMG_PATHS);
const ID_REGEX = /\/(\d+)\/$/;

export default {
  getId(url: string): number {
    const idFragment = url.match(ID_REGEX);
    return idFragment ? Number(idFragment[1]) : 0;
  },

  getImgs(id: string): string[] {
    return IMG_PATHS.map((path: string) => `${IMG_HOST}${path}/${id}.png`);
  },

  getStats(stats: StatData[]) {
    return stats.reduce((result, curr) => ({ ...result, [curr.stat.name]: curr.base_stat }), {});
  },

  async fetchPokemons(url: string | null): Promise<Paginated> {
    let params = {};

    if (!url) {
      url = `${HOST}/pokemon`;
      params = {
        limit: PAGE_SIZE,
        offset: 0,
      };
    }

    const response = await axios.get(url, { params });
    return response.data;
  },

  async fetchPokemon(id: string): Promise<any> {
    const response = await axios.get(`${HOST}/pokemon/${id}`);
    return response.data;
  },
};
