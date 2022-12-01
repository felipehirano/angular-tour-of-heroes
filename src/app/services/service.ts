import { Injectable } from '@angular/core';
import { Hero } from '../dtos/hero';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { LogHelper } from '../helpers/handle-errors/log-helpers';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private logHelper: LogHelper) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.logHelper.log('fetched heroes')),
      catchError(this.logHelper.handleError<Hero[]>('getHeroes', []))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.logHelper.log(`found heroes matching "${term}"`)
          : this.logHelper.log(`no heroes matching "${term}"`)
      ),
      catchError(this.logHelper.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
