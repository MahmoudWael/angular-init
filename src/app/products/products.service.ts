import { Injectable } from '@angular/core';
import { IProducts } from './products';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productsUrl = 'http://localhost:3000/api/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProducts[]> {
        return this.http.get<IProducts[]>(this.productsUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    handleError(err: HttpErrorResponse) {
        let errMessage = '';
        if (err.error instanceof ErrorEvent) {
            errMessage = `An error occurred: ${err.error.message}`;
        } else {
            errMessage = `Server returned code: ${err.status}, error message ${err.message}`;
        }
        console.log(errMessage);
        return throwError(errMessage);
    }
}