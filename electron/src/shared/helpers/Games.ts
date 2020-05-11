import { standardGames, IGame } from '../constants/standardGames';

export class Games {

  public static all(): IGame[] {
    if (!localStorage.getItem('games')) localStorage.setItem('games', JSON.stringify(standardGames));

    return JSON.parse(localStorage.getItem('games')!) || [];
  }

  public static addNew(game: IGame): string {
    const savedGames: IGame[] = JSON.parse(localStorage.getItem('games')!);
    if (savedGames.some(sGame => sGame.id === game.id)) return 'DUPLICATE_ID';
    
    localStorage.setItem('games', JSON.stringify(savedGames.concat(game)));
    return '';
  }
}
