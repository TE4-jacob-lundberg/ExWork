export interface IGame {
  title: string;
  abbreviation: string | null;
  image: IGameImage;
}

export interface IGameImage {
  name: string;
}

export const standardGames: IGame[] = [
  {
    title: 'Counter-Strike: Global Offensive',
    abbreviation: 'CS:GO',
    image: {
      name: 'csgo.jpg',
    },
  },
  {
    title: 'VALORANT',
    abbreviation: null,
    image: {
      name: 'valorant.jpg',
    },
  },
  {
    title: 'Call of Duty: Modern Warfare',
    abbreviation: 'CoD: MW',
    image: {
      name: 'cod_mw.jpg',
    },
  },
  // {
  //   title: 'League of Legends',
  //   abbreviation: 'LoL',
  //   image: 'lol.jpg',
  // },
];
