import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { getTestBed, TestBed } from '@angular/core/testing';
import { LogHelper } from '../helpers/handle-errors/log-helpers';
import { Service } from './service';

describe('HeroService', () => {
  let service: Service;
  let httpMock: HttpTestingController;
  let injector: TestBed;

  const logHelperStub = {
    handleError: () => {},
    log: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: LogHelper, useValue: logHelperStub }],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.inject(Service);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list heroes', () => {
    const resultMock = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
    ];

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(resultMock);
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('GET');

    req.flush(resultMock);
  });
});
