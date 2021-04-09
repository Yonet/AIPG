import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { environment } from './../environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class VisionService {
  httpOptions = {
    headers: new HttpHeaders( {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': environment.visionKey
    } )
  };
  //Host: westus2.api.cognitive.microsoft.com;
  //   Content-Type: application / json;
  // Ocp - Apim - Subscription - Key: ••••••••••••••••••••••••••••••••
  //
  constructor ( private http: HttpClient, private messageService: MessageService ) { }

  analyzeImage () {
    return this.http.post( environment.visionEndpoint, { "url": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/01/24/19/prince-philip-gt.jpg?width=1200&auto=webp&quality=75" }, this.httpOptions ).pipe(
      catchError( this.handleError() )
    );

  }

  private handleError<T> ( operation = 'operation', result?: T ) {
    return ( error: any ): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error( error ); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log( `${ operation } failed: ${ error.message }` );

      // Let the app keep running by returning an empty result.
      return of( result as T );
    };
  }

  /** Log a HeroService message with the MessageService */
  private log ( message: string ) {
    this.messageService.add( `HeroService: ${ message }` );
  }

}
