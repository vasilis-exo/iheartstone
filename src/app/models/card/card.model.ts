export interface CardDeck {
  name: string;
  types: string[];
}

export interface Card {
  cardId: string;
  cardSet: string;
  cost: number;
  attack: number;
  dbfId: string;
  faction: string;
  img: string;
  imgGold: string;
  locale: string;
  name: string;
  playerClass: string;
  rarity: string;
  text: string;
  type: string;
  flavor: string;
  health: string;
  favorite: boolean;
}
