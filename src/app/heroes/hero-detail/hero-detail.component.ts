import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public heroesFacade: HeroesFacade
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.heroesFacade.getHero(this.id);
  }
}
