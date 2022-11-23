import { Injectable } from '@angular/core';
import { Hero } from 'src/app/dtos/hero';
import { Service } from 'src/app/services/service';
import { HeroService } from '../service/hero-service.service';
import { Location } from '@angular/common';

@Injectable()
export class HeroesFacade {
  constructor(
    private heroService: HeroService,
    private service: Service,
    private location: Location
  ) {}

  heroes: Hero[] = [];
  hero: Hero = {} as any;

  getHeroes(): void {
    this.service.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  getHero(id: number): void {
    this.heroService
      .getHero(id)
      .subscribe((response) => (this.hero = response));
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

  update(): void {
    if (this.hero.name) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
