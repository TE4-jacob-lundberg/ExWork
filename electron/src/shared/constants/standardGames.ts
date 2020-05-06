import { ILink } from '../helpers/Types';

export interface IGame {
  id: string;
  title: string;
  abbreviation: string | null;
  image?: IGameImage;
  links: ILink[];
  fileNames: string[];
}

export interface IGameImage {
  name: string;
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
    fileNames: ['csgo.exe', 'csgo.app'],
  },
  {
    id: 'valorant',
    title: 'VALORANT',
    abbreviation: 'valorant',
    image: {
      name: 'valorant.jpg',
      bannerPos: {
        x: '50%',
        y: '0',
      },
    },
    links: [
      { label: 'Wiki', url: 'https://valorant.fandom.com/wiki/Valorant_Wiki'},
    ],
    fileNames: ['VALORANT.exe', 'VALORANT.app'],
  },
  {
    id: 'codmw',
    title: 'Call of Duty: Modern Warfare',
    abbreviation: 'CoD: MW',
    image: {
      name: 'cod_mw.jpg',
      bannerPos: {
        x: '50%',
        y: '0',
      },
    },
    links: [
      { label: 'Wiki', url: 'https://callofduty.fandom.com/wiki/Portal:Call_of_Duty:_Modern_Warfare_(2019)'},
    ],
    fileNames: ['ModernWarfare.exe', 'ModernWarfare.app'],
  },
  // {
  //   title: 'League of Legends',
  //   abbreviation: 'LoL',
  //   image: 'lol.jpg',
  // },
];
