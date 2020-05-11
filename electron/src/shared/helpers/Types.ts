export interface ILink {
  url: string;
  label: string;
}

export interface IGameFormFields {
  id: string;
  title: string;
  abbreviation: string;
  image: string; 
  xAxis: string;
  yAxis: string;
  links: ILink[];
  fileNames: string[];
}
