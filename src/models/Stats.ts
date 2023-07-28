export default class {
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;

  constructor({
    height = 0,
    weight = 0,
    hp = 0,
    attack = 0,
    defense = 0,
    specialAttack = 0,
    specialDefense = 0,
    speed = 0,
  }) {
    this.height = height;
    this.weight = weight;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.specialAttack = specialAttack;
    this.specialDefense = specialDefense;
    this.speed = speed;
  }
}

// As of Vue 3.3, defining props from imported classes doesn't work. Hence the type below.
export type Stats = {
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};
