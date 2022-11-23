import { Component, OnInit } from '@angular/core';
import { DashboardFacade } from '../facades/dasboard-facade';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  constructor(public dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {
    this.dashboardFacade.createSearchHeroTerms();
  }
}
