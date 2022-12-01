import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from 'src/app/dtos/hero';
import { LogHelper } from '../../helpers/handle-errors/log-helpers';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private logHelper: LogHelper) {}

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.logHelper.log(`fetched hero id=${id}`)),
      catchError(this.logHelper.handleError<Hero>(`getHero id=${id}`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) =>
        this.logHelper.log(`added hero w/ id=${newHero.id}`)
      ),
      catchError(this.logHelper.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.logHelper.log(`updated hero id=${hero.id}`)),
      catchError(this.logHelper.handleError<any>('updateHero'))
    );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.logHelper.log(`deleted hero id=${id}`)),
      catchError(this.logHelper.handleError<Hero>('deleteHero'))
    );
  }
}
