import { TestBed } from '@angular/core/testing';
import { DashboardFacade } from '../facades/dasboard-facade';
import { HeroSearchComponent } from './hero-search.component';

describe('HeroSearchComponent', () => {
  let heroSearchComponent: HeroSearchComponent;

  const dashBoardFacadeStub = {
    createSearchHeroTerms: () => {
      return [
        { id: 12, name: 'Dr. Nice' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
      ];
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HeroSearchComponent,
          useClass: HeroSearchComponent,
        },
        {
          provide: DashboardFacade,
          useValue: dashBoardFacadeStub,
        },
      ],
    });

    heroSearchComponent = TestBed.inject(HeroSearchComponent);
  });

  it('should create', () => {
    heroSearchComponent.ngOnInit();
    expect(heroSearchComponent).toBeTruthy();
  });
});
