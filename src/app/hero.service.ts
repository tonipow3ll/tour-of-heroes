import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {
      return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
    }
 /** UPDATE heroes from the server */
    updateHero(hero: Hero): Observable<any> {
      return this.http.put(this.heroesUrl, hero, this.httpOptions)
        .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleError<any>('updateHero'))
        );
    }

    /** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
    tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
   const url = `${this.heroesUrl}/${id}`;
   return this.http.get<Hero>(url).pipe(
     tap(_ => this.log(`fetched hero id=${id}`)),
     catchError(this.handleError<Hero>(`getHero id=${id}`))
   )
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 */

private handleError<T>(operation = 'operation', result?:T) {
  return (error:any): Observable<T> => {
    console.error(error)
    this.log(`${operation} failed: ${error.message}`)
    return of(result as T)
  }
}

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
