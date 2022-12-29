import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { getTestBed, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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

  it('should list heroes', (done) => {
    const response = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
    ];

    const resultMock = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
    ];

    service.getHeroes().subscribe((response) => {
      expect(JSON.stringify(response)).toBe(JSON.stringify(resultMock));
      done();
    });

    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toBe('GET');

    req.flush(response);
  });

  it('should not search heroes', () => {
    const term = 123;
    expect(() => service.searchHeroes(term as any)).toThrowError(
      `term.trim is not a function`
    );
  });

  it('should not search heroes with empty param', () => {
    const term = '';
    expect(JSON.stringify(service.searchHeroes(term))).toEqual(
      JSON.stringify(of([]))
    );
  });

  it('should search heroes', () => {
    const term = 'RubberMan';
    const response = [{ id: 12, name: 'Dr. Nice' }];
    const expected = [{ id: 12, name: 'Dr. Nice' }];

    service.searchHeroes(term).subscribe((response) => {
      expect(expected).toEqual(response);
    });

    const req = httpMock.expectOne(`api/heroes/?name=${term}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });
});
