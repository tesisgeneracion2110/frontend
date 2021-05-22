import { Injectable } from '@angular/core';
import { Song } from './class/song';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);
    return throwError('An error has occurred');
  }

  private post<T>(url, data: T): Observable<T> {
    console.log('post:', url);
    return this.http
      .post<T>(url, data, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(
        // retry(5),
        catchError(this.handleError)
      );
  }

  createSong(song: Song) {
    const url = `${environment.serviceBaseUrl}/song`;
    return this.post(url, {
      music: {
        "bpm": 90,
        "root": "A",
        "scale": "minor",
        "n_chords": 4,
        "progression": [ 3, 4, 5, 7 ],
        "n_beats": 2,
        "structure": [
            [ "intro", 1 ],
            [ "chorus", 1 ]
    ]
      }
      /*titulo: libro.titulo,
      anio: libro.anio,
      genero: libro.genero,
      numero_paginas: libro.numero_paginas,
      editorial_id: libro.editorial_id,
      autor_id: libro.autor_id*/
    });
  }
}
