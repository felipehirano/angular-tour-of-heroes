import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './service/hero-service.service';
import { HeroesFacade } from './facades/heroes.facade';

@NgModule({
  declarations: [HeroesComponent, HeroDetailComponent],
  imports: [CommonModule, HeroesRoutingModule, FormsModule],
  providers: [HeroService, HeroesFacade],
  bootstrap: [],
})
export class HeroesModule {}
