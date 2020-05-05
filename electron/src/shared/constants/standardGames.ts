import { ILink } from '../helpers/Types';

export interface IGame {
  id: string;
  title: string;
  abbreviation: string | null;
  image: IGameImage;
  links: ILink[];
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
    links: [
      { label: 'Wiki', url: 'https://counterstrike.fandom.com/wiki/Counter-Strike:_Global_Offensive'},
      { label: 'CS:GO Stash', url: 'http://csgostash.com'},
      { label: 'Steam Guide SprayPatterns', url: 'https://steamcommunity.com/sharedfiles/filedetails/?id=378325692'},
      { label: 'Steam Market', url: 'https://steamcommunity.com/market/search?l=swedish&appid=730'},
    ],
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
    links: [
      { label: 'Wiki', url: 'https://valorant.fandom.com/wiki/Valorant_Wiki'},
    ],
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
    links: [
      { label: 'Wiki', url: 'https://callofduty.fandom.com/wiki/Portal:Call_of_Duty:_Modern_Warfare_(2019)'},
    ],
  },
  // {
  //   title: 'League of Legends',
  //   abbreviation: 'LoL',
  //   image: 'lol.jpg',
  // },
];
