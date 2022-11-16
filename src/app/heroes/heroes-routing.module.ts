import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes.component';

const routes: Routes = [
  { path: '', component: HeroesComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
