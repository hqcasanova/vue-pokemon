import Api, { type Resource } from '@/api/index';
import Stats from './Stats';

export default class {
  id: string;
  name: string;
  imgUrls: string[];
  isLiked: boolean;
  stats?: Stats;

  static fromResource({ name = '', url = '' }: Resource) {
    const id = Api.getId(url);
    return new this(id, name, Api.getImg(id));
  }

  constructor(
    id: string,
    name: string = '',
    imgUrls: string[] = [],
    isLiked: boolean = false,
    stats: Stats = new Stats({})
  ) {
    this.id = id;
    this.name = name;
    this.imgUrls = imgUrls;
    this.isLiked = isLiked;
    this.stats = stats;
  }
}

// As of Vue 3.3, defining props from imported classes doesn't work. Hence the type below.
export type Pokemon = {
  id: string;
  name: string;
  imgUrls: string[];
  isLiked: boolean;
  stats?: Stats;
};
