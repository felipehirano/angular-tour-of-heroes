import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../dtos/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../service/hero-service.service';
import { HeroesFacade } from '../facades/heroes.facade';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  private id: number = 0;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    public heroesFacade: HeroesFacade
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.heroesFacade.getHero(this.id);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.heroesFacade.hero) {
      this.heroService
        .updateHero(this.heroesFacade.hero)
        .subscribe(() => this.goBack());
    }
  }
}
