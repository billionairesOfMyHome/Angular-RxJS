import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable, of, pipe } from 'rxjs';
import { Supplier } from './supplier';
import { catchError, concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  /* return Observable<Observable<Supplier>> */
  suppliersWithMap$ = of(1, 5, 8).pipe(
    map(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
  )

  /* return  Observable<Supplier> */
  suppliersWithConcatMap$ = of(1, 5, 8).pipe(
    tap(item => console.log(`concatMap source observable item: ${item}`)),
    concatMap( id => {
      console.log(`concatMap inner observable item id: ${id}`);
      return this.http.get<Supplier>(`${this.suppliersUrl}/${id}`);
    } 
  ))

  suppliersWithMergeMap$ = of(1, 5, 8).pipe(
    tap(item => console.log(`mergeMap source observable item: ${item}`)),
    mergeMap( id => {
      console.log(`mergeMap inner observable item id: ${id}`);
      return this.http.get<Supplier>(`${this.suppliersUrl}/${id}`);
    } 
  ))

  suppliersWithSwitchMap$ = of(1, 5, 8).pipe(
    tap(item => console.log(`switchMap source observable item: ${item}`)),
    switchMap( id => {
      console.log(`switchMap inner observable item id: ${id}`);
      return this.http.get<Supplier>(`${this.suppliersUrl}/${id}`);
    } 
  ))

  suppliers$ = this.http.get<Supplier[]>(this.suppliersUrl).pipe(
    catchError(err => this.handleError(err))
  )

  constructor(private http: HttpClient) { 
    this.suppliersWithConcatMap$.subscribe(
        item => console.log('concatMap result', item)
    )
    this.suppliersWithMergeMap$.subscribe(
      item => console.log('mergeMap result', item)
    )
    this.suppliersWithSwitchMap$.subscribe(
      item => console.log('switchMap result', item)
    )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

}
