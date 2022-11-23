import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Hero } from 'src/app/dtos/hero';
import { Service } from 'src/app/services/service';

@Injectable()
export class DashboardFacade {
  heroes: Hero[] = [];

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private service: Service) {}

  getHeroes(): void {
    this.service
      .getHeroes()
      .pipe(map((response) => (response = response.slice(1, 5))))
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  createSearchHeroTerms(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.service.searchHeroes(term))
    );
  }
}
