import Api from '@/api/index';
import Stats from './Stats';

export default class {
  id: number;
  name: string;
  imgUrls: string[];
  isLiked: boolean;
  stats?: Stats;

  static fromResource({ name, url }: any) {
    const id = Api.getId(url);
    return new this(id, name);
  }

  static fromEndpoint({ id, name, height, weight, stats }: any) {
    const statsObj = { height, weight, ...Api.getStats(stats) } as Stats;
    return new this(id, name, statsObj);
  }

  constructor(id: number, name: string = '', stats?: Stats, isLiked: boolean = false) {
    this.id = id;
    this.name = name;
    this.imgUrls = Api.getImgs(this.id.toString());
    this.isLiked = isLiked;
    this.stats = stats;
  }

  setStatsFromEndpoint({ stats }: any) {
    this.stats = Api.getStats(stats) as Stats;
    return this;
  }
}

// As of Vue 3.3, defining props from imported classes doesn't work. Hence the type below.
export type Pokemon = {
  id: number;
  name: string;
  imgUrls: string[];
  isLiked: boolean;
  stats?: Stats;
};
