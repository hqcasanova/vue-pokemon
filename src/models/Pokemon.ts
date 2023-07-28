export default class {
  id: string;
  name: string;
  imgUrl: string;

  constructor({ id = '', name = '', imgUrl = '' }) {
    this.id = id;
    this.name = name;
    this.imgUrl = imgUrl;
  }
}

// As of Vue 3.3, defining props from imported classes doesn't work. Hence the type below.
export type Pokemon = {
  id: string;
  name: string;
  imgUrl: string;
};
