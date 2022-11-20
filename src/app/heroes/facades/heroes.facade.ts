import { Injectable } from '@angular/core';
import { Hero } from 'src/app/dtos/hero';
import { Service } from 'src/app/services/service';
import { HeroService } from '../service/hero-service.service';

@Injectable()
export class HeroesFacade {
  constructor(private heroService: HeroService, private service: Service) {}

  heroes: Hero[] = [];

  getHeroes(): void {
    this.service.getHeroes().subscribe((heroes) => {
      this.heroes = heroes;
    });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
