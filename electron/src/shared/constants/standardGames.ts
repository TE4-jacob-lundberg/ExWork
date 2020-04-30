export interface IGame {
  id: string;
  title: string;
  abbreviation: string | null;
  image: IGameImage;
}

export interface IGameImage {
  name: string;
  headerPos: IPosition;
  bannerPos: IPosition;
}

interface IPosition {
  x: string;
  y: string;
}

export const standardGames: IGame[] = [
  {
    id: 'csgo',
    title: 'Counter-Strike: Global Offensive',
    abbreviation: 'CS:GO',
    image: {
      name: 'csgo.jpg',
      headerPos: {
        x: '0',
        y: '25%',
      },
      bannerPos: {
        x: '50%',
        y: '0',
      },
    },
  },
  {
    id: 'valorant',
    title: 'VALORANT',
    abbreviation: 'valorant',
    image: {
      name: 'valorant.jpg',
      headerPos: {
        x: '0',
        y: '45%',
      },
      bannerPos: {
        x: '50%',
        y: '0',
      },
    },
  },
  {
    id: 'codmw',
    title: 'Call of Duty: Modern Warfare',
    abbreviation: 'CoD: MW',
    image: {
      name: 'cod_mw.jpg',
      headerPos: {
        x: '0',
        y: '5%',
      },
      bannerPos: {
        x: '50%',
        y: '0',
      },
    },
  },
  // {
  //   title: 'League of Legends',
  //   abbreviation: 'LoL',
  //   image: 'lol.jpg',
  // },
];
