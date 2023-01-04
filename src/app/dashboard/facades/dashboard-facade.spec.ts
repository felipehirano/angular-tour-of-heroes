import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { Service } from '../../services/service';
import { LogHelper } from '../../helpers/handle-errors/log-helpers';
import { DashboardFacade } from './dasboard-facade';

describe('HeroSearchComponent', () => {
  let dashBoardFacade: DashboardFacade;

  const serviceStub = {
    getHeroes: () => {
      return of([
        { id: 12, name: 'Dr. Nice' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr. IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' },
      ]);
    },
    searchHeroes: () => {},
  };

  const logHelperStub = {
    handleError: () => {},
    log: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DashboardFacade,
          useClass: DashboardFacade,
        },
        {
          provide: Service,
          useValue: serviceStub,
        },
        {
          provide: LogHelper,
          useValue: logHelperStub,
        },
      ],
    });

    dashBoardFacade = TestBed.inject(DashboardFacade);
  });

  it('should create', () => {
    expect(dashBoardFacade).toBeTruthy();
  });

  it('should call getHeroes and get the first 5 heroes', () => {
    dashBoardFacade.getHeroes();
    expect(dashBoardFacade.heroes).toEqual([
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
    ]);
  });

  it('should search a new term', () => {
    const term = 'Bombasto';
    (dashBoardFacade as any).searchTerms.subscribe((newTerm: any) => {
      expect(newTerm).toBe('Bombasto');
    });
    dashBoardFacade.search(term);
  });

  it('should create search hero terms', () => {
    const searchTermsMock = new Subject<string>();
    (dashBoardFacade as any).searchTerms = searchTermsMock;

    const mockSearchHeroes = jest.spyOn(
      Service.prototype as any,
      'searchHeroes'
    );
    mockSearchHeroes.mockReturnValue(of([]));

    dashBoardFacade.createSearchHeroTerms();

    searchTermsMock.subscribe(() => {
      expect((Service.prototype as any).searchHeroes).toHaveBeenCalledWith(
        'Bombasto'
      );
    });

    searchTermsMock.next('Bombasto');
  });
});
