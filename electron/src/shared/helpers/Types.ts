export interface ILink {
  url: string;
  label: string;
  type: string;
}

export interface IGameFormFields {
  title: string;
  abbreviation: string;
  image: string; 
  xAxis: string;
  yAxis: string;
  fileNames: string[];
}

export interface IGameFormErrors { [id: string]: string; }

export interface IGame {
  id: string;
  title: string;
  abbreviation: string | null;
  image: IGameImage;
  links: ILink[];
  fileNames: string[];
}

export interface IGameImage {
  url: string;
  bannerPos: IPosition;
}

export interface IPosition {
  x: string;
  y: string;
}
