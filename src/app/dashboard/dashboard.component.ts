import { Component, OnInit } from '@angular/core';
import { Hero } from '../dtos/hero';
import { Service } from '../services/service';
import { DashboardFacade } from './facades/dasboard-facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(public dashboardFacade: DashboardFacade) {}

  ngOnInit(): void {
    this.dashboardFacade.getHeroes();
  }
}
