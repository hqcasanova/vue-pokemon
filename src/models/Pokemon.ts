import Api from '@/api/index';

export default class {
  id: string;
  name: string;
  imgUrls: string[];
  isLiked: boolean;

  static fromRaw(name: string = '', url: string = '') {
    const id = Api.getId(url);
    return new this(id, name, Api.getImg(id));
  }

  constructor(id: string, name: string, imgUrls: string[], isLiked: boolean = false) {
    this.id = id;
    this.name = name;
    this.imgUrls = imgUrls;
    this.isLiked = isLiked;
  }
}

// As of Vue 3.3, defining props from imported classes doesn't work. Hence the type below.
export type Pokemon = {
  id: string;
  name: string;
  imgUrls: string[];
  isLiked: boolean;
};
