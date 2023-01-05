import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { Service } from '../../services/service';
import { LogHelper } from '../../helpers/handle-errors/log-helpers';
import { DashboardFacade } from './dasboard-facade';
import { Hero } from '../../dtos/hero';
import { ConstantPool } from '@angular/compiler';

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
    dashBoardFacade.createSearchHeroTerms();
    expect(dashBoardFacade.heroes$).toMatchObject(
      (dashBoardFacade as any).searchTerms
    );
  });

  it('should search hero with term specificied', () => {
    const mockReturnValue = [{ id: 13, name: 'Bombasto' }];
    const searchHeroesMock = jest.fn().mockReturnValue(of(mockReturnValue));

    (Service.prototype as any).searchHeroes = searchHeroesMock;

    dashBoardFacade.heroes$ = of([]);

    const searchTermsMock = new Subject<string>();
    (dashBoardFacade as any).searchTerms = searchTermsMock;

    searchTermsMock
      .pipe(switchMap((value) => searchHeroesMock(value)))
      .subscribe((value) => {
        expect(value).toEqual(mockReturnValue);
      });

    searchTermsMock.next('Bombasto');
  });

  it('createSearchHeroTerms should transform search terms into heroes', () => {
    const searchTermsMock = new Subject<string>();
    dashBoardFacade['searchTerms'] = searchTermsMock;

    const searchTerms = ['Bombasto', 'Celeritas', 'Magneta'];

    const expectedHeroes = [
      { id: 1, name: 'Bombasto' },
      { id: 2, name: 'Celeritas' },
      { id: 3, name: 'Magneta' },
    ];
    const searchHeroesMock = jest
      .fn()
      .mockReturnValueOnce(of([expectedHeroes[0]]))
      .mockReturnValueOnce(of([expectedHeroes[1]]))
      .mockReturnValueOnce(of([expectedHeroes[2]]));
    (Service.prototype as any).searchHeroes = searchHeroesMock;

    let index = 0;

    searchTermsMock
      .pipe(switchMap((value) => searchHeroesMock(value)))
      .subscribe((value) => {
        expect(value).toEqual([expectedHeroes[index]]);
        index++;
      });

    searchTerms.forEach((term) => searchTermsMock.next(term));
  });
});
