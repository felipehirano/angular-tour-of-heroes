import { NgModule } from '@angular/core';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from './facades/dasboard-facade';

@NgModule({
  declarations: [DashboardComponent, HeroSearchComponent],
  imports: [CommonModule, DashboardRoutingModule],
  providers: [DashboardFacade],
  bootstrap: [],
})
export class DashboardModule {}
