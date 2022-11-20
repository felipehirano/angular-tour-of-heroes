import { Component, OnInit } from '@angular/core';
import { Hero } from '../dtos/hero';
import { HeroesFacade } from './facades/heroes.facade';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  constructor(public heroesFacade: HeroesFacade) {}

  ngOnInit(): void {
    this.heroesFacade.getHeroes();
  }
}
