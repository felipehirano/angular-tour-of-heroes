import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hero } from 'src/app/dtos/hero';

@Injectable({
  providedIn: 'root',
})
export class HeroesModelsStore {
  private _hero = new BehaviorSubject<Hero>({} as any);

  constructor() {}

  public set(hero: Hero): void {
    this._hero.next(hero);
  }

  public get(): Hero {
    return this._hero.getValue();
  }
}
